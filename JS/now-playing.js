/*******************PARTE 1*******************/
/********************************************/
/*CONSTANTES GLOBALES*/
const URL_PATH = "https://api.themoviedb.org"; //constante de la url de la pagina
const API_KEY = "fb37a91f7fb50c5584d5639d85e54b67"; //constante de la clave api de la pagina

//EVENTO PARA EJECUTAR CUANDO SE CARGUE LA PAGINA
document.addEventListener("DOMContentLoaded", () => {
  //Usamos el metodo de destructuracion de objetos
  let { page } = getUrlVars();
  //ponemos una condicion para verificar la varible del objeto
  page == undefined ? (page = 1) : null;
  renderNewMovies(page);

  //llamamos momentaneamente la funcion renderControls aqui
  renderControls(page);
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
/*FUNCION DE PETICION PARA RETORNAR UNA PAGINA ESPECIFICA*/
//ESTA FUNCION RECIBE COMO PARAMETRO EL NUMERO DE LA PAGINA
const getNewsMovies = (page) => {
  //creamos una constante que tenga un endpoint para la peticion
  const url = `${URL_PATH}/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${page}`;
  //hacemos la peticion y la retornamos
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((err) => console.log(err));
};
/*FUNCION PARA RENDERIZAR LA PAGINA UTILIZANDO LA PETICION*/
//ESTA FUNCION RECIBE COMO PARAMETRO LA PAGINA
const renderNewMovies = async (page) => {
  //constante a la cual le asignamos la peticion le pasamos como parametro la pagina
  const movies = await getNewsMovies(page);
  //creamos la variable con la que generamos el templated
  let html = "";
  movies.forEach((movie) => {
    //destructuramos
    const { id, title, poster_path } = movie;
    //variable que contiene la url de la imagen pasandole la propiedad de poster_path
    const urlImage = `https://image.tmdb.org/t/p/w500${poster_path}`;
    //url para cargar nueva pagina
    const urlMoreInfo = `../movie.html?id=${id}`;

    //empezamos a construir nuestro templated
    html += `
                <div class="col-3 col-custom">
                            <a href="${urlMoreInfo}" class="card custom-card">
                                <img src="${urlImage}" class="card-img-top" alt="${title}"/>
                                <div class="card-body">
                                    <h4 class="card-title text-center m-0">${title}</h4>

                                </div>
                            </a>
                </div>
      `;
  }); //termina el forEach
  document.getElementsByClassName("list-cards")[0].innerHTML = html;
};

/*******************PARTE 4*******************/
/********************************************/
/*FUNCION PARA LOS CONTROLES DEL NAVBAR DE ABAJO*/
const renderControls = (page) => {
  //url de la pagina movie
  const baseUrlPage = `../now-playing.html?page=`;
  //convertimos de string a entero el numero de la pagina ingresado como parametro
  const pageNumber = parseInt(page);
  //variables para controlar Previus y Next
  const previus = pageNumber - 1;
  const next = pageNumber + 1;

  //variable para generar codigo html "TEMPLATED"
  let html = "";
  //condicional para quitarle el boton de anterior al nav
  if (pageNumber == 1) {
    html = `
        <ul class="pagination justify-content-center">
            <li class="page-item disabled">
            <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item active">
            <a class="page-link" href="${
              baseUrlPage + "1"
            }" tabindex="-1" >1</a>
            </li>
            <li class="page-item">
            <a class="page-link" href="${
              baseUrlPage + "2"
            }" tabindex="-1" >2</a>
            </li>
            <li class="page-item">
            <a class="page-link" href="${
              baseUrlPage + "3"
            }" tabindex="-1" >3</a>
            </li>
            <li class="page-item">
            <a class="page-link" href="${baseUrlPage + "2"}" >Next</a>
            </li>
        </ul>
    `;
  } //termina el if
  else {
    html = `
        <ul class="pagination justify-content-center">

            <li class="page-item" >
            <a class="page-link" href="${baseUrlPage + previus}">Previous</a>
            </li>

            <li class="page-item">
            <a class="page-link" href="${
              baseUrlPage + previus
            }" tabindex="-1" >${previus}</a>
            </li>


            <li class="page-item active">
            <a class="page-link" href="${
              baseUrlPage + page
            }" tabindex="-1" >${page}</a>
            </li>

            <li class="page-item">
            <a class="page-link" href="${
              baseUrlPage + next
            }" tabindex="-1" >${next}</a>
            </li>


            <li class="page-item">
            <a class="page-link" href="${baseUrlPage + next}" >Next</a>
            </li>
        </ul>
    `;
  }

  //renderizamos la pagina
  document.getElementsByClassName("navigation")[0].innerHTML = html;
};
