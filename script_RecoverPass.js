//-------------Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

//-------------Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4QbCtMwmAygKrUaubiIHyHzgHTxYRzxs",
    authDomain: "test-autentificare.firebaseapp.com",
    databaseURL: "https://test-autentificare-default-rtdb.firebaseio.com",
    projectId: "test-autentificare",
    storageBucket: "test-autentificare.appspot.com",
    messagingSenderId: "297047922567",
    appId: "1:297047922567:web:1ec8c6da201fe836c56522"
};

//-------------Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

//-------------references
var mail = document.getElementById("mailBox");

auth.languageCode = 'ro';

function sendMail(){
    const email = mail.value;
    console.log("mail recover");
    console.log(email);
   if(email != ""){
       sendPasswordResetEmail(auth, email)
       .then(function(){
            document.getElementById("error-mail").innerHTML = "Mail-ul a fost trimis cu succes!";
            document.getElementById("error-mail").style.color = "green";
            setTimeout(redirectPage, 1000);
       })
       .catch(function(error){
           var errorCode = error.code;
           var errorMessage = error.message;

           console.log(errorCode);
           console.log(errorMessage);

           console.log("Message: " + errorMessage);

           document.getElementById("error-mail").innerHTML = "Nu exista cont cu aceasta adresa de mail!";
           document.getElementById("error-mail").style.color = "red";
       });
    }else{
        document.getElementById("error-mail").innerHTML = "Completati campul!";
        document.getElementById("error-mail").style.color = "red";
    }
}

function redirectPage(){
    window.location = "/form_login.html";
}

document.getElementById("send").addEventListener('click', sendMail);