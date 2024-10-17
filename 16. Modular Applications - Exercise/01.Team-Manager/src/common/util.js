
/**
 * Stores user data in local storage.
 * @param {import("./types.js").UserData} data 
 */
export function setUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
}


/**
 * Gets user data from local storage. 
 * @returns {import("./types.js").UserData}
 */
export function getUserData() {
    return JSON.parse(localStorage.getItem("user"));
}


/**
 * Clears user data from local storage. 
 * @returns {void}
 */
export function clearUserData() {
    localStorage.removeItem("user");
}


/**
 * Checks if there is user data in local storage.
 * @returns {boolean}
 */
export function hasUser() {
    return !!getUserData();
}


/**
 * Returns "username" of currently logged-in user, which is stored in local storage.
 * @returns {string}
 */
export function getUserName() {
    return getUserData()?.username;
}


/**
 * Checks if currently logged-in user is owner of an item.
 * @param {string | undefined | null} itemOwnerId 
 * @returns {boolean | undefined}
 */
export function isOwner(itemOwnerId) {
    if(itemOwnerId){
        return getUserData()?._id === itemOwnerId;
    }

    alert("Owner ID is " + itemOwnerId + " or falsy value");
}



/**
 * Updates navigation buttons for logged-in user or guest.
 * @returns {void}
 */
export function updateNav() {
    const userData = getUserData();      
    
    /**
     * @type {NodeListOf<HTMLElement>}
     */
    const userNav = document.querySelectorAll(".user");

    /**
     * @type {NodeListOf<HTMLElement>}
     */
    const guestNav = document.querySelectorAll(".guest");    
    
    if(userData) {
        userNav.forEach(x => x.style.display = "inline-block");
        guestNav.forEach(x => x.style.display = "none");
    } else {
        userNav.forEach(x => x.style.display = "none");
        guestNav.forEach(x => x.style.display = "inline-block");
    }
}


/**
 * Creates a submit event handler that processes form data and passes it to a callback function.
 * @param {Function} callback - The function to be called with the processed form data.
 * The callback receives two parameters:
 * - `data` {Object}: An object containing the form data as key-value pairs, where the values are trimmed strings.
 * - `form` {HTMLFormElement}: The form element that triggered the submit event.
 * 
 * @returns {Function} - The event handler function for the submit event.
 * The returned function will:
 * - Prevent the default form submission behavior.
 * - Extract the form data, trim values, and pass the processed data to the provided callback function.
 */
export function createSubmitHandler(callback) {

    /**
     * Submit event handler that:
     * - Prevent the default form submission behavior.
     * - Extract the form data, trim values, and pass the processed data to the provided callback function.
     * @param {*} event - Submit event object from form.
     */
    return function handler(event) {        
        event.preventDefault();        
       
        const formData = new FormData(event.target);

        /**
        //  * @type {Array<Array>}
         */
        const data = [...formData.entries()]
        data.map(([k, v]) => [k, v.trim()]);        

        callback(Object.fromEntries(data), event.target);
    }
}


/**
 * 
 * @param {string} email - Returns a Boolean value that indicates whether or not an email is valid.
 * @returns {boolean}
 */
export function emailIsValid(email) {
    let regex = /^([A-Za-z0-9]+[A-Za-z0-9.\-_]*)@([a-z]+\-?[a-z]+)(\.[a-z]+)$/;
    return regex.test(email);
}

