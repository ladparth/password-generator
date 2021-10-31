const selectedPasswordLength = document.getElementById('myRange');
const passwordLength = document.getElementById('password-length');
const generateBtn = document.getElementById('generateBtn');
const generatedPassword =document.getElementById('generatedPassword');
const clipboard = document.getElementById('copy-to-clip');

const checked =() => {

    const lowercase = document.getElementById('lowercase');
    const uppercase = document.getElementById('uppercase');
    const numbersCheckbox = document.getElementById('numbers');
    const specialCharactersCheckbox = document.getElementById('specialCharacters');

    const lowercaseCharacters="abcdefghijklmnopqrstuvwxyz"
    const uppercaseCharacters = lowercaseCharacters.toUpperCase();
    const numbers = "0123456789"
    const specialCharacters = "@#$%^&*";
    
    let selectedCheckboxes = '';

    lowercase.checked && (selectedCheckboxes +=lowercaseCharacters);
    uppercase.checked && (selectedCheckboxes += uppercaseCharacters);
    numbersCheckbox.checked && (selectedCheckboxes +=numbers);
    specialCharactersCheckbox.checked && (selectedCheckboxes +=specialCharacters);

    const passwordString = selectedCheckboxes ==='' ? lowercaseCharacters+uppercaseCharacters+numbers+specialCharacters : selectedCheckboxes;

    return passwordString;
}

selectedPasswordLength.oninput =() => {
    passwordLength.textContent = selectedPasswordLength.value;
}

generateBtn.addEventListener('click',() => {
    let randomPassword = '';

    const passwordString = checked();

    for(let i=0; i< selectedPasswordLength.value; i++){
        const password = passwordString[Math.floor(Math.random()*passwordString.length)];
        randomPassword += password;
    }
    generatedPassword.textContent = randomPassword;
    clipboard.style.visibility = 'visible';
});

clipboard.addEventListener('click',async () => {
       await navigator.clipboard.writeText(generatedPassword.textContent).then(() => {alert(`Copied ${generatedPassword.textContent}`)}).catch((err)=> {alert(err.message)});
})