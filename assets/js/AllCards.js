fetch('data.json')
    .then(response=>response.json())
    .then(data=>{

        for(let i of data){
          //tester présence info dans localstorage si il est vide on l'initalise
          if(localStorage.getItem(i.title) == null){
            localStorage.setItem(i.title, i.isBookmarked)
          }
            
            let allCards = document.querySelector("#all-cards");
            let imgBookmarked = "";
            //console.log(i.title + " : " + localStorage.getItem(i.title) + " | ");
            if(localStorage.getItem(i.title) == "true"){
              imgBookmarked = "/assets/icon-bookmark-full.svg";
            }else{
              imgBookmarked = "/assets/icon-bookmark-empty.svg";
            }
            allCards.innerHTML += `
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
            </div> 
            `
          }
    })

function addFavorites(e,titreFilm) {
  //cette fonction on l'appelle lorsqu'on clique sur l'icone et la zone autour 
  //fonction appelée dans la div class = "card-icon"
  let imgsrc = e.querySelector(".iconImage").src; //on récupère la source de l'icone de l'élément sélectionné (e), qui est notre card-icon
  
    if(imgsrc.includes("icon-bookmark-empty.svg")){
       // si notre source d'image (src)contient "icon-bookmark-empty.svg" càd icone vide
      e.querySelector(".iconImage").src="./assets/icon-bookmark-full.svg"; //on remplace l'icone vide par une icone rempli "full"
      localStorage.setItem(titreFilm,"true");//le isbookmarked dans le local storage reprend la valeur true //à la base c'etait false vu que l'icone etait vide

    }else{
      // l'icone devient "empty" et le isbookmarked dans localstorage devient false
      e.querySelector(".iconImage").src="./assets/icon-bookmark-empty.svg";
      localStorage.setItem(titreFilm,"false");

    }
}