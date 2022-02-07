/*******************PARTE 1*******************/
/********************************************/
/*CONSTANTES GLOBALES*/
const URL_PATH = "https://api.themoviedb.org"; //constante de la url de la pagina
const API_KEY = "fb37a91f7fb50c5584d5639d85e54b67"; //constante de la clave api de la pagina

/*******************PARTE 1*******************/
/********************************************/
//FUNCION DE PETICION PARA PEDIR PELICULAS
//RECIBE UN PARAMETRO EL CUAL VA SER EL NOMBRE DE LA PELICULA QUE SE VA A BUSCAR
const getMovies = (textSearch) => {
  //creamos una constante que tenga un endpoint para la peticion
  const url = `${URL_PATH}/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${textSearch}&page=1&include_adult=true`;
  //Peticion fetch
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((err) => console.log(err));
};

//FUNCION QUE SE EJECUTA AL SOLTAR UNA TECLA DEL TECLADO
//CUANDO SE ESTA BUSCANDO UNA PELICULA
//ESTA FUNCION SE LLAMA POR MEDIO DE UN EVENTO ONKEYUP EN EL HTML
const searchMovie = async () => {
  //tomamos el valor del elemento input
  const textSearch = document.getElementById("search-movie").value;
  //condicion para que solo busque despues de 3 caracteres
  if (textSearch.length < 3) {
    return;
  }
  //llamamos a la funcion getMovies
  const movies = await getMovies(textSearch);
  //variable donde vamos a crear nuestro contenido html
  let html = "";
  //creamos un bucle forEach para recorrer las peliculas
  movies.forEach((movie) => {
    //destructuring
    const { id, title, overview, poster_path } = movie;
    //variable de direccion pasandole el id
    const urlMoreInfo = `../movie.html?id=${id}`;
    //variable de la imagen, le pasamos el poster_path
    const urlImage = `https://image.tmdb.org/t/p/w500${poster_path}`;
    //creamos nuestra plantilla html
    html += `
                <div class="col-4 custom-card">
                         <div class="card">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${urlImage}" class="card-img" alt="${title}"/>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${title}</h5>
                                        <p class="card-text">${overview.substr(0,40)}...</p>
                                        <a href="${urlMoreInfo}" class="btn btn-primary">Ver más</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
      `;
  }); //termina el forEach
  //Insertamos nuestro template en nuestro html
  document.getElementsByClassName("list-card")[0].innerHTML = html;
};
