// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {getDatabase, ref, set, get, child} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"

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
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();

//daca utilizatorul a ramas conectat 
//va fi redirectionat catre pagina de home
const user = auth.currentUser;
if(user){
    window.location = "/form_home.html";
}

document.getElementById("logBtn").addEventListener('click', function(){
    const mail = document.getElementById("mailBox").value;
    const pass = document.getElementById("passBox").value;
    const uid = sessionStorage.getItem("uid");

    signInWithEmailAndPassword(auth, mail, pass)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log("user - logbtn");
        console.log(user);

        console.log("conectat cu mail/pass");
        document.getElementById("error-name").innerHTML = ""
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        document.getElementById("error-name").innerHTML = "Mail sau parola gresita!";
        document.getElementById("error-name").style.color = "red";
    });
})

auth.onAuthStateChanged(function(user){
    
    const dbRef = ref(db);
    if(user){ 
        console.log("User:");
        console.log(user);
        console.log("uid");
        console.log(user.uid);
        console.log("displayName");
        console.log(user.displayName);
        console.log("email");
        console.log(user.email);
        const uid = user.uid;
        const name = user.displayName;
        const mail = user.email;

        get(child(dbRef, "Conturi/" + uid)).then((snapshot) => {
            var loader = document.getElementById("preloader");
            loader.classList.add("showing");

            console.log("UID: ");
            console.log(uid);
            sessionStorage.setItem("uid", uid);
            if(snapshot.exists()){
                window.location="/form_home.html";
            }else{
                set(ref(db, "Conturi/" + uid),{
                    Nume: name,
                    Utilizator: '',
                    Mail: mail,
                    Telefon: '',
                    Judet: '',
                    Oras: '',
                    Adresa: '',
                    Cod_postal: '',
                    Parola: ''
                })
                .then(() => {
                    alert("Contul a fost creat cu succes!");
                    window.location.replace("form_home.html");
                })
                .catch((error) => {
                    alert("Eroare: " + error);
                })
            }
        });
    }else{
        console.log("neconectat");
    }
});

document.getElementById("googleBtn").addEventListener('click', function(){   
    signInWithRedirect(auth, provider);

    getRedirectResult(auth)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log("user - googleBtn");
        console.log(user);

        console.log("conectat cu google");
    })
    .catch((error) => {
        console.log("eroare-googleBtn" + error);
    });
})