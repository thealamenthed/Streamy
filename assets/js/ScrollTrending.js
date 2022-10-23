let scroll = document.querySelector('.slideshow');

fetch('./data.json')
    .then(response=>response.json())
    .then(data=>{
      let cardHtml = "";
      
        for(let card of data){
          //console.log(card);
          //tester présence info dans localstorage si il est vide on l'initalise
          if(localStorage.getItem(card.title) == null){
            localStorage.setItem(card.title, card.isBookmarked)
          }
          
          if(card.isTrending == true){
            
            // let allCards = document.querySelector("#all-cards");
                let imgBookmarked = "";
                
                //console.log(i.title + " : " + localStorage.getItem(i.title) + " | ");
                if(localStorage.getItem(card.title) == "true"){
                    imgBookmarked = "/assets/icon-bookmark-full.svg";
                }else{
                    imgBookmarked = "/assets/icon-bookmark-empty.svg";
                }

                
              cardHtml += '<div class="slide" style="background-image:url('+card.thumbnail.trending.small+')">';
              cardHtml += '<div class="bookmark"><img src="'+imgBookmarked+'" alt="bookmark"  onclick="addFavoritesTrending(this,\''+card.title+'\')"></div>';
            
            // &bull = bullet
              cardHtml +='<div class="detail flex"><p class="date">'+card.year+'</p>'+'<p>&bull;</p>'+'<p class="'+card.category+'">'+card.category+'</p>'+'<p class="bullet">&bull;</p>'+'<p class="rating">'+card.rating+'</p>' +'</div>';
              cardHtml+='<h2>'+card.title+'</h2>';
              cardHtml += '<div class="overlay"></div>';
              cardHtml += '</div>';
              scroll.innerHTML = cardHtml;
            }  
        }
    })

    function addFavoritesTrending(e,titreFilm) {
  //cette fonction on l'appelle lorsqu'on clique sur l'icone et la zone autour 
  //fonction appelée dans la div class = "card-icon"
  //let imgsrc = e.querySelector(".iconImage").src; //on récupère la source de l'image de l'élément sélectionné (e), qui est notre card
  
    if(e.src.includes("icon-bookmark-empty.svg")){
       // si notre source d'image (src)contient "icon-bookmark-empty.svg" càd icone vide
      e.src="../assets/icon-bookmark-full.svg"; //on remplace l'icone vide par une icone rempli "full"
      localStorage.setItem(titreFilm,"true");//le isbookmarked dans le local storage reprend la valeur true //à la base c'etait false vu que l'icone etait vide

    }else{
      // l'icone devient "empty" et le isbookmarked dans localstorage devient false
      e.src="../assets/icon-bookmark-empty.svg";
      localStorage.setItem(titreFilm,"false");

    }
}