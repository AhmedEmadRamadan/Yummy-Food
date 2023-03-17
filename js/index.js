/*----------Global variables--------*/ 
const documentHTML = document;
const mealData = documentHTML.getElementById('mealData');
const loading = documentHTML.querySelector('.loading');
const links = documentHTML.querySelectorAll('nav .sideBar ul li');
const searchPlace = documentHTML.getElementById('searchPlace');
let submitBtn;
/*---------WHEN STARTS-------*/ 
let sideBarWidth = $('nav .sideBar').innerWidth();
$('nav').animate({'left': `-${sideBarWidth}`});
$('nav .sideBar ul li').animate({top : 400},600);
mealData.innerHTML="";
mealData.innerHTML =getCategoryMeals(category='Side');
/*-----------EVENTS----------*/


/*----SIDEBAR----*/ 

/*=====OPEN SIDEBAR=====*/

documentHTML.querySelector('.openSideBar').addEventListener('click',()=>{
    openSideBar();
});

/*======CLOSE SIDEBAR======*/ 


documentHTML.querySelector('.closeSideBar').addEventListener('click',()=>{
    closeSideBar();
});

/*----END SIDEBAR----*/ 
links[0].addEventListener('click',()=>{
    displaySearchInputs();
})
links[1].addEventListener('click',()=>{
    closeSideBar();
    getCategories();
});
links[2].addEventListener('click',()=>{
    closeSideBar();
    getArea();
});
links[3].addEventListener('click',()=>{
    closeSideBar();
    getIngredients();
});
links[4].addEventListener('click',()=>{
    closeSideBar();
    showContacts();
})
/*---------------FUNCTIONS----------*/ 
function openSideBar() {
    $('nav').animate({'left': `0px`},500);
    documentHTML.querySelector('.openSideBar').classList.add('d-none');
    documentHTML.querySelector('.closeSideBar').classList.remove('d-none');
    for(let i=0;i<5;i++){
        $('nav .sideBar ul li').eq(i).animate({top : 0},(i+5) * 100)
    };
};
function closeSideBar() {
    $('nav').animate({'left': `-${sideBarWidth}`},500);
    documentHTML.querySelector('.openSideBar').classList.remove('d-none');
    documentHTML.querySelector('.closeSideBar').classList.add('d-none');
    $('nav .sideBar ul li').animate({top : 400},600);
};
async function getCategories(){
    searchPlace.innerHTML='';
    loading.classList.remove('d-none');
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const apiResponse = await api.json();
    console.log(apiResponse.categories);
    displayCategories(apiResponse.categories)
    loading.classList.add('d-none');
};
function displayCategories(category){
    let categoryBox = '';
    for(let i = 0; i<category.length; i++){
        categoryBox += `
                <div class="col-md-3">
                    <div onclick="getCategoryMeals('${category[i].strCategory}')" class="position-relative overflow-hidden rounded-2 meal">
                        <img class="w-100" src="${category[i].strCategoryThumb}" alt="">
                        <div class="position-absolute layer d-flex align-items-center p-2 text-black text-center flex-column">
                            <h3>${category[i].strCategory}</h3>
                            <p>${category[i].strCategoryDescription.split(" ").slice(0,25).join(" ")}</p>
                        </div>
                    </div>
                </div>
        `;
    };
    mealData.innerHTML = categoryBox;
};
async function getArea() {
    searchPlace.innerHTML='';
    loading.classList.remove('d-none');
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const apiResponse = await api.json();
    console.log(apiResponse);
    displayArea(apiResponse.meals);
    loading.classList.add('d-none');
};
function displayArea(area) {
    let areaBox = '';
    for(let i = 0; i<area.length; i++) {
        areaBox +=`
                <div class="col-md-3">
                    <div onclick="getAreaMeals('${area[i].strArea}')" class="text-center area">
                        <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                        <h4 class="text-white py-2">${area[i].strArea}</h4>
                    </div>
                </div>
        `;
    };
    mealData.innerHTML= areaBox;
};
function displayMeals(meals){
    let mealBox='';
    for(let i=0; i<meals.length; i++){
        mealBox += `
                <div class="col-md-3">
                    <div onclick="getMealDetails('${meals[i].idMeal}')" class="position-relative overflow-hidden rounded-2 meal">
                        <img class="w-100" src="${meals[i].strMealThumb}" alt="">
                        <div class="position-absolute layer d-flex align-items-center justify-content-center p-2 text-black">
                            <h3>${meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `;
    };
    mealData.innerHTML = mealBox;
};
async function getAreaMeals(area){
    searchPlace.innerHTML='';
    loading.classList.remove('d-none');
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const apiResponse = await api.json();
    console.log(apiResponse.meals);
    displayMeals(apiResponse.meals);
    // getMealDetails()
    loading.classList.add('d-none');
};
async function getIngredients(){
    searchPlace.innerHTML='';
    loading.classList.remove('d-none');
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const apiResponse = await api.json();
    console.log(apiResponse.meals);
    displayIngredients(apiResponse.meals.slice(0,24));
    loading.classList.add('d-none');
};
function displayIngredients(ingredients){
    let ingredientsBox='';
    for(let i=0; i<ingredients.length; i++){
        ingredientsBox +=`
                <div class="col-md-3">
                    <div onclick="getIngredientMeals('${ingredients[i].strIngredient}')" class="text-center text-white ingredients">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h2>${ingredients[i].strIngredient}</h2>
                        <p>${ingredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        `;
    };
    mealData.innerHTML=ingredientsBox;
};
async function getMealDetails(id){
    searchPlace.innerHTML='';
    loading.classList.remove('d-none');
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const apiResponse = await api.json();
    displayMealDetails(apiResponse.meals[0]);
    console.log(id);
    loading.classList.add('d-none');
};
function displayMealDetails(meal){
    let ingredient = ''
    for(let i=0;i<20;i++){
        if(meal[`strIngredient${i+1}`]){
            ingredient += `
            <li class="alert alert-info m-2 p-2">${meal[`strMeasure${i+1}`]} ${meal[`strIngredient${i+1}`]}</li>
            `;
        };
    };
    let tags = meal.strTags?.split(",");
    if (!tags) tags = [];
    console.log(tags);
    let tagsData = '';
    for(let i = 0 ; i<tags.length; i++){
        tagsData += `
            <li class="alert alert-danger m-2 p-2">${tags[i]}</li>
        `;
    };
    let mealDeatailsBox = `
    <div class="col-md-4">
    <div>
    <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="imgDetail">
    <h2 class="text-white py-2">${meal.strMeal}</h2>
    </div>
</div>
<div class="col-md-8">
    <div class="text-white">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    <h3><span>Area : </span>${meal.strArea}</h3>
    <h3><span>Category : </span>${meal.strCategory}</h3>
    <h3>Recipes : </h3>
    <ul class="list-unstyled d-flex flex-wrap g-3">
    ${ingredient}
    </ul>
    <h3>Tags : </h3>
    <ul class="list-unstyled d-flex flex-wrap g-3">${tagsData}</ul>
    <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
    </div>
</div>
    `;
    mealData.innerHTML = mealDeatailsBox;
};
async function getCategoryMeals(category){
    searchPlace.innerHTML='';
    loading.classList.remove('d-none');
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const apiResponse = await api.json();
    displayMeals(apiResponse.meals);
    loading.classList.add('d-none');
};
async function getIngredientMeals(ingredients){
    searchPlace.innerHTML='';
    loading.classList.remove('d-none');
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    const apiResponse = await api.json();
    displayMeals(apiResponse.meals);
    loading.classList.add('d-none');
};
function displaySearchInputs(){
    closeSideBar();
    searchPlace.innerHTML = `
                <div class="col-md-6">
                    <div class="w-100 p-2">
                        <input oninput="searchByName(this.value)" type="text" placeholder="Search By Name" class="w-100 rounded searchMeal text-white">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="w-100 p-2">
                        <input oninput="searchByFirstLetter(this.value)" type="text" placeholder="Search By First Letter" class="w-100 rounded searchMeal text-white">
                    </div>
                </div>
    `;
    mealData.innerHTML='';
};
async function searchByName(name){
    mealData.innerHTML = '';
    loading.classList.remove('d-none');
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const apiResponse = await api.json();
    apiResponse.meals? displayMeals(apiResponse.meals):displayMeals([]);
    loading.classList.add('d-none');
};
async function searchByFirstLetter(letter){
    mealData.innerHTML = '';
    loading.classList.remove('d-none');
    letter == ''? letter = 's' : "";
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const apiResponse = await api.json();
    apiResponse.meals?displayMeals(apiResponse.meals) : displayMeals([]);
    loading.classList.add('d-none');
};
function showContacts(){
    mealData.innerHTML = `
            <div class="contact d-flex justify-content-center align-items-center min-vh-100">
                <div class="container w-75 text-center">
                    <div class="row gy-3">
                        <div class="col-md-6">
                            <div class="w-100 p-2">
                                <input oninput="contactValidation()" id="inputName" type="text" placeholder="Enter Your Name" class="w-100 rounded text-white">
                            </div>
                            <div id="nameAlert" class="mt-2 d-none w-100 alert alert-danger">Minimum Length 2 and Maximum 20</div>
                        </div>
                        <div class="col-md-6">
                            <div class="w-100 p-2">
                                <input oninput="contactValidation()" id="inputEmail" type="text" placeholder="Enter Your Email" class="w-100 rounded text-white">
                            </div>
                            <div id="emailAlert" class="mt-2 d-none w-100 alert alert-danger">Email Not Valid *exemple@yyy.zzz</div>
                        </div>
                        <div class="col-md-6">
                            <div class="w-100 p-2">
                                <input oninput="contactValidation()" id="inputPhone" type="text" placeholder="Enter Your Phone" class="w-100 rounded text-white">
                            </div>
                            <div id="phoneAlert" class="mt-2 d-none w-100 alert alert-danger">Enter A Valid Phone Number</div>
                        </div>
                        <div class="col-md-6">
                            <div class="w-100 p-2">
                                <input oninput="contactValidation()" id="inputAge" type="number" placeholder="Enter Your Age" class="w-100 rounded text-white">
                            </div>
                            <div id="ageAlert" class="mt-2 d-none w-100 alert alert-danger">Enter A Valid Age : Minimum 10 Maximum 80</div>
                        </div>
                        <div class="col-md-6">
                            <div class="w-100 p-2">
                                <input oninput="contactValidation()" id="inputPassword" type="password" placeholder="Enter Your Password" class="w-100 rounded text-white">
                            </div>
                            <div id="passwordAlert" class="mt-2 d-none w-100 alert alert-danger text-capitalize">Enter A valid password *Minimum eight characters, at least one letter and one number:*</div>
                        </div>
                        <div class="col-md-6">
                            <div class="w-100 p-2">
                                <input oninput="contactValidation()" id="inputRepassword" type="password" placeholder="Repassword" class="w-100 rounded text-white">
                            </div>
                            <div id="repasswordAlert" class="mt-2 d-none w-100 alert alert-danger">Enter A Valid Repassword</div>
                        </div>
                    </div>
                    <button id="submitBtn" disabled class="btn btn-outline-danger mt-3">Submit</button>
                </div>
            </div>
    `;
    submitBtn = documentHTML.getElementById('submitBtn');
    documentHTML.getElementById('inputName').addEventListener('focus',()=>{
        inputNameValue = true;
    });
    documentHTML.getElementById('inputEmail').addEventListener('focus',()=>{
        inputEmailValue = true;
    });
    documentHTML.getElementById('inputPhone').addEventListener('focus',()=>{
        inputPhoneValue = true;
    });
    documentHTML.getElementById('inputAge').addEventListener('focus',()=>{
        inputAgeValue = true;
    });
    documentHTML.getElementById('inputPassword').addEventListener('focus',()=>{
        inputPasswordValue = true;
    });
    documentHTML.getElementById('inputRepassword').addEventListener('focus',()=>{
        inputRepasswordValue = true;
    });
};
let inputNameValue = false;
let inputEmailValue = false;
let inputPhoneValue = false;
let inputAgeValue = false;
let inputPasswordValue = false;
let inputRepasswordValue = false;
/*------------VALIDATION------------*/
function contactValidation(){
    if(inputNameValue){
        if(nameValidation()){
            documentHTML.getElementById('nameAlert').classList.replace('d-block','d-none');
        }else{
            documentHTML.getElementById('nameAlert').classList.replace('d-none','d-block');
        }
    }
    if(inputEmailValue){
        if(emailValidation()){
            documentHTML.getElementById('emailAlert').classList.replace('d-block','d-none');
        }else{
            documentHTML.getElementById('emailAlert').classList.replace('d-none','d-block');
        };
    };
    if(inputPhoneValue){
        if(phoneValidation()){
            documentHTML.getElementById('phoneAlert').classList.replace('d-block','d-none');
        }else{
            documentHTML.getElementById('phoneAlert').classList.replace('d-none','d-block');
        };
    };
    if(inputAgeValue){
        if(ageValidation()){
            documentHTML.getElementById('ageAlert').classList.replace('d-block','d-none');
        }else{
            documentHTML.getElementById('ageAlert').classList.replace('d-none','d-block');
        };
    };
    if(inputPasswordValue){
        if(passwordValidation()){
            documentHTML.getElementById('passwordAlert').classList.replace('d-block','d-none');
        }else{
            documentHTML.getElementById('passwordAlert').classList.replace('d-none','d-block');
        };
    };
    if(inputRepasswordValue){
        if(repasswordValidation()){
            documentHTML.getElementById('repasswordAlert').classList.replace('d-block','d-none');
        }else{
            documentHTML.getElementById('repasswordAlert').classList.replace('d-none','d-block');
        };
    };
    if(nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
        submitBtn.removeAttribute('disabled');
    }else{
        submitBtn.setAttribute('disabled',true)
    }
}
function nameValidation(){
    let regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
    return regexStyle.test(documentHTML.getElementById('inputName').value);
};
function emailValidation(){
    let regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return regexStyle.test(documentHTML.getElementById('inputEmail').value);
};
function phoneValidation(){
    let regexStyle = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regexStyle.test(documentHTML.getElementById('inputPhone').value);
};
function ageValidation(){
    let regexStyle = /^([1-7][0-9]|80)$/;
    return regexStyle.test(documentHTML.getElementById('inputAge').value);
};
function passwordValidation(){
    let regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regexStyle.test(documentHTML.getElementById('inputPassword').value);
};
function repasswordValidation(){
    if(documentHTML.getElementById('inputRepassword').value == documentHTML.getElementById('inputPassword').value){
        return true;
    };
};