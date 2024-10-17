export function setUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(localStorage.getItem("user"));
}

export function clearUserData() {
    localStorage.removeItem("user");
}

export function isOwner(itemOwnerId) {
    if(itemOwnerId){
        return getUserData()?._id === itemOwnerId;
    }

    alert("Owner ID is " + itemOwnerId + " or falsy value");
}

export function updateNav() {
    const userData = getUserData();
    
    const userNav = document.querySelector("div.user");
    const guestNav = document.querySelector("div.guest");      

    if(userData) {
        userNav.style.display = "block";
        guestNav.style.display = "none";
    } else {
        userNav.style.display = "none";
        guestNav.style.display = "block";
    }
}


export function createSubmitHandler(callback) {
    return function handler(event) {        
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const data = [...formData.entries()].map(([k, v]) => [k, v.trim()]);       

        const emptyField = data.some(([k, v]) => v === "");

        if (emptyField) {
            return alert("All fields are required!");
        }

        callback(Object.fromEntries(data), event.target);
    }
}

export function parseQuery(ctx, next) {    
    const query = decodeURIComponent(ctx.querystring);    

    if (query) {
        ctx.queries = Object.fromEntries(query.split("&").map(prop => prop.split("=")));                      
    }

    next();
}

