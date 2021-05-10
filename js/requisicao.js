const ingressoApi = 'https://api-content.ingresso.com/v0/carousel/2/partnership/a?carousels=em-alta';
const proxy = 'https://cors-anywhere.herokuapp.com/';

const xhr = new XMLHttpRequest();

xhr.open('GET', proxy + ingressoApi); 

xhr.addEventListener('load', function(){
    
    if(xhr.status == 200){
        const resposta = xhr.responseText;
        const filmes = JSON.parse(resposta);

        filmes.forEach(element => {
            cria(element);
        });
        
    }

})

xhr.send();

function cria(element){

    const elementos = element.events;
    var i = Math.round(Math.random() * (elementos.length - 1));

    const filmeDestaque = elementos[i];
    /////////////////////////////////////////

    let destaque = document.querySelector('[data-img-destaque]');
    let img = document.createElement('img');
    img.src = imgPoster(filmeDestaque);
    img.classList.add('img-destaque');
    destaque.appendChild(img);      

    let back = document.querySelector('[data-background-destaque]');
    back.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${imgBanner(filmeDestaque)})`;
    back.style.backgroundSize = 'cover';
    back.classList.add('back-destaque');

    let titulo = document.querySelector('[data-titulo-destaque]');
    titulo.innerHTML = filmeDestaque.title;

    let tituloOriginal = document.querySelector('[data-titulo-original-destaque]');
    tituloOriginal.innerHTML = filmeDestaque.originalTitle;

    let genero = document.querySelector('[data-genero]');
    genero.innerHTML = filmeDestaque.genres[0] + ' - ' + filmeDestaque.duration + ' min';    

    let indicacao = document.querySelector('[data-indicacao]');
    indicacao.innerHTML = filmeDestaque.contentRating + ' - ' + filmeDestaque.ratingDescriptors;

    let sinopse = document.querySelector('[data-sinopse]');
    sinopse.innerHTML = filmeDestaque.synopsis;

    let direcao = document.querySelector('[data-direcao]');
    direcao.innerHTML = 'Direção: ' + filmeDestaque.director;

    let elenco = document.querySelector('[data-elenco]');
    elenco.innerHTML = 'Elenco: ' + filmeDestaque.cast;


    //////////////////////////////////////////

    elementos.forEach((others) => {  
      if(others != elementos[i]){
        criaOutros(others);
      }
   });
}



function criaOutros(others){

  imgOutros(others);
  
  const lista = document.querySelector('[data-carrossel-filmes]');

  let carrossel = document.createElement('div');
  lista.appendChild(carrossel);
  
  let img = document.createElement('img');
  img.src = imgOutros(others);
  img.classList.add('img-outros');
  carrossel.appendChild(img);   
  
  
  let titulo = document.createElement('p');
  titulo.classList.add('img-titulo');
  titulo.innerHTML = others.title;
  carrossel.appendChild(titulo);

     $(function(){
      $('.carrossel-filmes').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 2,
        arrow: true,
        prevArrow: $('#arrow-prev'),
        nextArrow: $('#arrow-next'),
        responsive: [
          {
            breakpoint: 1700, 
            settings: {
              slidesToShow: 5,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 1430,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            }
          },
          {
            breakpoint: 1244,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 1065,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 720,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          
        ]
      })  
     })

}




function imgPoster(filmeDestaque){
    
    for(i = 0; i < filmeDestaque.images.length; i++){
      const img = filmeDestaque.images[i];
      if(img.type == "PosterPortrait"){
          const poster = img.url;
          return poster;
      }  
    }
}
  
function imgBanner(filmeDestaque){
      
      for(i = 0; i < filmeDestaque.images.length; i++){
        const img = filmeDestaque.images[i];
        if(img.type == "PosterHorizontal"){
            const banner = img.url;
            return banner;
        }
        
      }
}    

function imgOutros(others){

   for(i = 0; i < others.images.length; i++){
    const img = others.images[i];
    if(img.type == "PosterPortrait"){
        const poster = img.url;
        console.log('OUTROSOUTROS');
        return poster;
    }
  }
}
          