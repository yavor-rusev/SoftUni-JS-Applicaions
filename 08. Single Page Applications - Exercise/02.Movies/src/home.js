import { updateNav } from "./app.js";
import { request } from "./requester.js";
import { showDetailsSection } from "./details.js";

export async function showHome(event) {
    event?.preventDefault();      

    updateNav();

    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = "none");

    const homeSection = document.getElementById('home-page');    

    const addMovieSection = document.getElementById('add-movie-button');

    if (localStorage.getItem('userData')) {
        addMovieSection.style.display = "block";
    } else {
        addMovieSection.style.display = "none";
    }

    await loadAllMovies();

    const sectionMovies = document.getElementById('movie');
    sectionMovies.style.display = "block";

    homeSection.style.display = "block";
}

async function loadAllMovies() {
    const allMoviesURL = 'http://localhost:3030/data/movies';
    const movieList = document.getElementById('movies-list');

    const movies = await request("GET", allMoviesURL);
    movieList.replaceChildren();

    movies.forEach(movie => {        
        const movieCardLi = createMovieTemp(movie);        
        movieList.appendChild(movieCardLi);       
    })    
}

function createMovieTemp(movie) {
    const li = document.createElement('li');
    li.classList.add('card');
    li.classList.add('md-4');
    li.dataset.movieInfo = JSON.stringify(movie);

    li.innerHTML = `
        <img class="card-img-top" src=${movie.img} alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
            <a href="#">
            </a>
        </div>
        <div class="card-footer">
            <button data-id=${movie._id} type="button" class="btn btn-info" fdprocessedid="ldsyzn">Details</button>
        </div>
    `;

    const detailsButton = li.querySelector('.card-footer button');
    detailsButton.addEventListener('click', showDetailsSection);    

    // if (!localStorage.getItem('userData')) {        
    //     detailsButton.disabled = true;
    // } else {
    //     detailsButton.disabled = false;
    // }

    return li;
}


