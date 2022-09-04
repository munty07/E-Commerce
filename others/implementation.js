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


// PRODUSE RECOMANDATE






function AddAllItems(Produse){
    Produse.reverse();
    divGenerate.innerHTML = "";
    Produse.forEach(element => {
        AddItem(element.key, element.val().Brand, element.val().Poza, 
        element.val().Poza2, element.val().Nume, element.val().Pret, 
        element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
    })
}





function GetAllData(){
    const que = query(ref(db, "Produse"),orderByChild("NrRecomandare"), limitToLast(4));
    get(que)
    .then((snapshot) => {
        var prod = [];
        snapshot.forEach(childSnapshot => {
            prod.push(childSnapshot);
        });
        AddAllItems(prod);     
    })
    .catch((error) => {
        console.log("Mesaj eroare " + error);
    })
}
window.onload = GetAllData;







// ADAUGAREA PROD LA FAV

// td1-pictograma inima
var love = document.getElementById("love" + count);
// EVENIMENT PENTRU ADAUGAREA PRODUSELOR LA FAVORITE
love.addEventListener('click', () => {
    if(td1.children[0].classList.contains("inactiveHeart") === true){
        td1.children[0].classList.remove("inactiveHeart");
        td1.children[0].classList.add("activeHeart");
        
        let key = prodMap.get(td1.id);
        console.log("Cheie event-love: " + key);

        let allFavorite = new Set();
        if(favoriteBy){
            allFavorite.add(uid);
            favoriteBy.forEach(item => {
                allFavorite.add(item);
            })
        }else{
            allFavorite.add(uid); 
        }

        update(child(dbRef, "Produse/" +  key), {
            FavoriteBy: Array.from(allFavorite),
            NrRecomandare: allFavorite.size
        })
        .then(()=>{
            console.log("ListaFav a fost actualizata");
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    else{
        td1.children[0].classList.remove("activeHeart");
        td1.children[0].classList.add("inactiveHeart");
        // uid = utilizatorul curent
        let updatedList = favoriteBy.filter(item => {
            return item != uid;
        });
        update(child(dbRef, "Produse/" +  key), {
            FavoriteBy: updatedList,
            NrRecomandare: updatedList.length
        })
        .then(()=>{
            console.log("ListaFav a fost actualizata");
        })
        .catch((error)=>{
            console.log(error);
        })
    }
});


// GENERARER PDF

function generarePDF(numeClient, stradaClient, orasClient, JudetClient, codpClient, telefonClient, mailClient){
    var today = new Date();

    let zi = today.getDate();
    let luna = today.getMonth() + 1;
    let an = today.getFullYear();

    let ora = today.getHours();
    let minute = today.getMinutes();
    let secunde = today.getSeconds();

    window.jsPDF = window.jspdf.jsPDF;

    var columns = [
        {title: "Nume Produs", dataKey: "nume"},
        {title: "Brand", dataKey: "brand"}, 
        {title: "Culoare", dataKey: "culoare"}, 
        {title: "Marime", dataKey: "marime"},
        {title: "Pret", dataKey: "pret"},
        {title: "Pret Redus", dataKey: "pretRedus"},
        {title: "Cantitate", dataKey: "cantitate"},
        {title: "Subtotal", dataKey: "subtotal"}
    ]
    var rows = parcurgeLista();
    
    var doc = new jsPDF();


    doc.autoTable(columns, rows, {
        styles: {fillColor: [89, 150, 148]},
        columnStyles: {
            id: {fillColor: 255}
        },
        margin: {top: 300},
        didDrawPage: function() {

            var doc = new jsPDF();

            doc.text("FACTURA", 40, 30);

            doc.autoTable({
                head: [['Nr. Factura', 'Data emiterii', 'Ora emiterii']],
                body: [
                    [nr, zi + '/' + luna + '/' + an, ora + ':' + minute + ':' + secunde]
                ]
            });

            doc.save(numeFactura);

            doc.autoTable({
                head: [['Facturat catre', 'MIMI SHOP']],
                body: [
                    [numeClient, 'site shop'],
                    [stradaClient, 'Strada companiei'],
                    [orasClient + '/' + JudetClient + '/Romania', 'Timisoara/Timis/Romania'],
                    [codpClient, ''],
                    [telefonClient, '0786673433'],
                    [mailClient, 'mimi-shop@gmail.com']
                ]
            });
        }
    });
    
    var transport;
    doc.text("Subtotal: " +  sessionStorage.getItem("subPlata") + " lei", 400, 700);
    if(document.getElementById('express').checked) {
        transport = "39";
    }else if(document.getElementById('domiciliu').checked) {
        transport = "19";
    }else if(document.getElementById('posta').checked){
        transport = "13";
    }else if(document.getElementById('magazin').checked){
        transport = "0";
    }
    var total = parseFloat(sessionStorage.getItem("subPlata")) + parseFloat(transport);
    doc.text("Transport: " +  transport + " lei", 400, 720);
    doc.text("Total: " + total + " lei", 400, 740);

    var pdfBase64 = doc.output('datauristring');

    const confirmSave = confirm("Doriti sa descarcati factura?");
    if(confirmSave){
        doc.save(numeFactura);
    }
        
    sendEmail(numeFactura, pdfBase64);
}


generarePDF();


function parcurgeLista(){
    let listaProd = [];
    for(const element of listProducts){
        listaProd.push(element);
    }
    return listaProd; 
}





// FUNCTIE DE CAUTARE


function searchKeyWord(childSnapshot, input){
    let nume = childSnapshot.val().Nume;
    let words = nume.split(" ");

    for(let word of words){
        if(word.toLowerCase() === input.toLowerCase()){
            return childSnapshot;
        }
    }
}

searchKeyWord();