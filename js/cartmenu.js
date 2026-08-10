let productInCartMenu = document.querySelector(".cart-menu-content");
let ItemsInCart = localStorage.getItem("productsCart");
let cartMenuBadge = document.querySelector(".badge");

if (ItemsInCart) {
    let itemEle = JSON.parse(ItemsInCart);
    drawItemsInCartPage(itemEle);
}

// Draw Product In Cart
function drawItemsInCartPage(items) {
    let productItemsCart = items.map((item) => {
        return `
            <div class="menu-cart">
                <div class="menu-cart-image">
                    <img src="${item.img}" alt="" />
                </div>
                <div class="cart-menu-title">
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                    <h5>${item.price * (item.quntity || 1)} $</h5>
                    <span class="quntity">Quntity: <span>${item.quntity}</span> </span>
                </div>
            </div> 
        `;
    });
    if (productInCartMenu) {
        productInCartMenu.innerHTML = productItemsCart;
    }

    if (cartMenuBadge) {
        cartMenuBadge.textContent = productItemsCart.length;
    }
}

// Pay Ment
let payBtn = document.querySelector(".pay-btn");
let payPopup = document.querySelector(".pay-popup");
let cardNumber = document.querySelector("#cardNumber");
let exp = document.querySelector("#exp");
let cvc = document.querySelector("#cvc");
let backBtn = document.querySelector(".back");
let addPay = document.querySelector(".add-pay");
let payForm = document.querySelector(".pay-form");

payBtn.addEventListener("click", openPopupPayment);
backBtn.addEventListener("click", closePopupPayment);
addPay.addEventListener("click", addPopupPayment);

// // open Popup
function openPopupPayment(e) {
    e.preventDefault();
    payPopup.style.display = "flex";
}

// // Close Popup
function closePopupPayment(e) {
    e.preventDefault();
    payPopup.style.display = "none";
}

// Check Input Before Pay
let popupData = document.querySelector(".poupep");
let closePopupData = document.querySelector("#poupep-icon");
let loadingPay = document.querySelector(".loading-pay");

closePopupData.addEventListener("click", closePoupepData);
function closePoupepData(e) {
    e.preventDefault();
    popupData.style.display = "none";
}

function addPopupPayment(e) {
    e.preventDefault();
    if (cardNumber.value === "" && exp.value === "" && cvc.value === "") {
        popupData.style.display = "block";
        closePoupepData;
    } else {
        loadingPay.style.display = "flex";
        setTimeout(() => {
            loadingPay.style.display = "none";
            window.location = "index.html";
        }, 4000);
    }
}
