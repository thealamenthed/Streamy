let searchResult = document.querySelector(".movie-cards");
let searchInput = document.getElementById("search-id");
let moviecards = document.querySelector("#moviecards");
let seriecards = document.querySelector("#seriecards");
searchResult.style.visibility = "hidden";

fetch("./data.json").then((res) =>
  res.json().then((json) => {
    let imgBookmarked = "";
    // iterating movies
    for (let value of json) {
      if (localStorage.getItem(value.title) == null) {
        localStorage.setItem(value.title, i.isBookmarked);
      }

      if (localStorage.getItem(value.title) == "true") {
        imgBookmarked = "/assets/icon-bookmark-full.svg";
        addElement(searchResult, value, imgBookmarked);
      }
    }
  })
);

// add event listener for search
searchInput.addEventListener("keyup", searchmovies);

// Search Movie
function searchmovies() {
  let searchValue = searchInput.value.toUpperCase();

  if (searchValue != "") {
    let item = searchResult.querySelectorAll(".card");
    let b = 0;
    moviecards.style.visibility = "hidden";
    seriecards.style.visibility = "hidden";
    searchResult.style.visibility = "visible";
    for (let i = 0; i < item.length; i++) {
      let span = item[i].querySelector("#titre-film");

      if (span.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
        item[i].style.display = "block";
        b++;
      } else {
        item[i].style.display = "none";
      }
    }

    document.getElementById("result").innerHTML =
      "Found " + b + " results for '" + searchInput.value + "'";
  } else {
    location.reload();
    document.getElementById("search-id").value = "";
    result.style.visibility = "hidden";
  }
  document.getElementById("search-id").onclick = function () {
    location.reload();
    document.getElementById("search-id").value = "";
    result.style.visibility = "hidden";
  };
}

// get value from the data json and create dynamic element
function addElement(element, value, imgBookmarked) {
  let div = document.createElement("div");
  div.className = "card";

  let { thumbnail, year, title, category, rating } = value;

  div.innerHTML = `
                        <div class="card-icon" onclick="addFavorites(this,'${title}')">
                            <img class="iconImage" src="${imgBookmarked}" alt="">
                        </div>
                        <img class="cover" src="${thumbnail.regular.small}" alt="">
                        <div class="infos">
                        <div class="detail flex">
                            <p class="years">${year}</p>
                            <p>•</p>
                            <p class="${category}">${category}</p>
                            <p>•</p>
                            <p class="pegi">${rating}</p>
                        </div>
                        <h4 id="titre-film">${title}</h4> 
                        </div>
        `;

  element.appendChild(div);
}

function addFavorites(e, titreFilm) {
  //cette fonction on l'appelle lorsqu'on clique sur l'icone et la zone autour
  //fonction appelée dans la div class = "card-icon"
  let imgsrc = e.querySelector(".iconImage").src; //on récupère la source de l'image de l'élément sélectionné (e), qui est notre card

  if (imgsrc.includes("icon-bookmark-empty.svg")) {
    // si notre source d'image (src)contient "icon-bookmark-empty.svg" càd icone vide
    e.querySelector(".iconImage").src = "./assets/icon-bookmark-full.svg"; //on remplace l'icone vide par une icone rempli "full"
    localStorage.setItem(titreFilm, "true"); //le isbookmarked dans le local storage reprend la valeur true //à la base c'etait false vu que l'icone etait vide
  } else {
    // l'icone devient "empty" et le isbookmarked dans localstorage devient false
    e.querySelector(".iconImage").src = "./assets/icon-bookmark-empty.svg";
    localStorage.setItem(titreFilm, "false");
  }
}

//reset search input lors de l'actualisation de la page

window.onload = function () {
  document.getElementById("search-id").value = "";
};
