// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyB4QbCtMwmAygKrUaubiIHyHzgHTxYRzxs",
authDomain: "test-autentificare.firebaseapp.com",
databaseURL: "https://test-autentificare-default-rtdb.firebaseio.com",
projectId: "test-autentificare",
storageBucket: "test-autentificare.appspot.com",
messagingSenderId: "297047922567",
appId: "1:297047922567:web:1ec8c6da201fe836c56522"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

////////VALIDARI/////////
var name = document.getElementById("nameBox");
var username = document.getElementById("userBox");
var mail = document.getElementById("mailBox");
var phone = document.getElementById("phoneBox");
var county = document.getElementById("countyBox");
var city = document.getElementById("cityBox");
var address = document.getElementById("addressBox");
var code = document.getElementById("codeBox");
var pass = document.getElementById("passBox");
var pass2 = document.getElementById("pass2Box");

let lettersRegex = /^[a-zA-Z -]*$/;//letter, line and space 
let mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let phoneRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
let codeRegex = /^\d{6}$/;
let passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    
function validateName(){
    document.getElementById("error-name").innerHTML = ((lettersRegex.test(name.value)) ? "" : "Numele trebuie sa contina doar litere!");
}

function validateMail(){
    document.getElementById("error-mail").innerHTML = ((mailRegex.test(mail.value)) ? "" : "Mail invalid!");
}

function validatePhone(){
    document.getElementById("error-phone").innerHTML = ((phoneRegex.test(phone.value)) ? "" : "Numarul de telefon este invalid!");
}

function validateCounty(){
    document.getElementById("error-county").innerHTML = ((lettersRegex.test(county.value)) ? "" : "Judetul trebuie sa contina doar litere!");
}

function validateCity(){
    document.getElementById("error-city").innerHTML = ((lettersRegex.test(city.value)) ? "" : "Orasul trebuie sa contina doar litere!");
}

function validateCode(){
    document.getElementById("error-code").innerHTML = ((codeRegex.test(code.value)) ? "" : "Cod postal invalid!");
}

function validatePass(){
    document.getElementById("error-pass").innerHTML = ((passRegex.test(pass.value)) ? "" : "Parola trebuie sa fie formata din minim 6 caractere, cel putin o litera, un numar si un caracter special!");
}

function validatePass2(){
    document.getElementById("error-pass2").innerHTML = ((pass.value === pass2.value) ? "" : "Parolele nu coincid!");
}

name.addEventListener('keyup', validateName);
mail.addEventListener('keyup', validateMail);
phone.addEventListener('keyup', validatePhone);
county.addEventListener('keyup', validateCounty);
city.addEventListener('keyup', validateCity);
code.addEventListener('keyup', validateCode);
pass.addEventListener('keyup', validatePass);
pass2.addEventListener('keyup', validatePass2);

function validateFieldNull(field){
    if(field.value == null || field.value.match(/^ *$/) !== null){
        //field isn't good
        return false;
    }else{
        //field is good
        return true;
    }
}

function validate(){
    if(validateFieldNull(name) == false || validateFieldNull(username) == false || validateFieldNull(mail) == false || validateFieldNull(phone) == false || validateFieldNull(county) == false || validateFieldNull(city) == false || validateFieldNull(address) == false || validateFieldNull(code) == false || validateFieldNull(pass) == false || validateFieldNull(pass2) == false){
        document.getElementById("error-all").innerHTML = "Completati toate campurile!";
        document.getElementById("error-all").style.color = "red";
        return false;
    }else {
        if(document.getElementById("error-name").innerHTML != '' ||
             document.getElementById("error-mail").innerHTML != '' ||
             document.getElementById("error-phone").innerHTML != '' ||
             document.getElementById("error-county").innerHTML != '' ||
             document.getElementById("error-city").innerHTML != '' ||
             document.getElementById("error-code").innerHTML != '' ||
             document.getElementById("error-pass").innerHTML != '' ||
             document.getElementById("error-pass2").innerHTML != '' ){
                document.getElementById("error-all").innerHTML = "Date invalide!";
                document.getElementById("error-all").style.color = "red";
                return false;
        }
        else{ return true;}
    }
    return true;
}

////////////////
document.getElementById("registerBtn").addEventListener('click', function(){
    if(!validate()){
        console.log("Date invalide");
        return
    }
        
        const name = document.getElementById("nameBox").value;
        const username = document.getElementById("userBox").value;
        const mail = document.getElementById("mailBox").value;
        const phone = document.getElementById("phoneBox").value;
        const county = document.getElementById("countyBox").value;
        const city = document.getElementById("cityBox").value;
        const address = document.getElementById("addressBox").value;
        const code = document.getElementById("codeBox").value;
        const pass = document.getElementById("passBox").value;
        const pass2 = document.getElementById("pass2Box").value;

        createUserWithEmailAndPassword(auth, mail, pass)
        .then((userCredential) => {
            document.getElementById("error-all").innerHTML = "Date valide!";
            document.getElementById("error-all").style.color = "green";
            console.log("Date valide");
            
            const dbRef = ref(db);
            // Signed in 
            const user = auth.currentUser;//getCurrentUser();//userCredential.user;
            console.log("creat");
            console.log(user);

            const uid = user.uid;
            console.log(uid);
            

            get(child(dbRef, "Conturi/" + uid)).then((snapshot) => {
                if(snapshot.exists()){
                    alert("Utilizatorul exista deja!");
                }else{
                    set(ref(db, "Conturi/" + uid),{
                        Nume: name,
                        Utilizator: username,
                        Mail: mail,
                        Telefon: phone,
                        Judet: county,
                        Oras: city,
                        Adresa: address,
                        Cod_postal: code,
                        Parola: encPass(),
                        Rol: "user"
                    })
                    .then(() => {
                        alert("Contul a fost creat cu succes!");
                        ////////////
                        signOut(auth)
                        .then(()=>{
                            console.log("Utilizatorul a fost deconectat");
                            window.location.replace("form_login.html");
                        })
                        .catch((error)=>{
                            console.log(error);
                        })
                        ///////////
                    })
                    .catch((error) => {
                        alert("Eroare: " + error);
                    })
                }
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById("error-all").innerHTML = "Exista deja un cont cu aceasta adresa de mail!";
            document.getElementById("error-all").style.color = "red";
            
            console.log(errorCode + errorMessage);
        });
    
})

//functia de criptare a parolei
function encPass(){
    var psw = document.getElementById("passBox");
    var password = CryptoJS.AES.encrypt(psw.value, psw.value);
    console.log("parola criptata");
    console.log(password.toString());
    return password.toString();
}