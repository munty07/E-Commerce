// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {getDatabase, ref, set, get, child, onValue, remove, update} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"

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

/////**************************/////

const uid = sessionStorage.getItem("uid");
console.log("UID logat");
console.log(uid);
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
    } else {
        console.log("No data available");
    }
})
.catch((error) => {
    console.error(error);
});
/////**************************/////

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


var tbody = document.getElementById('tbody1');

function AddFav(key, img, br, den, prt, favBy){
    console.log("FAVBY == " + favBy);
    if(favBy.includes(uid)){
        console.log("**************exista******************");

        let tr = document.createElement('tr');
            tr.id = "tr-" + key;
        let td1 = document.createElement('td');//x-sterge
        let td2 = document.createElement('td');//imagine
        let td3 = document.createElement('td');//brand
        let td4 = document.createElement('td');//denumire
        let td5 = document.createElement('td');//pret
        let td6 = document.createElement('td');//vizualizare

        td1.innerHTML = '<a id="dlt' + key + '"><i class="fas fa-times-circle del"></i></a>';
        td2.innerHTML = '<img src="' + img + '">';
        td3.innerHTML = br;
        td4.innerHTML = den;
        td5.innerHTML = prt + " lei";
        td6.innerHTML = '<a id="view' + key + '"><i class="fas fa-eye eye"></i></a>';

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        tbody.appendChild(tr);

    
        document.getElementById("dlt" + key).addEventListener('click', () => {
            console.log("uid - delete ", uid);
            console.log("utilizatori de la fav: " + favBy);
            let updatedList = favBy.filter(item => {
                item != uid;
            });
            console.log("updatedList: " + updatedList);
            let confirmDelete = confirm("Sunteti sigur ca doriti sa stergeti produsul de la favorite?"); 
            if(confirmDelete){
                update(child(dbRef, "Produse/" + key ), {
                    FavoriteBy: updatedList
                })
                .then(() => {
                    alert("Produsul a fost sters de la favorite!");
                    document.getElementById("tr-" + key).remove();
                    window.location.reload(true);
                })
                .catch((error) => {
                    alert("Eroare: " + error);
                })
            }
            
        })

        document.getElementById("view" + key).addEventListener('click', () => {
            sessionStorage.setItem("keyProd", key);
            sessionStorage.setItem("image1", img);
            window.location.href = "/form_details.html";
        })
    }
    
}

var count;
function AddAllProd(ProdFav){
    tbody.innerHTML = "";
    document.getElementById("divMessage").innerHTML = "";
    ProdFav.forEach(element => {
        console.log("Cheia produsului adaugat:");
        console.log(element.key);
        console.log("FAVORITE BY == " );
        console.log(element.val());

        let pret;
        if(element.val().PretRedus != 0){
            pret = element.val().PretRedus;
            console.log("PRET REDUS == " + pret);
        }else{
            pret = element.val().Pret;
            console.log("PRET == " + pret);
        }


        console.log("COUNT - - - addallprod ", count);
        
        let lstFav = element.val().FavoriteBy;

        console.log("FAV BY  - - - addallprod ", lstFav);
        // DACA LISTA NU E GOALA
        if(lstFav){
            if(lstFav.includes(uid))
            {
                if(document.getElementById("message"))
                    document.getElementById("message").style.display = "none";
                AddFav(element.key, element.val().Poza, element.val().Brand, element.val().Nume, pret, element.val().FavoriteBy);
                count = 1;
                console.log("COUNT FAV == ", count);
            }
            else{
                console.log("COUNT == ", count);
                if(count == 0) {
                    
                    if(!document.getElementById("message")){
                        let paragraph = document.createElement('p');
                            paragraph.id = "message";
                            paragraph.innerHTML = "<br>NU EXISTA PRODUSE FAVORITE!";
                            paragraph.className = "showMessage";
                        document.getElementById("divMessage").appendChild(paragraph);
                    } 
                }
            }
        }else{
            console.log("COUNT == ", count);
            if(count == 0) {
                
                if(!document.getElementById("message")){
                    let paragraph = document.createElement('p');
                        paragraph.id = "message";
                        paragraph.innerHTML = "<br>NU EXISTA PRODUSE FAVORITE!";
                        paragraph.className = "showMessage";
                    document.getElementById("divMessage").appendChild(paragraph);
                } 
            }
        }
    })
}

function GetAllData(){
    document.getElementById("divMessage").innerHTML = "";
    const dbRef = ref(db);
    get(child(dbRef, "Produse/" ))
    .then((snapshot) => {
        var prod = [];
        snapshot.forEach(childSnapshot => {
            console.log("Child -> id-urile produselor:");
            console.log(childSnapshot.key);
            prod.push(childSnapshot);
        });
        if(snapshot.exists()){
            count = 0;
            console.log("COUNT - - - getalldata ", count);
            AddAllProd(prod);
        }
    })
    .catch((error) => {
        console.log("Mesaj eroare " + error);
    })
}
window.onload = GetAllData;