//To check if the given email is valid or not.
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
};

//To check if the given string is empty or not.
const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
};

//To convert first letter to uppercase of a string.
const capitalizeFirstLetter = (str) => {
    str = str.toLowerCase();
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

//To convert first letter to uppercase of all words of a string.
const capitalizeEveryWordFirstLetter = (str) => {
    let modifiedArray = str.split(' ').map(s => capitalizeFirstLetter(s))
    return modifiedArray.join(' ');
}

export {
    isEmail,
    isEmpty,
    capitalizeFirstLetter,
    capitalizeEveryWordFirstLetter
}