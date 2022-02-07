/*******************PARTE 1*******************/
/********************************************/
/*CONSTANTES GLOBALES*/
const URL_PATH = "https://api.themoviedb.org"; //constante de la url de la pagina
const API_KEY = "fb37a91f7fb50c5584d5639d85e54b67"; //constante de la clave api de la pagina
/*VARIABLE GLOBAL*/
let MOVIE_ID = "";

/*ESCUCHADOR DE EVENTO PARA CUANDO LA PAGINA SE CARGUE*/
document.addEventListener("DOMContentLoaded", () => {
  //LE DAMOS EL VALOR A LA VARIABLE MOVIE_ID, DE LA FUNCION getUrlVars
  MOVIE_ID = getUrlVars().id;
  renderMovieDetails(MOVIE_ID);
});

/*******************PARTE 2*******************/
/********************************************/
/*FUNCION PARA RETORNAR EL ID DE LA PELICULA, OBTENIENDOLO DE LA URL DE LA PAGINA*/
//ESTA FUNCION ES UN ALGORITMO DE UNA EXPRESION REGULAR
const getUrlVars = () => {
  let vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
};

/*******************PARTE 3*******************/
/********************************************/
/*FUNCION PARA OBTENER LAS PELICULAS DE NUESTRO ENDPOINT 
PASANDOLE UN PARAMETRO QUE VA SER EL ID DE LA PELICULA*/
const getMovieDetails = (movieId) => {
  //constante que representa nuestro endpoint
  const url = `${URL_PATH}/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;
  //generamos la peticion y la retornamos
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => console.log(err));
};

/***FUNCION PARA RENDERIZAR LA PAGINA ASYNCRONA QUE LA VOLVEMOS SINCRONA***/
//RENDERIZAMOS METIENDOLE CODIGO HTML A NUESTRO DOCUMENTO HTML
const renderMovieDetails = async (movieId) => {
  //CONSTANTE PARA GUARDAR LA PETICION Y LE PASAMOS EL ID DE LA PELICULA
  const movieDetails = await getMovieDetails(movieId);
  //USAMOS LA FORMA DESTRUCTURACION DE OBJETOS
  const {
    backdrop_path,
    poster_path,
    title,
    overview,
    genres,
    release_date,
  } = movieDetails;
  //LLAMAMOS A LA FUNCION renderBackground y le pasamos el parametro del background_path
  renderBackground(backdrop_path);
  //LLAMAMOS A LA FUNCION renderPoster y le pasamos los parametros de title y posterPath
  renderPoster(poster_path, title);
  //LLAMAMOS A LA FUNCION renderMovieData y le pasamos los parametros
  renderMovieData(title, overview, genres, release_date);
  //LLAMAMOS A LA FUNCION getTeaser y le pasamos el id como parametro
  getTeaser(MOVIE_ID);
};

/*******************PARTE 4*******************/
/*FUNCION PARA RENDERIZAR EL BACKGROUND DE LA PAGINA */
//ESTA FUNCION SERA ANIDADA EN renderMoviesDetails()
const renderBackground = (backdrop_path) => {
  //constante con la url de la imagen, y la pasamos el id de la imagen
  const urlBackground = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  //le pasamos a un elemento div como background la imagen
  document.getElementsByClassName(
    "movie-info"
  )[0].style.backgroundImage = `url('${urlBackground}')`;
};

/*******************PARTE 5*******************/
/*FUNCION PARA RENDERIZAR EL POSTER DE LA PELICULA*/
//ESTA FUNCION SERA ANIDADA EN renderMoviesDetails()
const renderPoster = (poster_path, title) => {
  //constante con la url de la imagen, y la pasamos el id de la imagen
  const urlPoster = `https://image.tmdb.org/t/p/original${poster_path}`;
  //creamos el template
  const html = `
        <img src ="${urlPoster}" class="img-fluid movie-info__poster-img" alt="${title}" />
  `;

  document.getElementsByClassName("movie-info__poster")[0].innerHTML = html;
};

/*******************PARTE 6*******************/
/*FUNCION PARA RENDERIZAR LOS DATOS DE LA PELICULA*/
//ESTA FUNCION SERA ANIDADA EN renderMoviesDetails()
const renderMovieData = (title, overview, genres, release_date) => {
  //creamos una variable htmlGeneros para generar el template de los generos
  let htmlGenres = "";
  //recorremos los generos con un forEach porque es un array
  genres.forEach((genre) => {
    htmlGenres += `
        <li>${genre.name}</li>    
    `;
  });
  //creamos una matriz para la fecha
  const dataSplit = release_date.split("-");
  //creamos el template
  const html = `
      <h1>
      ${title}
      <span class="date-any">${dataSplit[0]}</span>
      <span class="teaser" data-toggle="modal" data-target="#video-teaser">
      <i class="fas fa-play"></i>Ver trailer</span>
      </h1>
      <h5>General</h5>
      <p>${overview}</p>
      <h5>Generos</h5>
      <ul>
      ${htmlGenres}
      </ul>

  `;

  document.getElementsByClassName("movie-info__data")[0].innerHTML = html;
};

/*******************PARTE 7*******************/
/*FUNCION DE PETICION PARA OBTENER EL TRAILER DE LA PELICULA*/
const getTeaser = (movieId) => {
  //URL DEL ENDPOINT
  const url = `${URL_PATH}/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-EN`;
  //FETCH PARA LA PETICION
  fetch(url)
    .then((response) => response.json())
    .then((result) => renderTeaser(result))
    .catch((err) => console.log(err));
};

/*FUNCION RENDERIZAR EL TRAILER DE LA PELICULA*/
const renderTeaser = (objVideo) => {
  //variables por destructuracion
  const { key } = objVideo.results[0];

  let urlIframe = "";

  if (key) {
    urlIframe = `
    <iframe width="100%" height="440px" src="https://www.youtube.com/embed/${key}"
    frameborder="0" allow="accelerometer"; autoplay;  ecrypted-media;
    gryscope; picture-in-pincture"allowfullscreen></iframe>
      `;
  } else {
    urlIframe = `<div class="no-teaser">La pelicula no tiene Trailer</div>`;
  }

  document.getElementsByClassName(
    "video-teaser-iframe"
  )[0].innerHTML = urlIframe;
};
