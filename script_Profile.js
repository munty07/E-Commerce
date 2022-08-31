// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {getDatabase, ref, set, get, child, update} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"

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

/////**************************/////

const uid = sessionStorage.getItem("uid");
console.log("UID logat");
console.log(uid);
const db = getDatabase();
const dbRef = ref(db);

function refreshPage(){
    window.location.reload(true);
}

get(child(dbRef, "Conturi/" + uid))
.then((snapshot) => {
    if (snapshot.exists()) {
        const displayName = snapshot.val().Nume;
        console.log(displayName);
        const username =  snapshot.val().Utilizator;
        console.log(username);


        const user_db = document.getElementById('user-db');
        if(username == ''){
            user_db.innerHTML = displayName;
        }else{
            user_db.innerHTML = username;
        }
        
        const username_db = document.getElementById('userBox');
        const name_db = document.getElementById('nameBox');
        const mail_db = document.getElementById('mailBox');
        const phone_db = document.getElementById('phoneBox');
        const county_db = document.getElementById('countyBox');
        const city_db = document.getElementById('cityBox');
        const address_db = document.getElementById('addressBox');
        const code_db = document.getElementById('codeBox');

        username_db.value =  username;
        name_db.value =  displayName;
        mail_db.value =  snapshot.val().Mail;
        phone_db.value =  snapshot.val().Telefon;
        county_db.value =  snapshot.val().Judet;
        city_db.value =  snapshot.val().Oras;
        address_db.value =  snapshot.val().Adresa;
        code_db.value =  snapshot.val().Cod_postal;

    } else {
        console.log("No data available");
    }
})
.catch((error) => {
    console.error(error);
});
/////**************************/////


///MODIFICARE DATE///

document.getElementById("saveBtn").addEventListener('click', () => {
    const username_ = document.getElementById('userBox');
    const name_ = document.getElementById('nameBox');
    const mail_ = document.getElementById('mailBox');
    const phone_ = document.getElementById('phoneBox');
    const county_ = document.getElementById('countyBox');
    const city_ = document.getElementById('cityBox');
    const address_ = document.getElementById('addressBox');
    const code_ = document.getElementById('codeBox');

    update(child(dbRef, "Conturi/" + uid), {
        Nume: name_.value,
        Utilizator: username_.value,
        Mail: mail_.value,
        Telefon: phone_.value,
        Judet: county_.value,
        Oras: city_.value,
        Adresa: address_.value,
        Cod_postal: code_.value
    })
    .then(()=>{
        document.getElementById("successUpdate").innerHTML = "Datele au fost actualizate cu succes!";
        console.log("Datele au fost actualizate");

        setTimeout(refreshPage, 3000);
         
    })
    .catch((error)=>{
        console.log(error);
    })
});

///DECONECTARE///

document.getElementById("signout").addEventListener('click', () => {
    signOut(auth)
    .then(()=>{
        console.log("Utilizatorul a fost deconectat");
        window.location.replace("form_login.html");
    })
    .catch((error)=>{
        console.log(error);
    })
});