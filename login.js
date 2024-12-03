function generatePassword(PasswordLength=8){
const Nums = "123456789";
const UpperLetters = "ABCDEFGIJKLMNOP";
const LowerLetters = "abcdefgiklmnopstrwq";
const EspSymbs = "+=!@#$%^&*()-";

const AllChars = Nums + UpperLetters + LowerLetters + EspSymbs;

let randomString = '';

for(let i = 0;i<PasswordLength;i++)
{
    let randomindex = Math.floor(Math.random() * AllChars.length);
     randomString += AllChars[randomindex];
}
 return randomString; 
}


document.addEventListener("DOMContentLoaded",() =>
{
    const toggleIcon = document.getElementById("icon1");
const toggleVis = document.getElementById("togglePassword");
const passwordField = document.querySelector("input[type='password']");
const popup = document.getElementById("popup");
const generatedPass = document.getElementById("generatedPassword");
const UsePass = document.getElementById("usePassword");
isPopupVisible = false;
passwordField.addEventListener("focus",() => 
{
    const NewPass = generatePassword();
    generatedPass.textContent = NewPass;
    popup.style.display = "block";
isPopupVisible = true;
toggleIcon.style.display = "inline";
});

toggleVis.addEventListener("click",() =>
{
const isPassVis = passwordField.type == "password";
passwordField.type = isPassVis ? "text" : "password"; 

togglePassword.name = isPassVis ? "eye-outline" : "eye-off-outline"; 
});
UsePass.addEventListener("click",() =>
{
    passwordField.value = generatedPass.textContent;
    popup.style.display = "none";
    isPopupVisible = false;

});

document.addEventListener("click" ,(event) => 
{
    if (!popup.contains(event.target) && event.target !== passwordField) {
        popup.style.display = "none";
isPopupVisible = false;
    }

});

document.addEventListener("input",() =>
{
popup.style.display = "none";

});
popup.addEventListener("click",() =>
{
isPopupVisible = true;
});
});
