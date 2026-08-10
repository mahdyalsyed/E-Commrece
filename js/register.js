let userNameRej = document.querySelector("#register_name");
let userEmailRej = document.querySelector("#register_email");
let userPasswordRej = document.querySelector("#register_pass");
let userIconShow = document.querySelector("#register_iconShow");
let userIconHide = document.querySelector("#register_iconHide");
let registerBtn = document.querySelector("#register_btn");
let poupepMain = document.querySelector(".poupep");
let poupepIcon = document.querySelector("#poupep-icon");
let loadingMainRej = document.querySelector(".loading");

// Show Password
userIconShow.addEventListener("click", showPassword);

function showPassword() {
    if (userPasswordRej.getAttribute("type", "password")) {
        userPasswordRej.setAttribute("type", "text");
    }
}

// Hide Password
userIconHide.addEventListener("click", hidePassword);

function hidePassword() {
    if (userPasswordRej.getAttribute("type", "text")) {
        userPasswordRej.setAttribute("type", "password");
    }
}

// Register User And Set DAta In LocalStorge
registerBtn.addEventListener("click", registerUser);
poupepIcon.addEventListener("click", closePoupep);

function registerUser(e) {
    e.preventDefault();

    if (userNameRej.value === "" || userEmailRej.value === "" || userPasswordRej.value === "") {
        poupepMain.style.display = "block";
        closePoupep;
    } else {
        if (
            userNameRej.value === "Admin" &&
            userEmailRej.value === "admin@admin.com" &&
            userPasswordRej.value === "159753"
        ) {
            loadingMainRej.style.display = "flex";
            setTimeout(() => {
                sessionStorage.setItem("name", userNameRej.value);
                sessionStorage.setItem("email", userEmailRej.value);
                loadingMainRej.style.display = "none";
                window.location = "admin.html";
            }, 2000);
        } else {
            loadingMainRej.style.display = "flex";
            setTimeout(() => {
                localStorage.setItem("name", userNameRej.value);
                localStorage.setItem("email", userEmailRej.value);
                localStorage.setItem("password", userPasswordRej.value);
                loadingMainRej.style.display = "none";
                window.location = "login.html";
            }, 2000);
        }
    }
}

function closePoupep() {
    poupepMain.style.display = "none";
}
