

import {getAuth, GoogleAuthProvider, signInWithRedirect} 
from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

// folosit pentru preluarea datelor suplimentare
const auth = getAuth();

// instanta a obiectului furnizor Google
const provider = new GoogleAuthProvider();

const googleBtn = document.getElementById("googleBtn");
// eveniment pentru buton
googleBtn.addEventListener('click', function(){   
    // redirectionare catre pagina de conectare
    signInWithRedirect(auth, provider);
})


auth.onAuthStateChanged(function(user){
    const dbRef = ref(db);
    if(user){// credentiale utilizator conectat
        const uid = user.uid;
        const name = user.displayName;
        const mail = user.email;
        get(child(dbRef, "Conturi/" + uid)).then((snapshot) => {
            sessionStorage.setItem("uid", uid);// stocheaza uid-ul user-ului curent
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


const logBtn = document.getElementById("logBtn");
// eveniment pentru autentificare
logBtn.addEventListener('click', function(){
    const mail = document.getElementById("mailBox").value;
    const pass = document.getElementById("passBox").value;

    signInWithEmailAndPassword(auth, mail, pass)
    .then(() => {
        // autentificare reusita
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