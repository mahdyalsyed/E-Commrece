let loginUserELe = document.querySelector(".loginUser");
let ulList = document.querySelector(".list");
var userName = document.querySelector(".userName");
let user = localStorage.getItem("name");
let loadingMain = document.querySelector(".loading");
let logoutUser = document.querySelector("#logout");
let burgerIcon = document.querySelector("#burger-icon");

if (user) {
    loginUserELe.style.display = "flex";
    userName.innerHTML = `Hello ${user}`;
    ulList.style.display = "none";
    burgerIcon.style.display = "";
} else {
    if (loginUserELe) loginUserELe.style.display = "none";
    if (burgerIcon) burgerIcon.style.display = "none";
    if (ulList) ulList.style.display = "flex";
}

if (burgerIcon) {
    burgerIcon.addEventListener("click", function () {
        if (user) {
            loginUserELe.classList.toggle("active");
        }
    });
}

// save Data To Admin
function saveDataToAdmin() {
    let currentEmail = localStorage.getItem("email");
    let currentName = localStorage.getItem("name");
    let currentCart = JSON.parse(localStorage.getItem("productsCart")) || [];
    let currentFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (currentEmail) {
        let allOrders = JSON.parse(localStorage.getItem("usersOrders")) || [];

        let userIndex = allOrders.findIndex((user) => user.email === currentEmail);

        let userData = {
            name: currentName,
            email: currentEmail,
            cart: currentCart,
            favorites: currentFavorites,
            updateAt: new Date().toLocaleString(),
        };

        if (userIndex !== -1) {
            allOrders[userIndex] = userData;
        } else {
            allOrders.push(userData);
        }
        localStorage.setItem("usersOrders", JSON.stringify(allOrders));
    }
}

// Log Out And Clear LocalStorge
if (logoutUser) logoutUser.addEventListener("click", logOut);

function logOut() {
    loadingMain.style.display = "flex";

    setTimeout(() => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("favorites");
        localStorage.removeItem("productsCart");
        loadingMain.style.display = "none";
        window.location = "register.html";
    }, 1500);
}

// Draw Items In Page
let items = document.querySelector(".items");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function drawItems() {
    let productItems = products.map((item) => {
        let isFavorite = favorites.some((ele) => ele.id === item.id);
        return `
            <div class="box">
                        <div class="image">
                            <img src="${item.img}" alt="Photo" />
                            <i class="icon-favorait fa fa-heart"
                               style= "color:${isFavorite ? "black" : "white"}"
                               onclick="handleFavorite(${item.id})">
                            </i>
                        </div>
                        <div class="content">
                            <a class="title" href="#">${item.title}</a>
                            <p class="desc">${item.desc}</p>
                            <span class="price">${item.price} $</span>
                            <button id="addToCart" onclick="addProductToCartMenu(${item.id})">Add To Cart</button>
                        </div>
                    </div>
        `;
    });
    if (items) {
        items.innerHTML = productItems;
    }
}

window.onload = drawItems();

// Add and Remove To Favorite In Localstorge
function toglleFavorite(product) {
    if (user) {
        let index = favorites.findIndex((ele) => ele.id === product.id);

        if (index === -1) {
            favorites.push(product);
        } else {
            favorites.splice(index, 1);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
        window.location = "register.html";
    }
}
function handleFavorite(id) {
    let item = products.find((ele) => ele.id === id);
    toglleFavorite(item);

    favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    darwProductsUi();
}
function darwProductsUi() {
    items.innerHTML = products.map((item) => {
        let isFavorite = favorites.some((ele) => ele.id === item.id);
        return `
            <div class="box">
                        <div class="image">
                            <img src="${item.img}" alt="Photo" />
                            <i class="icon-favorait fa fa-heart" 
                               style= "color:${isFavorite ? "black" : "white"}" 
                               onclick="handleFavorite(${item.id})">
                            </i>
                        </div>
                        <div class="content">
                            <a class="title" href="#">${item.title}</a>
                            <p class="desc">${item.desc}</p>
                            <span class="price">${item.price} $</span>
                            <button id="addToCart" onclick="addProductToCartMenu(${item.id})">Add To Cart</button>
                        </div>
                    </div>

        `;
    });
    saveDataToAdmin();
}

// Open Favorite Page
let favoriteElement = document.querySelector("#favorite");

if (favoriteElement) {
    favoriteElement.addEventListener("click", favoraitPage);
}

function favoraitPage() {
    loadingMain.style.display = "flex";
    setTimeout(() => {
        loadingMain.style.display = "none";
        window.location = "favorite.html";
    }, 1500);
}

// Open Cart Menu
let cartIcon = document.querySelector("#cart-icon-menu");
let cartMenuPoupep = document.querySelector("#cart-menu");
let cartMenuBox = document.querySelector("#cart-menu #cart-box");

if (cartIcon) {
    cartIcon.addEventListener("click", openCartMenu);
}

function openCartMenu() {
    if (cartMenuBox.innerHTML !== "") {
        cartMenuPoupep.classList.toggle("open");
    } else {
        cartMenuPoupep.classList.add("#cart-menu");
    }
}

// // Add Product In LocalStorge
let cartBoxItems = document.querySelector("#cart-box");
let cartBadge = document.querySelector(".badge");

let checkProduct = JSON.parse(localStorage.getItem("productsCart"));
let addedItem = checkProduct ? checkProduct : [];

if (addedItem) {
    addedItem.map((item) => {
        if (cartBoxItems) {
            cartBoxItems.innerHTML += `
    <div class="cart-product">
    <div class="cart-image">
    <img src="${item.img}" alt="" />
    </div>
    <div class="cart-content">
    <h4>${item.title}</h4>
    <p>${item.desc}</p>
    <span>${item.price * (item.quntity || 1)}</span>
    </div>
    <div class="cart-btn">
    <button class="min-btn  ${item.quntity === 1 ? "no-drop" : ""}" onclick="decreaseQuantity(${item.id})">-</button>
    <span id="cart-num">${item.quntity}</span>
    <button id="plus" onclick="increaseQuantity(${item.id})">+</button>
    <i id="cart-remove" class="fa fa-times-circle" onclick="removeProductInCart(${item.id})"></i>
    </div>
    </div>
    `;
        }
    });
    if (cartBadge) {
        cartBadge.textContent = addedItem.length;
    }
    saveDataToAdmin();
}

// // Add Product In MenuCart
let popupItemInCart = document.querySelector("#popupItemInCart");
let popupCartIcon = document.querySelector(".popupCartIcon");

if (popupCartIcon) popupCartIcon.addEventListener("click", closepopupCart);

function closepopupCart() {
    popupItemInCart.style.display = "none";
}

function addProductToCartMenu(id) {
    if (!user) {
        window.location = "register.html";
        return;
    }
    let chooseProduct = products.find((ele) => ele.id === id);
    let isItemInCart = addedItem.some((item) => item.id === id);

    if (isItemInCart) {
        popupItemInCart.style.display = "block";
    } else {
        cartBoxItems.innerHTML += `
    <div class="cart-product">
    <div class="cart-image">
    <img src="${chooseProduct.img}" alt="" />
    </div>
    <div class="cart-content">
    <h4>${chooseProduct.title}</h4>
    <p>${chooseProduct.desc}</p>
    <span>${chooseProduct.price * (chooseProduct.quntity || 1)}</span>
    </div>
    <div class="cart-btn">
     <button class="min-btn  ${chooseProduct.quntity === 1 ? "no-drop" : ""}" onclick="decreaseQuantity(${chooseProduct.id})">-</button>
    <span id="cart-num">${chooseProduct.quntity}</span>
    <button id="plus" onclick="increaseQuantity(${chooseProduct.id})">+</button>
    <i id="cart-remove" class="fa fa-times-circle" onclick="removeProductInCart(${chooseProduct.id})"></i>
    </div>
    </div>
    `;

        addedItem = [...addedItem, chooseProduct];
        localStorage.setItem("productsCart", JSON.stringify(addedItem));

        let cartItemsNumber = document.querySelectorAll("#cart-box .cart-product");
        cartBadge.textContent = cartItemsNumber.length;
    }
    saveDataToAdmin();
}

// Go To Cart Menu Page
let menuProductcart = document.querySelector("#cart-view-btn");

if (menuProductcart) menuProductcart.addEventListener("click", cartMenuPage);

function cartMenuPage() {
    loadingMain.style.display = "flex";
    setTimeout(() => {
        loadingMain.style.display = "none";
        window.location = "cartmenu.html";
    }, 1500);
}

// Go To User Page
let userIcon = document.querySelector(".user_icon");
if (userIcon) userIcon.addEventListener("click", userPage);

function userPage() {
    loadingMain.style.display = "flex";
    setTimeout(() => {
        loadingMain.style.display = "none";
        window.location = "user.html";
    }, 1500);
}

function updateMenuCart() {
    localStorage.setItem("productsCart", JSON.stringify(addedItem));

    cartBoxItems.innerHTML = "";

    addedItem.map((item) => {
        cartBoxItems.innerHTML += `
        <div class="cart-product">
        <div class="cart-image">
        <img src="${item.img}" alt="" />
        </div>
        <div class="cart-content">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
        <span>${item.price * (item.quntity || 1)}</span>
        </div>
        <div class="cart-btn">
        <button class="min-btn  ${item.quntity === 1 ? "no-drop" : ""}" onclick="decreaseQuantity(${item.id})">-</button>
        <span id="cart-num">${item.quntity}</span>
        <button class="plus-btn" onclick="increaseQuantity(${item.id})">+</button>
        <i id="cart-remove" class="fa fa-times-circle" onclick="removeProductInCart(${item.id})"></i>
        </div>
        </div>
        `;
    });
    cartBadge.textContent = addedItem.length;
    saveDataToAdmin();
}

// Increase Quantity Count
function increaseQuantity(id) {
    addedItem = addedItem.map((ele) => {
        if (ele.id === id) {
            ele.quntity = ele.quntity + 1;
        }
        return ele;
    });
    updateMenuCart();
}

// Decrease Quantity Count

function decreaseQuantity(id) {
    addedItem = addedItem.map((ele) => {
        if (ele.id === id) {
            if (ele.quntity > 1) {
                ele.quntity -= 1;
            }
        }
        return ele;
    });

    updateMenuCart();
}

// Remove Item From cart
function removeProductInCart(id) {
    let productsCart = localStorage.getItem("productsCart");

    if (productsCart) {
        let items = JSON.parse(productsCart);

        let itemFilterd = items.filter((item) => item.id !== id);
        addedItem = itemFilterd;

        localStorage.setItem("productsCart", JSON.stringify(itemFilterd));
        updateMenuCart();
        itemFilterd.length === 0 ? cartMenuPoupep.classList.toggle("open") : "";
    }
    saveDataToAdmin();
}
