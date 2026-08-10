let user_Name = document.querySelector(".user-title span");
let user_Email = document.querySelector(".user-desc span");
let user_product = document.querySelector(".user-product span");
let user_favorite = document.querySelector(".user-favorites span");

user_Name.innerHTML = localStorage.getItem("name");
user_Email.innerHTML = localStorage.getItem("email");

function checkItems() {
    if (localStorage.getItem("productsCart")) {
        user_product.innerHTML = JSON.parse(localStorage.getItem("productsCart")).length;
    } else {
        user_product.innerHTML = 0;
    }
}
window.onload = checkItems();

function checkfavorite() {
    if (localStorage.getItem("favorites")) {
        user_favorite.innerHTML = JSON.parse(localStorage.getItem("favorites")).length;
    } else {
        user_favorite.innerHTML = 0;
    }
}
window.onload = checkfavorite();
