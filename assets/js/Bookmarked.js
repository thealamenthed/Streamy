fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    for (let i of data) {
      // let imgBookmarked = "/assets/icon-bookmark-full.svg";
      if (localStorage.getItem(i.title) == null) {
        localStorage.setItem(i.title, i.isBookmarked);
      }

      if (i.category == "Movie" && i.isBookmarked == true) {
        let movieCards = document.querySelector("#movies-cards");
        let imgBookmarked = "";

        //console.log(i.title + " : " + localStorage.getItem(i.title) + " | ");
        if (localStorage.getItem(i.title) == "true") {
          imgBookmarked = "/assets/icon-bookmark-full.svg";
        } else {
          imgBookmarked = "/assets/icon-bookmark-empty.svg";
        }

        movieCards.innerHTML += `
            <div class="card">
                <div class="card-icon"  id="cardIcon" onclick="addFavorites(this,'${i.title}')">
                <img src="${imgBookmarked}" class="iconImage" alt="">
                </div>
        
            <img class="cover" src="${i.thumbnail.regular.small}" alt="">
            <div class="infos">
                <div class="detail flex">
                <p class="years">${i.year}</p>
                <p>•</p>
                <p class="${i.category}">${i.category}</p>
                <p>•</p>
                <p class="pegi">${i.rating}</p>
                </div>
                <h4 id="titre-film">${i.title}</h4> 
            </div>
            </div> `;
      }

      if (i.category == "TV Series" && i.isBookmarked == true) {
        let serieCards = document.querySelector("#series-cards");
        let imgBookmarked = "";

        //console.log(i.title + " : " + localStorage.getItem(i.title) + " | ");
        if (localStorage.getItem(i.title) == "true") {
          imgBookmarked = "/assets/icon-bookmark-full.svg";
        } else {
          imgBookmarked = "/assets/icon-bookmark-empty.svg";
        }

        serieCards.innerHTML += `
            <div class="card">
                <div class="card-icon"  id="cardIcon" onclick="addFavorites(this,'${i.title}')">
                <img src="${imgBookmarked}" class="iconImage" alt="">
                </div>
        
            <img class="cover" src="${i.thumbnail.regular.small}" alt="">
            <div class="infos">
                <div class="detail flex">
                <p class="years">${i.year}</p>
                <p>•</p>
                <p class="${i.category}">${i.category}</p>
                <p>•</p>
                <p class="pegi">${i.rating}</p>
                </div>
                <h4 id="titre-film">${i.title}</h4> 
            </div>
            </div> `;
      }
    }
  });
