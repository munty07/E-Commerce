// PARTEA DEA AUTENTIFICARE

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


// PARTEA DE INREGISTRARE


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

    createUserWithEmailAndPassword(auth, mail, pass)
    .then(() => {
        document.getElementById("error-all").innerHTML = "Date valide!";
        document.getElementById("error-all").style.color = "green";     
        const dbRef = ref(db);
        const user = auth.currentUser;
        const uid = user.uid;
        console.log(uid);
        
        get(child(dbRef, "Conturi/" + uid)).then((snapshot) => {
            if(!snapshot.exists()){
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
                    signOut(auth)
                    .then(()=>{
                        console.log("Utilizatorul a fost deconectat");
                        window.location.replace("form_login.html");
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
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
    // returneaza parola criptata
    return password.toString();
}


// PARTEA DE RESETARE A PAROLEI

sendPasswordResetEmail(auth, email)
.then(function(){
    document.getElementById("error-mail").innerHTML = "Mail-ul a fost trimis cu succes!";
    document.getElementById("error-mail").style.color = "green";
    setTimeout(redirectPage, 1000);
})
.catch(() => {

    document.getElementById("error-mail").innerHTML = "Nu exista cont cu aceasta adresa de mail!";
    document.getElementById("error-mail").style.color = "red";
});