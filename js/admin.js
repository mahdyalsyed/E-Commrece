let admin = sessionStorage.getItem("name");
let loginAdminELe = document.querySelector("#loginUser");
let ulListAdmin = document.querySelector(".list");
var userAdmin = document.querySelector(".userName");
let logoutAdmin = document.querySelector("#logoutAdmin");

if (admin) {
    loginAdminELe.style.display = "flex";
    userAdmin.innerHTML = `Hello ${admin}`;
    ulListAdmin.style.display = "none";
}

if (logoutAdmin) logoutAdmin.addEventListener("click", logOutAdmin);

function logOutAdmin() {
    loadingMain.style.display = "flex";

    setTimeout(() => {
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        loadingMain.style.display = "none";
        window.location = "register.html";
    }, 1500);
}

let allUsersData = JSON.parse(localStorage.getItem("usersOrders")) || [];

console.log(allUsersData);
function adminData() {
    let adminConatiner = document.querySelector(".admin-container");

    if (!adminConatiner) return;

    if (!allUsersData || allUsersData.length === 0) {
        adminConatiner.innerHTML = `<div class="no-users">No Users.....</div>`;
        return;
    }

    adminConatiner.innerHTML = allUsersData
        .map((user, index) => {
            return `
                <tr>
                    <td>${user.name || "unKnown"}</td>
                    <td>${user.email}</td>
                    <td>${user.favorites && user.favorites.length > 0 ? user.favorites.map((item) => `<p>${item.title}</p>`).join("") : `<p>No Data</p>`}</td>
                    <td>${user.cart && user.cart.length > 0 ? user.cart.map((item) => `<p>${item.title}</p>`).join("") : `<p>No Data</p>`}</td>
                    <td>${user.updateAt || ""}</td>
                    <td class="admin-close"> <i id="admin-remove" class="fa fa-times-circle" onclick="deleteUser(${index})"></i></td>
                </tr>
            `;
        })
        .join("");
}

function deleteUser(index) {
    allUsersData.splice(index, 1);
    localStorage.setItem("usersOrders", JSON.stringify(allUsersData));

    adminData();
}

adminData();
