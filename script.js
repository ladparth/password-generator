const selectedPasswordLength = document.getElementById('myRange');
const passwordLength = document.getElementById('password-length');
const generateBtn = document.getElementById('generateBtn');
const generatedPassword =document.getElementById('generatedPassword');
const clipboard = document.getElementById('copy-to-clip');


selectedPasswordLength.oninput =() => {
    passwordLength.textContent = selectedPasswordLength.value;
}

generateBtn.addEventListener('click',() => {
    const characterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZacdefghijklnopqrstuvwxyz0123456789";
    let randomPassword = '';

    for(let i=0; i< selectedPasswordLength.value; i++){
        const password = characterString[Math.floor(Math.random()*characterString.length)];
        randomPassword += password;
    }
    
    // console.log(randomPassword);
    generatedPassword.textContent = randomPassword;
    clipboard.style.visibility = 'visible';
});

clipboard.addEventListener('click',() => {

        navigator.clipboard.writeText(generatedPassword.textContent);

        alert(`Copied ${generatedPassword.textContent}`);
})