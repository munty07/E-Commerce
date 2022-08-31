// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
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
const auth = getAuth();

/////**************************/////

const uid = sessionStorage.getItem("uid");
console.log("UID logat");
console.log(uid);
const db = getDatabase();
const dbRef = ref(db);
get(child(dbRef, "Conturi/" + uid))
.then((snapshot) => {
    if (snapshot.exists()) {
        const displayName = snapshot.val().Nume;
        console.log(displayName);
        const username =  snapshot.val().Utilizator;
        console.log(username);
        if(username == ''){
            const user_db = document.getElementById('user-db');
            user_db.innerHTML = displayName;
        }else{
            const user_db = document.getElementById('user-db');
            user_db.innerHTML = username;
        }
        const name_db = document.getElementById('txtNume');
        const mail_db = document.getElementById('txtEmail');
        
        name_db.value =  displayName;
        mail_db.value =  snapshot.val().Mail;
    } else {
        console.log("No data available");
    }
})
.catch((error) => {
    console.error(error);
});
/////**************************/////


function sendEmail() {
    console.log("Send mail - adresa");
    console.log(document.getElementById("txtEmail").value);
    console.log("send mail - subiect");
    console.log(document.getElementById("txtSubiect").value);
    console.log("send mail - mesaj");
    console.log(document.getElementById("txtMesaj").value);
    if(document.getElementById("txtMesaj").value === '' || document.getElementById("txtEmail").value === '' || document.getElementById("txtNume").value === ''){
        document.getElementById("success-mail").innerHTML = "Completati campurile obligatorii, cele marcate cu *.";
        document.getElementById("success-mail").style.color = "red";
    }else{
        Email.send({
        SecureToken : "d4e41b30-45f4-4df0-9742-b6750961dc90",
        To : document.getElementById("txtEmail").value,
        From : "muntyancraciunela@gmail.com",
        Subject : "Confirmare",
        Body : 
            "<table align='center' border='0' cellpadding='0' cellspacing='0'" +
                "width='550' bgcolor='white' style='border:2px solid black'>" +
                "<tbody>" +
                    "<tr>"+
                        "<td align='center'>"+
                            "<table align='center' border='0' cellpadding='0'"+
                                    "cellspacing='0' class='col-550' width='550'>"+
                                "<tbody>"+
                                    "<tr>"+
                                        "<td align='center' style='background-color: #367976;"+
                                            "height: 50px;'>"+
                                            "<a href='#' style='text-decoration: none;'>"+
                                                "<p style='color:white;font-weight:bold;'>"+
                                                        "MIMI SHOP"+
                                                "</p>"+
                                            "</a>"+
                                        "</td>"+
                                    "</tr>"+
                                "</tbody>"+
                            "</table>"+
                        "</td>"+
                    "</tr>"+
                    
                    
                    "<tr style='height: 300px;'>"+
                        "<td style='border: none;"+
                            "border-bottom: 2px solid #4cb96b;"+
                            "padding-right: 20px;padding-left:20px'>"+
                            "<p style='font-weight: bolder;"+
                                "font-size: 18px;"+
                                "letter-spacing: 0.025em;"+
                                "color:black;"+
                                "'>"+
                                "Dl./Dna. " + document.getElementById("txtNume").value +
                                "<div style='font-size:16px';'font-weight:normal'><br><br>Va multumim pentru mesaj, in scurt timp o sa revenim cu un raspuns." +
                                "<br><br><strong>Continut mail</strong>" + "<br><strong>Nume:</strong> " + document.getElementById("txtNume").value +
                                "<br><strong>Subiect: </strong>" + document.getElementById("txtSubiect").value  + 
                                "<br><strong>Mesaj: </strong>" + document.getElementById("txtMesaj").value +
                                "<br><br><br>Multumim,<br> <strong>Echipa Mimi</strong></div>"+
                            "</p>"+
                        "</td>"+
                    "</tr>"+
                "</tbody>" +
            "</table>"
        })
        .then( message => {
            document.getElementById("success-mail").innerHTML = "Mesajul a fost trimis cu succes. In scurt timp veti primi un mail de confirmare.";
            document.getElementById("success-mail").style.color = "green";
            console.log(message);
            setTimeout(refreshPage, 3000);
        });
    }  
}

document.getElementById("btnTrimite").addEventListener('click', sendEmail);

function refreshPage(){
    let loader = document.getElementById("preloader");
        loader.classList.add("showing");
    window.location.reload(true);
}

//DECONECTARE
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