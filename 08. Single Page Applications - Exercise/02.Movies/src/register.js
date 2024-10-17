import { request } from "./requester.js";
import { showHome } from "./home.js";

export function showRegister (event) {
    event.preventDefault();

    const detailsButtons = document.querySelectorAll('.col-md-4 a');
    
    if(!localStorage.getItem('userData')) {
        detailsButtons.forEach(button => button.style.display = "none");
    }

    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = "none");

    const registerSection = document.getElementById('form-sign-up');
    registerSection.style.display = 'block';    
}

export async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!data.email || data.password.length < 6 || data.repeatPassword !== data.password) {
        return alert('Invalid username or password');
    }    

    delete data.repeatPassword;    

    const userData = await request('POST','http://localhost:3030/users/register', data);
    
    if(userData) {
        if(userData.code && userData.code === 409) {
            return alert(userData.message)
        }

        localStorage.setItem("userData", JSON.stringify(userData));
    } else {
        return alert("User with this name already exist!")
    }

    await showHome();
}

