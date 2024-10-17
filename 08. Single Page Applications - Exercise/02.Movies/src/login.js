import { request } from "./requester.js";
import { showHome } from "./home.js";

export function showLogin (event) {
    event?.preventDefault();

    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = "none");

    const loginSection = document.getElementById('form-login');
    loginSection.style.display = 'block';    
}

export async function onLogin(event) {
    event.preventDefault();

    const detailsButtons = document.querySelectorAll('.col-md-4 a');
    
    if(!localStorage.getItem('userData')) {
        detailsButtons.forEach(button => button.style.display = "none");
    }

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());   

    if (!data.email || data.password.length < 6) {       
        return alert('Invalid username or password');
    }    

    const userData = await request('POST','http://localhost:3030/users/login', data);    

    if(userData) {
        if(userData.code && userData.code === 403) {
            return alert(userData.message)
        }

        localStorage.setItem("userData", JSON.stringify(userData));
    } else {
        return alert("User with this name already exist!")
    }    

    await showHome();
}