let userEmail = document.querySelector("#login_email");
let userPassword = document.querySelector("#login_pass");
let userIconShow = document.querySelector("#login_iconShow");
let userIconHide = document.querySelector("#login_iconHide");
let loginBtn = document.querySelector("#login_btn");
let poupepMain = document.querySelector(".poupep");
let poupepIcon = document.querySelector("#poupep-icon");
let loadingMainLog = document.querySelector(".loading");

// // Show Password
userIconShow.addEventListener("click", showPassword);

function showPassword() {
    if (userPassword.getAttribute("type", "password")) {
        userPassword.setAttribute("type", "text");
    }
}

// Hide Password
userIconHide.addEventListener("click", hidePassword);

function hidePassword() {
    if (userPassword.getAttribute("type", "text")) {
        userPassword.setAttribute("type", "password");
    }
}

// // Login User And Get DAta In LocalStorge
loginBtn.addEventListener("click", loginUser);

function loginUser(e) {
    e.preventDefault();

    if (userEmail.value === "" || userPassword.value === "") {
        poupepMain.style.display = "block";
        closePoupep;
    } else {
        if (
            localStorage.getItem("email") === userEmail.value &&
            localStorage.getItem("password") === userPassword.value
        ) {
            loadingMainLog.style.display = "flex";
            setTimeout(() => {
                loadingMainLog.style.display = "none";
                window.location = "index.html";
                localStorage.removeItem("password");
            }, 2000);
        } else {
            poupepMain.style.display = "block";
            closePoupep;
        }
    }
}

// Close poupep
poupepIcon.addEventListener("click", closePoupep);

function closePoupep() {
    poupepMain.style.display = "none";
}
