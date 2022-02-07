/*******************PARTE 1*******************/
/********************************************/
/*CONSTANTES GLOBALES*/
const URL_PATH = "https://api.themoviedb.org"; //constante de la url de la pagina
const API_KEY = "fb37a91f7fb50c5584d5639d85e54b67"; //constante de la clave api de la pagina

/*ESCUCHADOR DE EVENTO PARA CUANDO LA PAGINA SE CARGUE*/
document.addEventListener("DOMContentLoaded", () => {
  renderNewsMovies();
  renderMovies("top_rated", "top-rated-playing__list");
  renderMovies("popular", "now-playing__list");
});

/*******************PARTE 2*******************/
/*************NO EN USO**********************/
/*METODO QUE GENERA UNA PETICION PARA QUE NOS DEVUELVA TODAS LAS PELICULAS*/
//ENDPOINT
const getNewsMovies = () => {
  //variable que almacena el endpoint donde tomaremos las peliculas
  const url = `${URL_PATH}/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`;
  //hacemos el retorno de una peticion que nos devolvera las peliculas
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((err) => console.log(err));
};
/*METODO QUE GENERA UNA PETICION PARA QUE NOS DEVUELVA TODAS LAS PELICULAS POPULARES*/
//ENDPOINT
const getPopularMovies = () => {
  //creamos una constante de nuestro endpoint para obtener las peliculas mas populares
  const url = `${URL_PATH}/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;
  //retornamos la peticion fetch
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((err) => console.log(err));
};
/*METODO QUE GENERA UNA PETICION PARA QUE NOS DEVUELVA TODAS LAS PELICULAS RANKEADAS*/
//ENDPOINT
const getTopRatedMovies = () => {
  //constante que va ser la url del endpoint
  const url = `${URL_PATH}/3/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`;
  //retornamos la peticion del endpoint
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((err) => console.log(err));
};

/*******************PARTE 3*******************/
/****************VALIDA**********************/
//PODEMOS OPTIMIZAR CODIGO HACIENDO SOLO UNA FUNCION DE LAS FUNCIONES GET DE LA /*PARTE 2*/
//ESTA ES UNA FUNCION QUE LE PASAMOS UN PARAMETRO DE TIPO, EN VES DE TENER 3 FUNCIONES.
const getMovies = (type) => {
  //constante que va ser la url del endpoint
  const url = `${URL_PATH}/3/movie/${type}?api_key=${API_KEY}&language=es-ES&page=1`;
  //retornamos la peticion del endpoint
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((err) => console.log(err));
};

/*******************PARTE 4*******************/
/****************VALIDA**********************/
/*METODO PARA OBTENER PELICULAS Y METERLAS AL CAROUSEL*/
const renderNewsMovies = async () => {
  //funcion asyncrona que la volvemos sincrona y recibe el tipo de parametro
  const newMovies = await getNewsMovies("now_playing");
  //variable html para generar los templates
  let html = "";

  newMovies.forEach((movie, index) => {
    //utilizamos el metodo destructuracion
    const { id, title, overview, backdrop_path } = movie;
    //almacenamos el backdrop en una variable para que nos genere la imagen
    const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    //creamos una variable que almacena la direccion de la informacion de la pelicula
    const urlMovie = `../movie.html?id=${id}`;

    //generamos el template
    //generamos una condicion, cuando el index es 0 va tener una clase active
    html += `
    <div class="carousel-item ${index === 0 ? "active" : null}" 
      style="background-image: url('${urlImage}')">
      
        <div class="carousel-caption">
              <h5>${title}</h5>
              <p>${overview}</p>
              <a href="${urlMovie}" class="btn btn-primary">Mas informacion</a>
        </div>
    
    </div>
    `;
  }); //termina el ForEach

  //le agragamos las flechas al html cuando acabe el bucle
  html += `
  <a class="carousel-control-prev" href="#carousel-news-movies" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Anterior</span>
  </a>
  <a class="carousel-control-next" href="#carousel-news-movies" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Siguiente</span>
  </a>
  `;
  document.getElementsByClassName("list-news-movies")[0].innerHTML = html;
};

/*******************PARTE 5*******************/
/*************NO EN USO**********************/
//PODEMOS OPTIMIZAR ESTAS FUNCIONES

/*METODO PARA OBTENER LAS PELICULAS MAS RANKEADAS Y METERLAS EN EL HTML*/
const renderTopRatedMovies = async () => {
  //creamos una constante para almacenar en la peticion de las peliculas
  const movies = await getTopRatedMovies("top_rated");
  //creamos la variable donde almacenaremos nuestro templated
  let html = "";
  //creamos el forEach para la constante con la peticion
  movies.forEach((movie, index) => {
    //utilizamos la forma destructuracion de objetos
    const { id, title, poster_path } = movie;
    //creamos una variable que contenga la url de la imagen
    const movieCover = `https://image.tmdb.org/t/p/w500${poster_path}`;
    //constante de la direccion de la pagina de peliculas con el id
    const urlMovie = `../movie.html?id=${id}`;

    if (index < 5) {
      html += `
          <li class="list-group-item">
                <img src="${movieCover}" alt="${title}"/>
                <h3>${title}</h3>
                <a href="${urlMovie}" class="btn btn-primary">Ver más</a>
          </li>
      `;
    } //termina el if
  }); //termina el forEach
  //metemos el template en el documento html
  document.getElementsByClassName(
    "top-rated-playing__list"
  )[0].innerHTML = html;
};
/*METODO PARA OBTENER LAS PELICULAS MAS POPULARES Y METERLAS AL HTML*/
const renderPopularMovies = async () => {
  //funcion asyncrona que la volvemos sincrona
  const movies = await getPopularMovies("popular");
  //creamos nuestra variable para el template
  let html = "";
  //hacemos el bucle forEach para recorrer los objetos
  movies.forEach((movie, index) => {
    //utilizamos la forma destructuracion de objetos
    const { id, title, poster_path } = movie;
    //creamos una variable que contenga la url de la imagen
    const movieCover = `https://image.tmdb.org/t/p/original${poster_path}`;
    //url de la pelicula
    const urlMovie = `../movie.html?id=${id}`;
    //condicional para que nos muestre las 5 primeras peliculas atravez del index
    if (index < 5) {
      html += `
      <li class="list-group-item">
            <img src="${movieCover}" alt="${title}"/>
            <h3>${title}</h3>
            <a href="${urlMovie}" class="btn btn-primary">Ver más</a>
      </li>
      `;
    }
    /*Agregamos el template a nuestro html*/
    document.getElementsByClassName("now-playing__list")[0].innerHTML = html;
  }); //termina el forEach
};

/*******************PARTE 6*******************/
/****************VALIDA**********************/
//OPTIMIZACION DE LAS FUNCIONES DE LA /*PARTE 5*/

const renderMovies = async (type, classLoc) => {
  //funcion asyncrona que la volvemos sincrona
  const movies = await getPopularMovies(type);
  //creamos nuestra variable para el template
  let html = "";
  //hacemos el bucle forEach para recorrer los objetos
  movies.forEach((movie, index) => {
    //utilizamos la forma destructuracion de objetos
    const { id, title, poster_path } = movie;
    //creamos una variable que contenga la url de la imagen
    const movieCover = `https://image.tmdb.org/t/p/original${poster_path}`;
    //url de la pelicula
    const urlMovie = `../movie.html?id=${id}`;
    //condicional para que nos muestre las 5 primeras peliculas atravez del index
    if (index < 5) {
      html += `
      <li class="list-group-item">
            <img src="${movieCover}" alt="${title}"/>
            <h3>${title}</h3>
            <a href="${urlMovie}" class="btn btn-primary">Ver más</a>
      </li>
      `;
    }
    /*Agregamos el template a nuestro html*/
    document.getElementsByClassName(classLoc)[0].innerHTML = html;
  }); //termina el forEach
};
