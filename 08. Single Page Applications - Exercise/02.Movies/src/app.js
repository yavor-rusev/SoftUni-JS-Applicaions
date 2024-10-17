import { showHome } from "./home.js";
import { showLogin, onLogin } from "./login.js";
import { showRegister, onRegister } from "./register.js";
import { request } from "./requester.js";
import { deleteMovie, showEditSection, updateMovie, addLike } from "./details.js";

//vnimavai kolko puti zakachash listenerite

//https://c7.alamy.com/comp/2K4TMJ5/the-matrix-1999-the-matrix-movie-poster-keanu-reeves-2K4TMJ5.jpg

const basicURL = 'http://localhost:3030';

const sections = document.querySelectorAll('section');
sections.forEach(section => section.style.display = "none");

const guestNavLinks = document.querySelectorAll('.guest');
const userNavLinks = document.querySelectorAll('.user');

const welcomeLink = document.getElementById('welcome-msg');

const logoutLink = userNavLinks[1];
logoutLink.addEventListener('click', onLogout);

const moviesLink = document.querySelector('.navbar-brand');
moviesLink.addEventListener('click', showHome);

const loginLink = guestNavLinks[0];
loginLink.addEventListener('click', showLogin);

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', onLogin);

const registerLink = guestNavLinks[1];
registerLink.addEventListener('click', showRegister);

const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', onRegister);

const addMovieSection = document.getElementById('add-movie');

const addMovieForm = document.getElementById('add-movie-form');
addMovieForm.addEventListener('submit', addNewMovie);

const addMovieLink = document.querySelector('#add-movie-button a');
addMovieLink.addEventListener('click', showAddMovieSection);

const deleteLink = document.querySelector('#movie-example .btn-danger');
deleteLink.addEventListener('click', deleteMovie);

const editLink = document.querySelector('#movie-example .btn-warning');
editLink.addEventListener('click', showEditSection);

const editForm = document.querySelector('#edit-movie form');
editForm.addEventListener('submit', updateMovie);

const likeLink = document.querySelector('#movie-example .btn-primary');
likeLink.addEventListener('click', addLike);

const likesConterSpan = document.querySelector('.enrolled-span');

async function addNewMovie(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const movieData = Object.fromEntries(formData.entries());    

    if (!movieData.title || !movieData.description || !movieData.img) {
        return alert('Empty field');
    }
    const userDataJSON = localStorage.getItem("userData");
    const userToken = JSON.parse(userDataJSON).accessToken;    

    const userData = await request('POST', 'http://localhost:3030/data/movies', movieData, userToken);    
    await showHome();
}

function showAddMovieSection(event) {
    event.preventDefault();

    sections.forEach(section => section.style.display = "none");
    addMovieSection.style.display = "block";
}

export function updateNav() {    
    if (localStorage.getItem('userData')) {
        guestNavLinks.forEach(link => link.style.display = "none");
        userNavLinks.forEach(link => link.style.display = "block");
        welcomeLink.textContent = `Welcome, ${JSON.parse(localStorage.getItem("userData")).email}`;
    } else {
        userNavLinks.forEach(link => link.style.display = "none");
        guestNavLinks.forEach(link => link.style.display = "block");
        welcomeLink.textContent = 'Welcome, email';
    }
}

async function onLogout(event) {
    event.preventDefault();
    const logoutURL = 'http://localhost:3030/users/logout';
    const userDataJSON = localStorage.getItem("userData");
    const userToken = JSON.parse(userDataJSON).accessToken;

    const res = await request("GET", logoutURL, null, userToken);

    if (res.status === 204) {
        localStorage.clear();

        deleteLink.style.display = "none";
        editLink.style.display = "none";
        likeLink.style.display = "none";
        likesConterSpan.style.display = "none";

        updateNav();
        showLogin();
    } else {
        return alert(res.message);
    }
}

updateNav();
await showHome();

