// Draw And Get Favorite
let getFavorite = JSON.parse(localStorage.getItem("favorites")) || [];
let favoriteContainer = document.querySelector(".favorite-content");
let favoritemNoData = document.querySelector(".favorite-noData");

function drawFavorite() {
    if (!getFavorite || getFavorite.length === 0) {
        favoritemNoData.style.display = "block";
        favoriteContainer.style.display = "none";
    } else {
        favoritemNoData.style.display = "none";
        favoriteContainer.style.display = "block";

        let productsFavorite = getFavorite
            .map((product) => {
                return `
         <div class="favorite-box">
            <img src="${product.img}" alt="" />
            <div class="favorite-title">
                <h3>${product.title}</h3>
                <p>${product.desc}</p>
            </div>
        </div>
        `;
            })
            .join("");
        favoriteContainer.innerHTML = productsFavorite;
    }
}

drawFavorite();
