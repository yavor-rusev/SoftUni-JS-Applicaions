import { showHome } from "./home.js";
import { request } from "./requester.js";

export async function showDetailsSection(event, editedMovieId) {
    event?.preventDefault();    

    const allMoviesURL = 'http://localhost:3030/data/movies';

    const userDataJSON = localStorage.getItem("userData");
    const userToken = JSON.parse(userDataJSON).accessToken;

    if(!userToken) {
        return
    }

    const detailsButtons = document.querySelectorAll('.col-md-4 a');
    detailsButtons.forEach(button => button.style.display = "none");

    const allMovies = await request("GET", allMoviesURL, null, userToken);

    let movieId = "";
    if (event) {
        const movieCardId = event.target.dataset.id;
        movieId = movieCardId;
    } else {
        movieId = editedMovieId;
    }

    const thisMovieData = allMovies.find(movie => movie._id === movieId);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = "none");

    const detailsSection = document.getElementById('movie-example');

    const descriptionDiv = detailsSection.querySelector('.col-md-4');
    descriptionDiv.dataset.movieId = movieId;

    const deleteLink = detailsSection.querySelector('.btn-danger');
    const editLink = detailsSection.querySelector('.btn-warning');
    const likeLink = detailsSection.querySelector('.btn-primary');

    const likesConterSpan = detailsSection.querySelector('.enrolled-span');
    const likesCount = await getLikesCount(null, movieId);
    likesConterSpan.style.display = "";  
    likesConterSpan.textContent = `Liked ${likesCount}`;


    const userId = JSON.parse(userDataJSON)._id;
    const movieOwnerId = thisMovieData._ownerId;

    const userHasLikedMovieURL = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`;

    const arrayWithThisUserLikeObject = await request("GET", userHasLikedMovieURL, null, userToken);
    const userHasAlreadyLikedThisMovie = !!arrayWithThisUserLikeObject.length;    

    

    if (!userId) {
        deleteLink.style.display = "none";
        editLink.style.display = "none";
        likeLink.style.display = "none";
        likesConterSpan.style.display = "none";
    } else {
        if (userId === movieOwnerId) {
            deleteLink.style.display = "inline-block";
            editLink.style.display = "inline-block";
            likeLink.style.display = "none";            
            likesConterSpan.style.display = "";
        } else {
            deleteLink.style.display = "none";
            editLink.style.display = "none";                        

            if (userHasAlreadyLikedThisMovie) {
                likeLink.style.display = "none";
                likesConterSpan.style.display = "";
            } else {
                likeLink.style.display = "inline-block";
                likesConterSpan.style.display = "none";
            }
        }
    }
    
    const titleRef = detailsSection.querySelector('.bg-light h1');
    titleRef.textContent = `Movie title: ${thisMovieData.title}`;

    const imgRef = detailsSection.querySelector('.img-thumbnail');
    imgRef.src = thisMovieData.img;

    const descriptionRef = detailsSection.querySelector('.col-md-4 p');
    descriptionRef.textContent = thisMovieData.description;

    detailsSection.style.display = "block";
}

export async function deleteMovie(event) {
    event.preventDefault();

    const movieId = event.currentTarget.parentElement.dataset.movieId;
    const deleteURL = `http://localhost:3030/data/movies/${movieId}`;
    const userDataJSON = localStorage.getItem("userData");

    const userToken = JSON.parse(userDataJSON).accessToken;

    await request("DELETE", deleteURL, null, userToken);
    localStorage.clear();

    await showHome();
}

export function showEditSection(event) {
    event.preventDefault();

    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = "none");

    const editSection = document.getElementById('edit-movie');

    const movieData = getMovieCardInfo(event);
    const movieId = event.currentTarget.parentElement.dataset.movieId;

    const editForm = editSection.querySelector('form');
    editForm.dataset.movieId = movieId;

    const titleInputRef = editForm.querySelector('#title');
    titleInputRef.value = movieData.title;

    const descriptionTextareaRef = editForm.querySelector('textarea');
    descriptionTextareaRef.value = movieData.description;

    const imgInputRef = editForm.querySelector('#imageUrl');
    imgInputRef.value = movieData.img;

    editSection.style.display = "block";
}


export async function updateMovie(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const editedData = Object.fromEntries(formData.entries());

    if (!editedData.title || !editedData.description || !editedData.img) {
        return alert('Empty field');
    }

    const movieId = event.currentTarget.dataset.movieId;
    const updateURL = `http://localhost:3030/data/movies/${movieId}`;
    const userDataJSON = localStorage.getItem("userData");
    const userToken = JSON.parse(userDataJSON).accessToken;

    const updatedData = await request('PUT', updateURL, editedData, userToken);

    await showDetailsSection(null, movieId);
}

function getMovieCardInfo(event) {
    const cardDiv = event.currentTarget.parentElement.parentElement;
    const movieTitle = cardDiv.querySelector('h1').textContent.split('Movie title: ').join('');
    const movieImg = cardDiv.querySelector('img').src;
    const movieDescription = cardDiv.querySelector('.col-md-4 p').textContent;

    return { title: movieTitle, img: movieImg, description: movieDescription };
}

export async function addLike(event) {
    event.preventDefault();

    const likeLink = event.currentTarget;
    const movieId = likeLink.parentElement.dataset.movieId;
    const userDataJSON = localStorage.getItem("userData");
    const userId = JSON.parse(userDataJSON)._id;
    const userToken = JSON.parse(userDataJSON).accessToken;

    const userHasLikedMovieURL = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`;

    const arrayWithThisUserLikeObject = await request("GET", userHasLikedMovieURL, null, userToken);
    const userHasAlreadyLikedThisMovie = !!arrayWithThisUserLikeObject.length;

    if(userHasAlreadyLikedThisMovie) {
        likeLink.style.display = "none";
        likesConterSpan.style.display = "";
        return
    }

    const likeURL = 'http://localhost:3030/data/likes';        
    const likeData = { movieId };   

    const response = await request('POST', likeURL, likeData, userToken);

    const likesConterSpan = likeLink.parentElement.querySelector('span');
    
    const newLikesCount = Number(likesConterSpan.textContent.split("Liked ").join("")) + 1;
    likesConterSpan.textContent = `Liked ${newLikesCount}`;

    likeLink.style.display = "none";
    likesConterSpan.style.display = "";
}

export async function getLikesCount(event, movieId) {
    debugger
    const likesCountURL = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`
    const userDataJSON = localStorage.getItem("userData");
    const userToken = JSON.parse(userDataJSON).accessToken;

    const likesCount = await request('GET', likesCountURL, null, userToken);
    return likesCount;
}

/*
const endpoints = {
  register: '/users/register',
  login: '/users/login',
  logout: '/users/logout',
  catalog: '/data/movies',
  create: '/data/movies',
  like: '/data/likes',
  edit: (id) => `/data/movies/${id}`,
  delete: (id) => `/data/movies/${id}`,
  details: (id) => `/data/movies/${id}`,
  total: (likeId) =>
    `/data/likes?where=movieId%3D%22${likeId}%22&distinct=_ownerId&count`,
  unlike: (likeId) => `/data/likes/${likeId}`,
  own: (likeId, userId) =>
    `/data/likes?where=movieId%3D%22${likeId}%22%20and%20_ownerId%3D%22${userId}%22`,
};*/

/*
Peter ID - 35c62d76-8152-4626-8712-eeb96381bea8

/*proverka s 
Get like for a movie from specific user: http://localhost:3030/data/likes?where=movieId%3D%22{movieId}%22%20and%20_ownerId%3D%22{userId}%22

vrushta obekt, ako dadeniq v urla user e laiknal tozi film. Inache vrushta prazen masiv

[
    {
        "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
        "movieId": "0637e70f-566b-48a3-8e09-e41fbbf00278",
        "_createdOn": 1717328421758,
        "_id": "84981f42-68a9-4410-86eb-7986066a49f6"
    }
]
*/

/*[
    {
        "_ownerId": "847ec027-f659-4086-8032-5173e2f9c93a",
        "title": "Black Widow",
        "description": "Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Comes on the screens 2020.",
        "img": "https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg",
        "_createdOn": 1614935055353,
        "_id": "1240549d-f0e0-497e-ab99-eb8f703713d7"
    },
    {
        "_ownerId": "847ec027-f659-4086-8032-5173e2f9c93a",
        "title": "Wonder Woman 1984",
        "description": "Diana must contend with a work colleague and businessman, whose desire for extreme wealth sends the world down a path of destruction, after an ancient artifact that grants wishes goes missing.",
        "img": "https://pbs.twimg.com/media/ETINgKwWAAAyA4r.jpg",
        "_createdOn": 1614935181470,
        "_id": "143e5265-333e-4150-80e4-16b61de31aa0"
    },
    {
        "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
        "title": "Top Gun 2",
        "description": "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
        "img": "https://i.pinimg.com/originals/f2/a4/58/f2a458048757bc6914d559c9e4dc962a.jpg",
        "_createdOn": 1614935268135,
        "_id": "a9bae6d8-793e-46c4-a9db-deb9e3484909"
    },
    {
        "_ownerId": "15601f95-4ed0-45af-9d4e-283ee77f55bc",
        "title": "Matrix",
        "description": "Sci-Fi",
        "img": "https://c7.alamy.com/comp/2K4TMJ5/the-matrix-1999-the-matrix-movie-poster-keanu-reeves-2K4TMJ5.jpg",
        "_createdOn": 1717326675123,
        "_id": "0637e70f-566b-48a3-8e09-e41fbbf00278"
    }
]*/
