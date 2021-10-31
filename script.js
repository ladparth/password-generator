//Length,Button, Slider elements
const passwordLengthEl = document.getElementById('myRange');
const passwordLength = document.getElementById('password-length');
const generateBtn = document.getElementById('generateBtn');
const generatedPassword =document.getElementById('generatedPassword');
const clipboard = document.getElementById('copy-to-clip');

//checkbox Elements
const lowercase = document.getElementById('lowercase');
const uppercase = document.getElementById('uppercase');
const numbersCheckbox = document.getElementById('numbers');
const specialCharactersCheckbox = document.getElementById('specialCharacters');

//Generates a string based on selected checkboxes
const stringGenerator = (lower, upper, numb, symbol) => {

    let selectedParameters = '';
    //Checks if any checkbox is selected and append appropriate string
    lowercase.checked && (selectedParameters +=lower);
    uppercase.checked && (selectedParameters += upper);
    numbersCheckbox.checked && (selectedParameters +=numb);
    specialCharactersCheckbox.checked && (selectedParameters +=symbol);

    //Returns default string if no criteria is selected
    const str = selectedParameters ==='' ? lower+upper+numb+symbol : selectedParameters;
    
    return str;
}

const checkedCriteria =() => {

    const lowercaseCharacters="abcdefghijklmnopqrstuvwxyz"
    const uppercaseCharacters = lowercaseCharacters.toUpperCase();
    const numbers = "0123456789"
    const specialCharacters = "@#$%^&*";

    //Generates Criteria String
    const criteriaString = stringGenerator(lowercaseCharacters,uppercaseCharacters,numbers,specialCharacters);
    
    //Returns Criteria string based on selected checkboxes.
    return criteriaString;
}

//Check if the Generated Password is meeting selected criteria
// i.e, if lowercase and number selected, it returns true if generated password contains both.
const passwordCriteriaCheck = (pass) => {

    const lowercaseCriteria = '(?=.[a-z])';
    const uppercaseCriteria ='(?=.*[A-Z])';
    const numbersCriteria ='(?=.*[0-9])';
    const specialCharCriteria ='(?=.*[^A-Za-z0-9])';
    
    const passwordCriteriaString = stringGenerator(lowercaseCriteria,uppercaseCriteria,numbersCriteria,specialCharCriteria);

    const passCriteriaReg = new RegExp(passwordCriteriaString);

    //RegExp method to test weather the generated password meets the criteria.
    if(passCriteriaReg.test(pass)){
        return true;
    }
    return false;
}

//Generates random password strings.
const generateRandomPassword = () => {
    let randomPassword = '';
    const passwordString = checkedCriteria();

    for(let i=0; i< passwordLengthEl.value; i++){
        const password = passwordString[Math.floor(Math.random()*passwordString.length)];
        randomPassword += password;
    }
   return randomPassword;
}

//set password length based on selected slider value
passwordLengthEl.oninput =() => {
    passwordLength.textContent = passwordLengthEl.value;
}

//Generate Button Click event, Generate & Display Password to the screen
generateBtn.addEventListener('click',() => {
    
    const randomPass = generateRandomPassword();
    const isFalse = passwordCriteriaCheck(randomPass);

    //Check if password meets the criteria, if not, generate new password and display if it meets the criteria
    if(!isFalse){
        while(!isFalse){
            const newPass = generateRandomPassword();
            if(passwordCriteriaCheck(newPass)){
                generatedPassword.textContent = newPass;
                clipboard.style.visibility = 'visible';
                break;
            }
        }
    }else{
        generatedPassword.textContent = randomPass;
        clipboard.style.visibility = 'visible';
    }
});

//Copy to Clipboard event listener
clipboard.addEventListener('click',async () => {
       await navigator.clipboard.writeText(generatedPassword.textContent).then(() => {alert(`Copied ${generatedPassword.textContent}`)}).catch((err)=> {alert(err.message)});
})


