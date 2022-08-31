// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {getDatabase, ref, set, get, child, update, remove} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"

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

///////////////////////////////////
var subPlata = document.getElementById("subtotalPlata");
    subPlata.innerHTML = 0;
var transport = document.getElementById("transport");
var totalPlata = document.getElementById("totalPlata"); 


var tbody = document.getElementById('tbody-cart');
// FUNTIE PENTRU GENERAREA DINAMICA A PRODUSELOR DIN COSUL DE CUMPARATURI     
function AddItem(key, childKey, imagine, model, brand, denumire, pret, marime, cantitate, subtotal){
    document.getElementById("send").disabled = false;
    let tr = document.createElement('tr');
        tr.id = "tr-" + key;
    let tdDelete = document.createElement('td');//x-sterge
    let tdImage = document.createElement('td');//imagine
    let tdModel = document.createElement('td');//model
    let tdBrand = document.createElement('td');//brand
    let tdName = document.createElement('td');//denumire
    let tdPrice = document.createElement('td');//pret
    let tdSize = document.createElement('td');//marime
    let tdQuantity = document.createElement('td');//cantitate
    let tdSubtotal = document.createElement('td');//subtotal
    let tdView = document.createElement('td');//vizualizare

    tdDelete.innerHTML = '<a id="dlt' + childKey + '"><i class="fas fa-times-circle del"></i></a>';
    tdImage.innerHTML = '<img src="' + imagine + '">';
    tdModel.innerHTML = '<img src="' + model + '">';
    tdBrand.innerHTML = brand;
    tdName.innerHTML = denumire;
    tdPrice.innerHTML = pret + " lei";
    tdSize.innerHTML = marime;
    tdQuantity.innerHTML = '<input id="nr' + key + '" type="number" value="' + cantitate + '" min="1">';
    tdSubtotal.innerHTML = parseFloat(pret)*parseFloat(cantitate) + " lei";
    tdView.innerHTML = '<a id="view' + childKey + '"><i class="fas fa-eye eye"></i></a>';

    console.log("KEY PROD === " + key);

    tr.appendChild(tdDelete);
    tr.appendChild(tdImage);
    tr.appendChild(tdModel);
    tr.appendChild(tdBrand);
    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    tr.appendChild(tdSize);
    tr.appendChild(tdQuantity);
    tr.appendChild(tdSubtotal);
    tr.appendChild(tdView);

    tbody.appendChild(tr);
    
    
    let previous_value = document.getElementById("nr" + key).value;
    console.log("PREVIOUS VALUE 1 === " + previous_value);

    var qtyProd = document.getElementById("nr" + key)

    // EVENIMENT PENTRU MODIFICAREA CANTITATII
    qtyProd.addEventListener('change', () => {
        get(child(dbRef, "Conturi/" + uid + "/CosCumparaturi/" + key)).then((snapshot) => {
            snapshot.forEach(function(childObject){
                console.log("CHILD KEY: " + childObject.key);
                let child = childObject.key;

                // SETAREA NR MAXIM DE PRODUSE
                qtyProd.setAttribute("max", childObject.val().MaximStoc);
                console.log("MAXIM STOC : ", childObject.val().MaximStoc);

                let value = document.getElementById("nr" + key).value; 
                console.log("  "); 
                console.log(" VALUE  === " + value);
                console.log("PREVIOUS VALUE 2 === " + previous_value); 
                console.log("  ");
                
// --------------------------------
                
// --------------------------------
                // cantitatea
                var nr = qtyProd.value;

                // subtotalul => pret * cantitate
                var subtotal2 = parseFloat(pret*nr);
                tdSubtotal.innerHTML = subtotal2 + " lei";

                if (previous_value > value) {
                    console.log("Decreased");
                    subPlata.innerHTML =  parseFloat(subPlata.innerHTML) - parseFloat(pret);
                    console.log("SUBPLATA -dec- ", subPlata.innerHTML);
                } else if (previous_value < value) {
                    console.log(" VALUE  - - -  " + value);
                    console.log(" MAX VAL  - - -  " + childObject.val().MaximStoc);
                    if(value > childObject.val().MaximStoc){
                        qtyProd.value = childObject.val().MaximStoc;
                        console.log("QTY == MAX ",qtyProd.value);
                        subtotal2 = parseFloat(pret*qtyProd.value);
                        tdSubtotal.innerHTML = subtotal2 + " lei";
                    }else{
                        console.log("Increased");
                        subPlata.innerHTML =  parseFloat(subPlata.innerHTML) + parseFloat(pret);
                        console.log("SUBPLATA -inc- ", subPlata.innerHTML);
                    }
                }
                previous_value = value;

                console.log("  ");
                console.log("SubPlata-: " + subPlata.innerHTML);
                sessionStorage.setItem("subPlata", subPlata.innerHTML);

                totalPlata.innerHTML = parseFloat(subPlata.innerHTML) + parseFloat(transport.innerHTML); 

            
                update(ref(db, "Conturi/" +  uid + "/CosCumparaturi/" + key + "/" + child), {
                    Cantitate: nr,
                    Subtotal: subtotal2
                })
                .then(()=>{
                    console.log("Datele au fost actualizate");
                    //window.location.reload(true);
                })
                .catch((error)=>{
                    console.log(error);
                })
            })
        })
    });

    if(document.getElementById("dlt" + childKey)){
        document.getElementById("dlt" + childKey).addEventListener('click', () => {
            console.log("delete");
            let confirmDelete = confirm("Sunteti sigur ca doriti sa stergeti produsul din cosul de cumparaturi?"); 
            if(confirmDelete){
                remove(ref(db, "Conturi/" + uid + "/CosCumparaturi/" + key + "/" + childKey))
                .then(() => {
                    alert("Produsul a fost sters din cosul de cumparaturi!");
                    document.getElementById("tr-" + key).remove();
                    
                    GetAllData();
                    window.location.reload(true);
                    
                })
                .catch((error) => {
                    alert("Eroare: " + error);
                })
            }
        })
    }
    
    
    document.getElementById("view" + childKey).addEventListener('click', () => {
        sessionStorage.setItem("keyProd", key);
        sessionStorage.setItem("image1", imagine);

        window.location.href = "/form_details.html";
    })

    console.log("Utilizatorul a cumparat acest produs: " + key); 
}


function AddAllItems(ProdCart){
    tbody.innerHTML = "";
    ProdCart.forEach(element => {
        get(child(dbRef, "Conturi/" + uid + "/CosCumparaturi/" + element.key)).then((snapshot) => {
            snapshot.forEach(function(child){

                
                console.log("CHILD KEY: " + child.key);
                console.log("KEY == " + element.key);
                let poza = child.val().Poza;
                let model = child.val().Model;
                let brand = child.val().Brand;
                let nume = child.val().Nume;
                let pret;
                if(child.val().PretRedus != 0){
                    pret = child.val().PretRedus;
                    console.log("PRET REDUS == " + pret);
                }else{
                    pret = child.val().Pret;
                    console.log("PRET == " + pret);
                }
                
               
                let marime = child.val().Marime
                let cantitate = child.val().Cantitate;
                let subtotal = child.val().Subtotal;
               


                console.log("Brand: " + brand);
                console.log("Subtotal: " + subtotal);
                console.log("Cantitate: " + cantitate);

              
                AddItem(element.key, child.key, poza, model, brand, nume, pret, marime, cantitate, subtotal);
               
            
                subPlata.innerHTML =  parseFloat(subPlata.innerHTML) + parseFloat(subtotal);
                console.log("  ");
                console.log("SubPlata: " + subPlata.innerHTML);
                sessionStorage.setItem("subPlata", subPlata.innerHTML);
                
                totalPlata.innerHTML = parseFloat(subPlata.innerHTML) + parseFloat(transport.innerHTML); 
            })
        })
        .catch((error) => {
            console.log("Mesaj eroare " + error);
        })
        
    })
}


function GetAllData(){
    const dbRef = ref(db);
    get(child(dbRef, "Conturi/" + uid + "/CosCumparaturi/"))
    .then((snapshot) => {
        var prod = [];
        snapshot.forEach(childSnapshot => {
            console.log("Child -> id-urile produselor:");
            console.log(childSnapshot.key);
            prod.push(childSnapshot);
        });
        if(snapshot.exists()){
            AddAllItems(prod);
        }else{
            let paragraph = document.createElement('p');
                paragraph.id = "message";
                paragraph.innerHTML = '<br>' + 'NU EXISTA PRODUSE IN COSUL DE CUMPARATURI!';
                paragraph.className = "showMessage";
            document.getElementById("divMesaj").appendChild(paragraph);
        }
        
    })
    .catch((error) => {
        console.log("Mesaj eroare " + error);
    })
}
window.onload = GetAllData;


document.getElementById("send").addEventListener('click', () => {
    window.location.href = "form_checkout.html";
})