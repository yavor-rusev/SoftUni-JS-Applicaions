 
export function getUserData() {   
    return JSON.parse(localStorage.getItem('userData'));
}

export function setUserData(data) {    
    localStorage.setItem('userData', JSON.stringify(data));
}

export function hasUser() {
    return !!getUserData();
}

export function getUserToken() {
    return getUserData()?.accessToken;
}

export function resetUserData(ctx) {
    localStorage.clear();
    ctx.updateNav();
}

export function hideDeleteButton(ctx) {
    const deleteButton = ctx.refs.main.querySelector('a[href="delete"]');
   
    if(deleteButton) {
        deleteButton.remove();
    }
}


