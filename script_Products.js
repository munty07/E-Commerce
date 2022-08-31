// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {getDatabase, ref, set, get, child, remove, push, update, query, orderByChild, equalTo, endAt,startAt} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"

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
// ID-UL USER-ULUI
const uid = sessionStorage.getItem("uid");
console.log("UID logat:");
console.log(uid);

const db = getDatabase();
const dbRef = ref(db);

var btn = document.getElementById("addButton");
var btnOrders = document.getElementById("btnOrders");

get(child(dbRef, "Conturi/" + uid)).then((snapshot) => {
    if (snapshot.exists()) {
        if(snapshot.val().Rol && snapshot.val().Rol === "admin")
        {
            // DACA UTILIZATORUL ARE ROLUL DE ADMIN, ATUNCI II VA FI VIZIBILA URMATOAREA FUNCTIE:
            // ADAUGAREA UNUI PRODUS
            console.log("Rolul este:");
            console.log(snapshot.val().Rol);
            btn.classList.add("isAdmin");
            btnOrders.classList.add("isAdmin");
        }
        
        // AFISAREA NUMELUI DE UTILIZATOR SAU IN ALTE CAZURI NUMELE SI PRENUMELE UTILIZATORULUI
        const displayName = snapshot.val().Nume;
        console.log("Nume si Prenume:");
        console.log(displayName);
        const username =  snapshot.val().Utilizator;
        console.log("Nume utilizator:");
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

// FUNCTIE PENTRU DECONECTAREA UTILIZATORULUI
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

// MESAJ DE EROARE PENTRU VALIDAREA CATEGORIEI BRAND-ULUI SI A NUMELUI
var error1 = document.getElementById("error1");
// MESAJ DE EROARE PENTRU CULORI
var error2 = document.getElementById("error2");
// MESAJ DE EROARE PENTRU PRET
var error3 = document.getElementById("error3");
// MESAJ DE EROARE PENTRU DETALII 
var error4 = document.getElementById("error4");
// REGEX 
let lettersRegex = /^[a-zA-Z -]*$/;//letter, line and space 
let numbersRegex = /^[1-9]+[0-9]*$/;

// FUNCTII PENTRU VALIDAREA DATELOR DE LA ADAUGAREA UNUI PRODUS NOU
// validarea categoriei
function validareCategorie(field){
    if(field.value === ""){
        error1.innerText = "Selectati categoria produsului";
        return false;
    }else{
        error1.innerText = "";
        return true;
    }
}
// validarea brand-ului
function validareBrand(field){
    if(field.value === ""){
        error1.innerText = "Selectati brand-ul produsului";
        return false;
    }else{
        error1.innerText = "";
        return true;
    }
}
// validarea numelui
function validareNume(field){
    if(field === ""){
        error1.innerText = "Completati numele produsului!";
        return false;
    }else if(!lettersRegex.test(field)){
        error1.innerText = "Numele trebuie sa contina doar litere!";
        return false
    }else if(!field.trim()){
        error1.innerText = "Numele nu trebuie sa fie format doar din spatii!";
        return false;
    } else{ 
        error1.innerText = "";
        return true;
    }
}
// validare culori
// caz 1: daca o imagine este selectata dar marimea nu, se va afisa un mesaj de eroare
function validareCulori1(front, back, xs, s, m, l, xl, color, imgColor){
    if((xs == 0 && s == 0 && m == 0 && l == 0 && xl == 0) && (front != "" || back != "")){
        error2.innerText = "Alegeti cel putin o marime pentru culoarea " + color + ".";
        return false; 
    }else if((xs > 0 || s > 0 || m > 0 || l > 0 || xl > 0) && ( front != "" || back != "") && imgColor === ""){
        error2.innerText = "Atasati imaginea pentru culoarea " + color + " a produsului.";
        return false;
    }else{
        error2.innerText = "";
        return true;
    }
        
}
// caz 2: daca marimea de la o culoare > 0, iar imaginea corespondenta nu este selectata, atunci se va genera un mesaj de eroare   
function validareCulori2(front, back, xs, s, m, l, xl, color, imgColor){
    if((front === "" && back === "") && (xs > 0 || s > 0 || m > 0 || l > 0 || xl > 0)){
        error2.innerText = "Alegeti cel putin o fotografie pentru culoarea " + color + ".";
        return false;
    }else if((xs > 0 || s > 0 || m > 0 || l > 0 || xl > 0) && ( front != "" || back != "") && imgColor === ""){
        error2.innerText = "Atasati imaginea pentru culoarea fff" + color + " a produsului.";
        return false;
    }else{
        error2.innerText = "";
        return true;
    }
}

// validare pret
function validarePret(field){
    if(field === ""){
        error3.innerText = "Completati pretul produsului!";
        return false;
    }else if(!numbersRegex.test(field)){
        error3.innerText = "Pretul trebuie sa contina doar cifre si sa fie > 0!"
        return false;
    }else if(!field.trim()){
        error3.innerText = "Pretul nu trebuie sa fie format doar din spatii!";
        return false;
    }else{
        error3.innerText = "";
        return true;
    }
}
// validare reducere
function validareReducere(field){
    console.log("REDUCERE: " + field);
    if(field != 0 && !numbersRegex.test(field)){
        error3.innerText = "Reducerea trebuie sa contina doar cifre si sa fie > 0!"
        return false;
    }else{
        error3.innerText = "";
        return true;
    }
}

// validare detalii produs
function validareDetalii(fieldMaterial, fieldStil, fieldCompozitie){
    if(fieldMaterial === ""){
        error4.innerText = "Completati materialul produsului!";
        return false;
    }else if(fieldStil === ""){
        error4.innerText = "Completati stilul produsului!"
        return false;
    }else if(fieldCompozitie === ""){
        error4.innerText = "Completati compozitia produsului!";
        return false;
    }else{
        error4.innerText = "";
        return true;
    }
}

// validare imagini pentru afisare
function validareFoto(field1, field2){
    if(field1 === "" && field2 === ""){
        error2.innerText = "Selectati imaginile de la optiunile culorii selectate!";
        return false;
    }else{
        error2.innerText = "";
        return true;
    }
}
// validare radio button
function validareBtn(negru, alb, albastru, rosu, verde, mov, bej, roz){
    if(!negru.checked && !alb.checked && !albastru.checked && !rosu.checked && 
       !verde.checked && !mov.checked && !bej.checked && !roz.checked){
        error2.innerText = "Selectati o culoare aferenta imaginilor ce vor fi afisate!";
        return false;
    }else{
        error2.innerText = "";
        return true;
    }
}


var lstFav = [];
var lstCart = [];

// EVENIMENT PENTRU BUTONUL DE ADAUGARE A PRODUSELOR DE CATRE UTILIZATORII CU ROL DE ADMIN
document.getElementById("btnAdd").addEventListener('click', () => {
    get(child(dbRef, "Produse/")).then((snapshot) => {
        
        var valCateg = document.getElementById("categorieProd");
        var categ = valCateg.options[valCateg.selectedIndex].text;

        var valBrand = document.getElementById("brandProd");
        var brand = valBrand.options[valBrand.selectedIndex].text;

        var nume = document.getElementById("nameProd").value;

        var pret = document.getElementById("pretProd").value;

        //PRODUSE DE CULOARE NEAGRA
        var xsNegru = document.getElementById("nrProdXS-negru").value;
        var sNegru = document.getElementById("nrProdS-negru").value;
        var mNegru = document.getElementById("nrProdM-negru").value;
        var lNegru = document.getElementById("nrProdL-negru").value;
        var xlNegru = document.getElementById("nrProdXL-negru").value;
        var PhotoFrontNegru = document.getElementById("image-input-negru1").value;
        var PhotoBackNegru = document.getElementById("image-input-negru2").value;
        var imgNegru = document.getElementById("image-negru").value;
        PhotoFrontNegru = PhotoFrontNegru.replace("C:\\fakepath\\", "img/products/haine/");
        PhotoBackNegru = PhotoBackNegru.replace("C:\\fakepath\\", "img/products/haine/");
        imgNegru = imgNegru.replace("C:\\fakepath\\", "img/products/haine/");
        
        // PRODUSE DE CULOARE ALBA
        var xsAlb = document.getElementById("nrProdXS-alb").value;
        var sAlb = document.getElementById("nrProdS-alb").value;
        var mAlb = document.getElementById("nrProdM-alb").value;
        var lAlb = document.getElementById("nrProdL-alb").value;
        var xlAlb = document.getElementById("nrProdXL-alb").value;
        var PhotoFrontAlb = document.getElementById("image-input-alb1").value;
        var PhotoBackAlb = document.getElementById("image-input-alb2").value;
        var imgAlb = document.getElementById("image-alb").value;
        PhotoFrontAlb = PhotoFrontAlb.replace("C:\\fakepath\\", "img/products/haine/");
        PhotoBackAlb = PhotoBackAlb.replace("C:\\fakepath\\", "img/products/haine/");
        imgAlb = imgAlb.replace("C:\\fakepath\\", "img/products/haine/");
        
        // PRODUSE DE CULOARE ALBASTRA
        var xsAlbastru = document.getElementById("nrProdXS-albastru").value;
        var sAlbastru = document.getElementById("nrProdS-albastru").value;
        var mAlbastru = document.getElementById("nrProdM-albastru").value;
        var lAlbastru = document.getElementById("nrProdL-albastru").value;
        var xlAlbastru = document.getElementById("nrProdXL-albastru").value;
        var PhotoFrontAlbastru = document.getElementById("image-input-albastru1").value;
        var PhotoBackAlbastru = document.getElementById("image-input-albastru2").value;
        var imgAlbastru = document.getElementById("image-albastru").value;
        PhotoFrontAlbastru = PhotoFrontAlbastru.replace("C:\\fakepath\\", "img/products/haine/");
        PhotoBackAlbastru = PhotoBackAlbastru.replace("C:\\fakepath\\", "img/products/haine/");
        imgAlbastru = imgAlbastru.replace("C:\\fakepath\\", "img/products/haine/");
        
        // PRODUSE DE CULOARE ROSIE
        var xsRosu = document.getElementById("nrProdXS-rosu").value;
        var sRosu = document.getElementById("nrProdS-rosu").value;
        var mRosu = document.getElementById("nrProdM-rosu").value;
        var lRosu = document.getElementById("nrProdL-rosu").value;
        var xlRosu = document.getElementById("nrProdXL-rosu").value;
        var PhotoFrontRosu = document.getElementById("image-input-rosu1").value;
        var PhotoBackRosu = document.getElementById("image-input-rosu2").value;
        var imgRosu = document.getElementById("image-rosu").value;
        PhotoFrontRosu = PhotoFrontRosu.replace("C:\\fakepath\\", "img/products/haine/");
        PhotoBackRosu = PhotoBackRosu.replace("C:\\fakepath\\", "img/products/haine/");
        imgRosu = imgRosu.replace("C:\\fakepath\\", "img/products/haine/");
        
        // PRODUSE DE CULOARE VERDE
        var xsVerde = document.getElementById("nrProdXS-verde").value;
        var sVerde = document.getElementById("nrProdS-verde").value;
        var mVerde = document.getElementById("nrProdM-verde").value;
        var lVerde = document.getElementById("nrProdL-verde").value;
        var xlVerde = document.getElementById("nrProdXL-verde").value;
        var PhotoFrontVerde = document.getElementById("image-input-verde1").value;
        var PhotoBackVerde = document.getElementById("image-input-verde2").value;
        var imgVerde = document.getElementById("image-verde").value;
        PhotoFrontVerde = PhotoFrontVerde.replace("C:\\fakepath\\", "img/products/haine/");
        PhotoBackVerde = PhotoBackVerde.replace("C:\\fakepath\\", "img/products/haine/");
        imgVerde = imgVerde.replace("C:\\fakepath\\", "img/products/haine/");
        
        // PRODUSE DE CULOARE MOV
        var xsMov = document.getElementById("nrProdXS-mov").value;
        var sMov = document.getElementById("nrProdS-mov").value;
        var mMov = document.getElementById("nrProdM-mov").value;
        var lMov = document.getElementById("nrProdL-mov").value;
        var xlMov = document.getElementById("nrProdXL-mov").value;
        var PhotoFrontMov = document.getElementById("image-input-mov1").value;
        var PhotoBackMov = document.getElementById("image-input-mov2").value;
        var imgMov = document.getElementById("image-mov").value;
        PhotoFrontMov = PhotoFrontMov.replace("C:\\fakepath\\", "img/products/haine/");
        PhotoBackMov = PhotoBackMov.replace("C:\\fakepath\\", "img/products/haine/");
        imgMov = imgMov.replace("C:\\fakepath\\", "img/products/haine/");
        
        // PRODUSE DE CULOARE BEJ
        var xsBej = document.getElementById("nrProdXS-bej").value;
        var sBej = document.getElementById("nrProdS-bej").value;
        var mBej = document.getElementById("nrProdM-bej").value;
        var lBej = document.getElementById("nrProdL-bej").value;
        var xlBej = document.getElementById("nrProdXL-bej").value;
        var PhotoFrontBej = document.getElementById("image-input-bej1").value;
        var PhotoBackBej = document.getElementById("image-input-bej2").value;
        var imgBej = document.getElementById("image-bej").value;
        PhotoFrontBej = PhotoFrontBej.replace("C:\\fakepath\\", "img/products/haine/");
        PhotoBackBej = PhotoBackBej.replace("C:\\fakepath\\", "img/products/haine/");
        imgBej = imgBej.replace("C:\\fakepath\\", "img/products/haine/");
        
        // PRODUSE DE CULOARE ROZ
        var xsRoz = document.getElementById("nrProdXS-roz").value;
        var sRoz = document.getElementById("nrProdS-roz").value;
        var mRoz = document.getElementById("nrProdM-roz").value;
        var lRoz = document.getElementById("nrProdL-roz").value;
        var xlRoz = document.getElementById("nrProdXL-roz").value;
        var PhotoFrontRoz = document.getElementById("image-input-roz1").value;
        var PhotoBackRoz = document.getElementById("image-input-roz2").value;
        var imgRoz = document.getElementById("image-roz").value;
        PhotoFrontRoz = PhotoFrontRoz.replace("C:\\fakepath\\", "img/products/haine/");
        PhotoBackRoz = PhotoBackRoz.replace("C:\\fakepath\\", "img/products/haine/");
        imgRoz = imgRoz.replace("C:\\fakepath\\", "img/products/haine/");
        
        // CALCULAREA NR DE PRODUSE(STOC)
        var stoc;
        var stocNegru = parseInt(xsNegru) + parseInt(sNegru) + parseInt(mNegru) + parseInt(lNegru) + parseInt(xlNegru);
        var stocAlb = parseInt(xsAlb) + parseInt(sAlb) + parseInt(mAlb) + parseInt(lAlb) + parseInt(xlAlb);
        var stocAlbastru = parseInt(xsAlbastru) + parseInt(sAlbastru) + parseInt(mAlbastru) + parseInt(lAlbastru) + parseInt(xlAlbastru);
        var stocRosu = parseInt(xsRosu) + parseInt(sRosu) + parseInt(mRosu) + parseInt(lRosu) + parseInt(xlRosu);
        var stocVerde = parseInt(xsVerde) + parseInt(sVerde) + parseInt(mVerde) + parseInt(lVerde) + parseInt(xlVerde);
        var stocMov = parseInt(xsMov) + parseInt(sMov) + parseInt(mMov) + parseInt(lMov) + parseInt(xlMov);
        var stocBej = parseInt(xsBej) + parseInt(sBej) + parseInt(mBej) + parseInt(lBej) + parseInt(xlBej);
        var stocRoz = parseInt(xsRoz) + parseInt(sRoz) + parseInt(mRoz) + parseInt(lRoz) + parseInt(xlRoz);
        stoc = parseInt(stocNegru) + parseInt(stocAlb) + parseInt(stocAlbastru) + parseInt(stocRosu) + parseInt(stocVerde) + parseInt(stocMov) + parseInt(stocBej) + parseInt(stocRoz);
        
        // CALCUL PENTRU APLICAREA REDUCERII
        var reducere = document.getElementById("reducereProd").value;
        var pretNou;
        var reducerePr;
        if (reducere.length == 0){
            reducere = 0;
            pretNou = 0;
        }else{
            reducerePr =  parseFloat(reducere/100*pret).toFixed(2);
            pretNou = pret - reducerePr;
        }

        // BUTOANE RADIO PENTRU ALEGEREA POZELOR CE VOR FI AFISATE 
        var optBlack = document.getElementById("optBlack");
        var optWhite = document.getElementById("optWhite");
        var optBlue = document.getElementById("optBlue");
        var optRed = document.getElementById("optRed");
        var optGreen = document.getElementById("optGreen");
        var optPurple = document.getElementById("optPurple");
        var optBeige = document.getElementById("optBeige");
        var optPink = document.getElementById("optPink");

        // CONDITII PENTRU AFISAREA POZELOR IN PAGINA DE PRODUSE
        var img;
        var img2;
        if(optBlack.checked){
            img = PhotoFrontNegru;
            img2 = PhotoBackNegru;
        }

        if(optWhite.checked){
            img = PhotoFrontAlb;
            img2 = PhotoBackAlb;
        }

        if(optBlue.checked){
            img = PhotoFrontAlbastru;
            img2 = PhotoBackAlbastru;
        }

        if(optRed.checked){
            img = PhotoFrontRosu;
            img2 = PhotoBackRosu;
        }
        if(optGreen.checked){
            img = PhotoFrontVerde;
            img2 = PhotoBackVerde;
        }

        if(optPurple.checked){
            img = PhotoFrontMov;
            img2 = PhotoBackMov;
        }

        if(optBeige.checked){
            img = PhotoFrontBej;
            img2 = PhotoBackBej;
        }

        if(optPink.checked){
            img = PhotoFrontRoz;
            img2 = PhotoBackRoz;
        }

        // VAR PENTRU SECTIUNEA DE DETALII
        let material = document.getElementById("material").value;
        let stil = document.getElementById("stil").value;
        let compozitie = document.getElementById("compozitie").value;

       
        // VALIDAREA CAMPURILOR 
        if(validareCategorie(valCateg) == false || validareBrand(valBrand) == false || validareNume(nume) == false ||
           validareCulori1(PhotoFrontNegru, PhotoBackNegru, xsNegru, sNegru, mNegru, lNegru, xlNegru, "neagra", imgNegru) == false ||
           validareCulori1(PhotoFrontAlb, PhotoBackAlb, xsAlb, sAlb, mAlb, lAlb, xlAlb, "alba", imgAlb) == false ||
           validareCulori1(PhotoFrontAlbastru, PhotoBackAlbastru, xsAlbastru, sAlbastru, mAlbastru, lAlbastru, xlAlbastru, "albastra", imgAlbastru) == false ||
           validareCulori1(PhotoFrontRosu, PhotoBackRosu, xsRosu, sRosu, mRosu, lRosu, xlRosu, "rosie", imgRosu) == false ||
           validareCulori1(PhotoFrontVerde, PhotoBackVerde, xsVerde, sVerde, mVerde, lVerde, xlVerde, "verde", imgVerde) == false ||
           validareCulori1(PhotoFrontMov, PhotoBackMov, xsMov, sMov, mMov, lMov, xlMov, "mov", imgMov) == false ||
           validareCulori1(PhotoFrontBej, PhotoBackBej, xsBej, sBej, mBej, lBej, xlBej, "bej", imgBej) == false || 
           validareCulori1(PhotoFrontRoz, PhotoBackRoz, xsRoz, sRoz, mRoz, lRoz, xlRoz, "roz", imgRoz) == false ||
           validareCulori2(PhotoFrontNegru, PhotoBackNegru, xsNegru, sNegru, mNegru, lNegru, xlNegru, "neagra", imgNegru) == false ||
           validareCulori2(PhotoFrontAlb, PhotoBackAlb, xsAlb, sAlb, mAlb, lAlb, xlAlb, "alba", imgAlb) == false ||
           validareCulori2(PhotoFrontAlbastru, PhotoBackAlbastru, xsAlbastru, sAlbastru, mAlbastru, lAlbastru, xlAlbastru, "albastra", imgAlbastru) == false ||
           validareCulori2(PhotoFrontRosu, PhotoBackRosu, xsRosu, sRosu, mRosu, lRosu, xlRosu, "rosie", imgRosu) == false ||
           validareCulori2(PhotoFrontVerde, PhotoBackVerde, xsVerde, sVerde, mVerde, lVerde, xlVerde, "verde", imgVerde) == false ||
           validareCulori2(PhotoFrontMov, PhotoBackMov, xsMov, sMov, mMov, lMov, xlMov, "mov", imgMov) == false ||
           validareCulori2(PhotoFrontBej, PhotoBackBej, xsBej, sBej, mBej, lBej, xlBej, "bej", imgBej) == false || 
           validareCulori2(PhotoFrontRoz, PhotoBackRoz, xsRoz, sRoz, mRoz, lRoz, xlRoz, "roz", imgRoz) == false ||
           validareBtn(optBlack, optWhite, optBlue, optRed, optGreen, optPurple, optBeige, optPink) == false ||
           validareFoto(img, img2) == false || validareDetalii(material, stil, compozitie) == false || 
           validarePret(pret) == false || validareReducere(reducere) == false ){
            console.log("DATE INVALIDE PENTRU A ADAUGA PRODUSUL!");
        }else{
            // STOCAREA DATELOR IN BAZA DE DATE
            push(ref(db, "Produse/"),{
                FavoriteBy: lstFav,
                NrRecomandare: lstFav.length,
                Categorie: categ,
                Nume: nume,
                Brand: brand,
                Pret: pret,
                Poza: img,
                Poza2: img2,
                Detalii: {
                    "Material": material,
                    "Stil": stil,
                    "Compozitie": compozitie
                },
                Culori: {
                    "Negru": {
                        "PozaCuloare": imgNegru,
                        "PozaFata": PhotoFrontNegru,
                        "PozaSpate": PhotoBackNegru,
                        "Marimi": {
                            "xs": xsNegru,
                            "s": sNegru,
                            "m": mNegru,
                            "l": lNegru,
                            "xl": xlNegru
                        }
                    },
                    "Alb": {
                        "PozaCuloare": imgAlb,
                        "PozaFata": PhotoFrontAlb,
                        "PozaSpate": PhotoBackAlb,
                        "Marimi": {
                            "xs": xsAlb,
                            "s": sAlb,
                            "m": mAlb,
                            "l": lAlb,
                            "xl": xlAlb
                        }
                    },
                    "Albastru": {
                        "PozaCuloare": imgAlbastru,
                        "PozaFata": PhotoFrontAlbastru,
                        "PozaSpate": PhotoBackAlbastru,
                        "Marimi": {
                            "xs": xsAlbastru,
                            "s": sAlbastru,
                            "m": mAlbastru,
                            "l": lAlbastru,
                            "xl": xlAlbastru
                        }
                    },
                    "Rosu": {
                        "PozaCuloare": imgRosu,
                        "PozaFata": PhotoFrontRosu,
                        "PozaSpate": PhotoBackRosu,
                        "Marimi": {
                            "xs": xsRosu,
                            "s": sRosu,
                            "m": mRosu,
                            "l": lRosu,
                            "xl": xlRosu
                        }
                    },
                    "Verde": {
                        "PozaCuloare": imgVerde,
                        "PozaFata": PhotoFrontVerde,
                        "PozaSpate": PhotoBackVerde,
                        "Marimi": {
                            "xs": xsVerde,
                            "s": sVerde,
                            "m": mVerde,
                            "l": lVerde,
                            "xl": xlVerde
                        }
                    },
                    "Mov": {
                        "PozaCuloare": imgMov,
                        "PozaFata": PhotoFrontMov,
                        "PozaSpate": PhotoBackMov,
                        "Marimi": {
                            "xs": xsMov,
                            "s": sMov,
                            "m": mMov,
                            "l": lMov,
                            "xl": xlMov
                        }
                    },
                    "Bej": {
                        "PozaCuloare": imgBej,
                        "PozaFata": PhotoFrontBej,
                        "PozaSpate": PhotoBackBej,
                        "Marimi": {
                            "xs": xsBej,
                            "s": sBej,
                            "m": mBej,
                            "l": lBej,
                            "xl": xlBej
                        }
                    },
                    "Roz": {
                        "PozaCuloare": imgRoz,
                        "PozaFata": PhotoFrontRoz,
                        "PozaSpate": PhotoBackRoz,
                        "Marimi": {
                            "xs": xsRoz,
                            "s": sRoz,
                            "m": mRoz,
                            "l": lRoz,
                            "xl": xlRoz
                        }
                    }
                },
                Stoc: stoc,
                Reducere: reducere,
                PretRedus: pretNou
            })
            .then(response => {
                console.log("Id produs:");
                console.log(response.key);
                alert("Produsul a fost adaugat cu succes!");

                window.location.reload(true);
            })
            .catch((error) => {
                alert("Eroare: " + error);
            })
        }
    });
});

async function returnAsyncKey(key){
    return new Promise  (resolve => {
        resolve(key);
    })
}


var lstFiltre = [];

// FUNCTII PENTRU FILTRAREA PRODUSELOR
function SetFilter(Produse){
    divBody.innerHTML = "";

    // VARIABILE DECLARATE PENTRU BUTOANELE RADIO - DISPONIBILITATE
    let ckStoc = document.getElementById('checkStoc');
    let ckPromo = document.getElementById('checkPromotii');
    let ckAllDsp = document.getElementById('checkAll');

    // VARIABILE DECLARATE PENTRU BUTOANELE RADIO - CATEGORIE
    let ckBluze = document.getElementById('listBluze');
    let ckRochii = document.getElementById('listRochii');
    let ckAllCat = document.getElementById('listCatAll');

    // VARIABILE DECLARATE PENTRU BUTOANELE RADIO - BRAND
    let ckBershka = document.getElementById('listBershka');
    let ckZara = document.getElementById('listZara');
    let ckAllBr = document.getElementById('listBrAll');


    // LISTA PENTRU FILTRAREA PRODUSELOR
    Produse.forEach(element => {

        // FILTRARE PRODUSE DOAR DUPA DISPONIBILITATE
        if(ckStoc.checked && 
            !ckBluze.checked && !ckRochii.checked && !ckAllCat.checked &&
            !ckBershka.checked && !ckZara.checked && !ckAllBr.checked){
            lstFiltre = lstTotala;
            
            console.log("LISTA - stoc: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("NU EXISTA IN STOC");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckPromo.checked &&
            !ckBluze.checked && !ckRochii.checked && !ckAllCat.checked &&
            !ckBershka.checked && !ckZara.checked && !ckAllBr.checked){
            
            lstFiltre = lstTotala;
            console.log("LISTA - promotii: ", lstFiltre);
            if(element.val().Reducere == 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);

            }else if(lstFiltre.includes(element.key)){
                   
                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckAllDsp.checked &&
            !ckBluze.checked && !ckRochii.checked && !ckAllCat.checked &&
            !ckBershka.checked && !ckZara.checked && !ckAllBr.checked ){
            
            lstFiltre = lstTotala;
            console.log("LISTA - allDSP:", lstFiltre);

            console.log("PRODUSUL ESTE IN LISTA");
            AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
        }

        // FILTRARE PRODUSE DOAR DUPA CATEGORIE
        if(ckRochii.checked && 
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckBershka.checked && !ckZara.checked && !ckAllBr.checked ){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - Rochii:", lstFiltre);

            if(element.val().Categorie === "Rochii" && lstFiltre.includes(element.key)){
                console.log("PRODUSUL ESTE IN LISTA");
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
            }else{
                console.log("PRODUSUL FACE PARTE DIN ALTA CATEGORIE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - Rochii:", lstFiltre);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckBluze.checked && 
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckBershka.checked && !ckZara.checked && !ckAllBr.checked ){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - Bluze:", lstFiltre);
            
            if(element.val().Categorie === "Bluze" && lstFiltre.includes(element.key)){
                console.log("PRODUSUL ESTE IN LISTA");
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
            }else{
                console.log("PRODUSUL FACE PARTE DIN ALTA CATEGORIE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - Bluze:", lstFiltre);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);
        }else if(ckAllCat.checked && 
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckBershka.checked && !ckZara.checked && !ckAllBr.checked ){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - allCAT:", lstFiltre);

            console.log("PRODUSUL ESTE IN LISTA");
            AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
        }


        // FILTRAREA PRODUSELOR DOAR DUPA BRAND
        if(ckBershka.checked &&
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckBluze.checked && !ckRochii.checked && !ckAllCat.checked ){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - Bershka:", lstFiltre);

            if(element.val().Brand === "Bershka" && lstFiltre.includes(element.key)){
                console.log("PRODUSUL ESTE IN LISTA");
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
            }else{
                console.log("PRODUSUL FACE PARTE DIN ALTA CATEGORIE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - Bershka:", lstFiltre);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckZara.checked && 
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckBluze.checked && !ckRochii.checked && !ckAllCat.checked ){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - Zara:", lstFiltre);
            
            if(element.val().Brand === "Zara" && lstFiltre.includes(element.key)){
                console.log("PRODUSUL ESTE IN LISTA");
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
            }else{
                console.log("PRODUSUL FACE PARTE DIN ALTA CATEGORIE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - Zara:", lstFiltre);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);
        }else if(ckAllBr.checked &&
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckBluze.checked && !ckRochii.checked && !ckAllCat.checked ){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - allBr:", lstFiltre);

            console.log("PRODUSUL ESTE IN LISTA");
            AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
        } 



        // FILTRAREA PRODUSELOR 
        // - PROMO & BLUZE/ROCHII
        // - PROMO & BERSHKA/ZARA
        // - PROMO & TOATE CATEGORIILE/TOATE BRAND-urile
        // - PROMO & BLUZE/ROCHII & BERSHKA/ZARA
        if(ckPromo.checked && ckBluze.checked && 
            !ckBershka.checked && !ckZara.checked && !ckAllBr.checked ){
            
            lstFiltre = lstTotala;
            console.log("LISTA - promo & bluze: ", lstFiltre);
            console.log("CATEGORIE BLZ - - ", element.key + " " + element.val().Categorie);
            console.table(element.val());
            if(element.val().Reducere == 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);

            }else if(element.val().Categorie != "Bluze"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA BLUZE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - promo & bluze: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckPromo.checked && ckRochii.checked && 
            !ckBershka.checked && !ckZara.checked && !ckAllBr.checked){
            
            lstFiltre = lstTotala;
            console.log("LISTA - promo & rochii: ", lstFiltre);

            console.log("CATEGORIE ROCHII - - ", element.key + " " + element.val().Categorie);
            console.table(element.val());
            if(element.val().Reducere === 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);

            }else if(element.val().Categorie != "Rochii"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA ROCHII");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - promo & rochii: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckPromo.checked && ckBershka.checked && 
            !ckBluze.checked && !ckRochii.checked && !ckAllCat.checked){
            
            lstFiltre = lstTotala;
            console.log("LISTA - stoc & bershka: ", lstFiltre);
            if(element.val().Reducere === 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);

            }else if(element.val().Brand != "Bershka"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul BERSHKA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bershka: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckPromo.checked && ckZara.checked && 
            !ckBluze.checked && !ckRochii.checked && !ckAllCat.checked){
            
            lstFiltre = lstTotala;
            console.log("LISTA - stoc & zara: ", lstFiltre);
            if(element.val().Reducere === 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);

            }else if(element.val().Brand != "Zara"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul ZARA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & zara: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if((ckPromo.checked && ckAllCat.checked &&
            !ckBershka.checked && !ckZara.checked && !ckAllBr.checked) || 
            (ckPromo.checked && ckAllBr.checked &&
            !ckBluze.checked && !ckRochii.checked && !ckAllCat.checked)){
            
            lstFiltre = lstTotala;
            console.log("LISTA - stoc + all: ", lstFiltre);
            if(element.val().Reducere === 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckPromo.checked && ckBluze.checked && ckBershka.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & bluze & bershka: ", lstFiltre);
            if(element.val().Reducere === 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);
            }else if(element.val().Categorie != "Bluze"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA BLUZE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & bershka: ", lstFiltre);
            
            }else if(element.val().Brand != "Bershka"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul BERSHKA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & bershka: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckPromo.checked && ckBluze.checked && ckZara.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & bluze & zara: ", lstFiltre);
            if(element.val().Reducere === 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);
            }else if(element.val().Categorie != "Bluze"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA BLUZE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & zara: ", lstFiltre);
            
            }else if(element.val().Brand != "Zara"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul ZARA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & zara: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckPromo.checked && ckRochii.checked && ckBershka.checked ){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & rochii & bershka: ", lstFiltre);
            if(element.val().Reducere === 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);
            }else if(element.val().Categorie != "Rochii"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA ROCHII");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & bershka: ", lstFiltre);
            
            }else if(element.val().Brand != "Bershka"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul BERSHKA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & bershka: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckPromo.checked && ckRochii.checked && ckZara.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & rochii & zara: ", lstFiltre);
            if(element.val().Reducere === 0|| element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);
            }else if(element.val().Categorie != "Rochii"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA ROCHII");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & zara: ", lstFiltre);
            
            }else if(element.val().Brand != "Zara"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul ZARA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & zara: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckPromo.checked && ckBluze.checked && ckAllBr.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & bluze & all: ", lstFiltre);
            if(element.val().Reducere === 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);
            }else if(element.val().Categorie != "Bluze"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA BLUZE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & all: ", lstFiltre);
         
            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckPromo.checked && ckRochii.checked && ckAllBr.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & rochii & all: ", lstFiltre);
            if(element.val().Reducere === 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);
            }else if(element.val().Categorie != "Rochii"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA ROCHII");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & all: ", lstFiltre);
            
            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckPromo.checked && ckAllCat.checked && ckZara.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & all & zara: ", lstFiltre);
            if(element.val().Reducere === 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);
            
            }else if(element.val().Brand != "Zara"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul ZARA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & all & zara: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckPromo.checked && ckAllCat.checked && ckBershka.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & all & bershka: ", lstFiltre);
            if(element.val().Reducere === 0 || element.val().Stoc === 0){

                console.log("PRODUSUL NU ESTE REDUS SAU NU ESTE DISPONIBIL");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - PROMOTII: ", lstFiltre);
            
            }else if(element.val().Brand != "Bershka"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul BERSHKA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & all & bershka: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }

        // FILTRAREA PRODUSELOR 
        // - STOC & BLUZE/ROCHII
        // - STOC & BERSHKA/ZARA
        // - STOC & TOATE CATEGORIILE/TOATE BRAND-urile
        // - STOC & BLUZE/ROCHII & BERSHKA/ZARA
        if(ckStoc.checked && ckBluze.checked && 
            !ckBershka.checked && !ckZara.checked && !ckAllBr.checked){
            
            lstFiltre = lstTotala;
            console.log("LISTA - stoc & bluze: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("PRODUSUL NU EXISTA IN STOC.");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze: ", lstFiltre);

            }else if(element.val().Categorie != "Bluze"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA BLUZE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckStoc.checked && ckRochii.checked && 
            !ckBershka.checked && !ckZara.checked && !ckAllBr.checked){
            
            lstFiltre = lstTotala;
            console.log("LISTA - stoc & rochii: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("PRODUSUL NU EXISTA IN STOC.");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii: ", lstFiltre);

            }else if(element.val().Categorie != "Rochii"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA Rochii");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        } else if(ckStoc.checked && ckBershka.checked && 
            !ckBluze.checked && !ckRochii.checked && !ckAllCat.checked){
            
            lstFiltre = lstTotala;
            console.log("LISTA - stoc & bershka: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("PRODUSUL NU EXISTA IN STOC.");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bershka: ", lstFiltre);

            }else if(element.val().Brand != "Bershka"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul BERSHKA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bershka: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckStoc.checked && ckZara.checked && 
            !ckBluze.checked && !ckRochii.checked && !ckAllCat.checked){
            
            lstFiltre = lstTotala;
            console.log("LISTA - stoc & zara: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("PRODUSUL NU EXISTA IN STOC.");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & zara: ", lstFiltre);

            }else if(element.val().Brand != "Zara"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul ZARA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & zara: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if((ckStoc.checked && ckAllCat.checked &&
            !ckBershka.checked && !ckZara.checked && !ckAllBr.checked) || 
            (ckStoc.checked && ckAllBr.checked &&
            !ckBluze.checked && !ckRochii.checked && !ckAllCat.checked)){
            
            lstFiltre = lstTotala;
            console.log("LISTA - stoc + all: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("NU EXISTA IN STOC");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckStoc.checked && ckBluze.checked && ckBershka.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & bluze & bershka: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("PRODUSUL NU EXISTA IN STOC.");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & bershka: ", lstFiltre);
            }else if(element.val().Categorie != "Bluze"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA BLUZE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & bershka: ", lstFiltre);
            
            }else if(element.val().Brand != "Bershka"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul BERSHKA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & bershka: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckStoc.checked && ckBluze.checked && ckZara.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & bluze & zara: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("PRODUSUL NU EXISTA IN STOC.");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & zara: ", lstFiltre);
            }else if(element.val().Categorie != "Bluze"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA BLUZE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & zara: ", lstFiltre);
            
            }else if(element.val().Brand != "Zara"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul ZARA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & zara: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckStoc.checked && ckRochii.checked && ckBershka.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & rochii & bershka: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("PRODUSUL NU EXISTA IN STOC.");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & bershka: ", lstFiltre);
            }else if(element.val().Categorie != "Rochii"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA ROCHII");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & bershka: ", lstFiltre);
            
            }else if(element.val().Brand != "Bershka"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul BERSHKA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & bershka: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckStoc.checked && ckRochii.checked && ckZara.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & rochii & zara: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("PRODUSUL NU EXISTA IN STOC.");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & zara: ", lstFiltre);
            }else if(element.val().Categorie != "Rochii"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA ROCHII");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & zara: ", lstFiltre);
            
            }else if(element.val().Brand != "Zara"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul ZARA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & zara: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckStoc.checked && ckBluze.checked && ckAllBr.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & bluze & all: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("PRODUSUL NU EXISTA IN STOC.");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & all: ", lstFiltre);
            }else if(element.val().Categorie != "Bluze"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA BLUZE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & bluze & all: ", lstFiltre);
         
            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckStoc.checked && ckRochii.checked && ckAllBr.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & rochii & all: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("PRODUSUL NU EXISTA IN STOC.");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & all: ", lstFiltre);
            }else if(element.val().Categorie != "Rochii"){

                console.log("PRODUSUL NU FACE PARTE DIN CATEGORIA ROCHII");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & rochii & all: ", lstFiltre);
            
            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckStoc.checked && ckAllCat.checked && ckZara.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & all & zara: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("PRODUSUL NU EXISTA IN STOC.");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & all & zara: ", lstFiltre);
            
            }else if(element.val().Brand != "Zara"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul ZARA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & all & zara: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckStoc.checked && ckAllCat.checked && ckBershka.checked){

            lstFiltre = lstTotala;
            console.log("LISTA - stoc & all & bershka: ", lstFiltre);
            if(element.val().Stoc === 0){
                
                console.log("PRODUSUL NU EXISTA IN STOC.");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & all & bershka: ", lstFiltre);
            
            }else if(element.val().Brand != "Bershka"){

                console.log("PRODUSUL NU FACE PARTE DIN BRAND-ul BERSHKA");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - stoc & all & bershka: ", lstFiltre);

            }else if(lstFiltre.includes(element.key) ){

                console.log("PRODUSUL ESTE IN LISTA");
                
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }



        // FILTRAREA PRODUSELOR
        // ROCHII & BERSHKA/ZARA/ALL
        // BLUZE & BERSHKA/ZARA/ALL

        if(ckRochii.checked && ckBershka.checked &&
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckZara.checked && !ckAllBr.checked){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - Rochii:", lstFiltre);

            if(element.val().Categorie === "Rochii" && element.val().Brand === "Bershka" && lstFiltre.includes(element.key)){
                console.log("PRODUSUL ESTE IN LISTA");
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
            }else{
                console.log("PRODUSUL FACE PARTE DIN ALTA CATEGORIE SAU ARE ALT BRAND");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - Rochii:", lstFiltre);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckRochii.checked && ckZara.checked &&
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckBershka.checked && !ckAllBr.checked){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - Rochii:", lstFiltre);

            if(element.val().Categorie === "Rochii" && element.val().Brand === "Zara" && lstFiltre.includes(element.key)){
                console.log("PRODUSUL ESTE IN LISTA");
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
            }else{
                console.log("PRODUSUL FACE PARTE DIN ALTA CATEGORIE SAU ARE ALT BRAND");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - Rochii:", lstFiltre);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckRochii.checked && ckAllBr.checked &&
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckBershka.checked && !ckZara.checked){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - Rochii:", lstFiltre);

            if(element.val().Categorie === "Rochii" && lstFiltre.includes(element.key)){
                console.log("PRODUSUL ESTE IN LISTA");
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
            }else{
                console.log("PRODUSUL FACE PARTE DIN ALTA CATEGORIE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - Rochii:", lstFiltre);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckBluze.checked && ckBershka.checked &&
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckZara.checked && !ckAllBr.checked){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - Bluze:", lstFiltre);
            
            if(element.val().Categorie === "Bluze" && element.val().Brand === "Bershka" && lstFiltre.includes(element.key)){
                console.log("PRODUSUL ESTE IN LISTA");
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
            }else{
                console.log("PRODUSUL FACE PARTE DIN ALTA CATEGORIE SAU ARE ALT BRAND");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - Bluze:", lstFiltre);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);
        }else if(ckBluze.checked && ckZara.checked &&
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckBershka.checked && !ckAllBr.checked){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - Bluze:", lstFiltre);
            
            if(element.val().Categorie === "Bluze" && element.val().Brand === "Zara" && lstFiltre.includes(element.key)){
                console.log("PRODUSUL ESTE IN LISTA");
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
            }else{
                console.log("PRODUSUL FACE PARTE DIN ALTA CATEGORIE SAU ARE ALT BRAND");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - Bluze:", lstFiltre);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);
        }else if(ckBluze.checked && ckAllBr.checked &&
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckBershka.checked && !ckZara.checked){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - Bluze:", lstFiltre);

            if(element.val().Categorie === "Bluze" && lstFiltre.includes(element.key)){
                console.log("PRODUSUL ESTE IN LISTA");
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
            }else{
                console.log("PRODUSUL FACE PARTE DIN ALTA CATEGORIE");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - Bluze:", lstFiltre);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);

        }else if(ckAllCat.checked && ckBershka.checked &&
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckZara.checked && !ckAllBr.checked){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - allCAT:", lstFiltre);

            if(element.val().Brand === "Bershka" && lstFiltre.includes(element.key)){
                console.log("PRODUSUL ESTE IN LISTA");
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
            }else{
                console.log("PRODUSUL FACE PARTE DIN ALT BRAND");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - allCAT:", lstFiltre);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);
        }else if(ckAllCat.checked && ckZara.checked &&
            !ckStoc.checked && !ckPromo.checked && !ckAllDsp.checked &&
            !ckBershka.checked && !ckAllBr.checked){

            lstFiltre = lstTotala;
            console.log("LISTA(totala) - allCAT:", lstFiltre);

            if(element.val().Brand === "Zara" && lstFiltre.includes(element.key)){
                console.log("PRODUSUL ESTE IN LISTA");
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);               
            }else{
                console.log("PRODUSUL FACE PARTE DIN ALT BRAND");

                let idxStoc = lstFiltre.indexOf(element.key);
                lstFiltre.splice(idxStoc, 1);

                console.log("LISTA DUPA STERGERE - allCAT:", lstFiltre);
            }
            console.log("### LISTA FINALA DE PRODUSE: " + lstFiltre);
        }
    })
}


function AddAllItemsFilter(Produse){
    divBody.innerHTML = "";
    Produse.forEach(element => {
        console.log("Cheia produsului adaugat:");
        console.log(element.key);
        console.log("FavoriteBy:");
        console.log(element.val().FavoriteBy);
        
        console.log("LST FILTRE - - - ", lstFiltre);
        if(lstFiltre.length !== 0){
            if(lstFiltre.includes(element.key)){
                AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);             
            }
              
        }else{
            console.log("ELSE - - - ADAUGA ELEMENTE ORDONATE");
            AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
        }
        lstTotala.push(element.key);
        console.log("LISTA TOTALA DE PRODUSE == ", lstTotala); 
    })
}

function GetFilter(){
    const dbRef = ref(db);
    get(child(dbRef, "Produse/" ))
    .then((snapshot) => {
        var prod = [];
        snapshot.forEach(childSnapshot => {
            console.log("Child -> id-urile produselor:");
            console.log(childSnapshot.key);
            prod.push(childSnapshot);
        });
        
        SetFilter(prod);
    })
    .catch((error) => {
        console.log("Mesaj eroare " + error);
    })
}

function GetFilterIncPrice(){
    const q = query(ref(db, "Produse"),orderByChild("Pret"));
    get(q)
    .then((snapshot) => {
        var prod = [];
        snapshot.forEach(childSnapshot => {
            console.log("Child -> id-urile produselor:");
            console.log(childSnapshot.key);
            prod.push(childSnapshot);
        });

        lstTotala = [];
        AddAllItemsFilter(prod);
    })
    .catch((error) => {
        console.log("Mesaj eroare " + error);
    })
}

function GetFilterDecPrice(){
    const q = query(ref(db, "Produse"),orderByChild("Pret"));
    get(q)
    .then((snapshot) => {
        var prod = [];
        snapshot.forEach(childSnapshot => {
            console.log("Child -> id-urile produselor:");
            console.log(childSnapshot.key);
            prod.push(childSnapshot);
        });
        prod.reverse();
        lstTotala = [];
        AddAllItemsFilter(prod);
    })
    .catch((error) => {
        console.log("Mesaj eroare " + error);
    })
}



document.getElementById("btnApply").disabled = true;

// EVENIMENT PENTRU BUTOANELE RADIO DE LA FILTRAREA PRODUSELOR
let ckAllProd = document.getElementById("checkAll");
let ckAllCat = document.getElementById("listCatAll");
let ckAllBr = document.getElementById("listBrAll");

let ckStocProd = document.getElementById("checkStoc");
let ckPromoProd = document.getElementById('checkPromotii');

let ckBluzeProd = document.getElementById('listBluze');
let ckRochiiProd = document.getElementById('listRochii');

let ckBershkaProd = document.getElementById('listBershka');
let ckZaraProd = document.getElementById('listZara');

// VARIABILE DECLARATE PENTRU BUTOANELE RADIO - SORTARE
let ckIncPret = document.getElementById('listCrescator');
let ckDecPret = document.getElementById('listDescrescator');

ckAllProd.addEventListener('change', () => {
    if(ckAllProd.checked){
        ckAllCat.disabled = true;
        ckAllBr.disabled = true;

        ckBluzeProd.disabled = true;
        ckRochiiProd.disabled = true;

        ckBershkaProd.disabled = true;
        ckZaraProd.disabled = true;

        ckAllCat.checked = false;
        ckAllBr.checked = false;

        ckBluzeProd.checked = false;
        ckRochiiProd.checked = false;

        ckBershkaProd.checked = false;
        ckZaraProd.checked = false;
    }

    document.getElementById("btnApply").disabled = false;
})

ckAllCat.addEventListener('change', () => {
    if(ckAllCat.checked){
        ckAllProd.disabled = true;
        ckAllBr.disabled = true;
    }

    document.getElementById("btnApply").disabled = false;
})

ckAllBr.addEventListener('change', () => {
    if(ckAllBr.checked){
        ckAllCat.disabled = true;
        ckAllProd.disabled = true;
    }

    document.getElementById("btnApply").disabled = false;
})

ckStocProd.addEventListener('change', () => {
    ckAllProd.disabled = false;
    ckAllCat.disabled = false;
    ckAllBr.disabled = false;

    ckBluzeProd.disabled = false;
    ckRochiiProd.disabled = false;
    ckBershkaProd.disabled = false;
    ckZaraProd.disabled = false;

    document.getElementById("btnApply").disabled = false;
})

ckPromoProd.addEventListener('change', () => {
    ckAllProd.disabled = false;
    ckAllCat.disabled = false;
    ckAllBr.disabled = false;

    ckBluzeProd.disabled = false;
    ckRochiiProd.disabled = false;
    ckBershkaProd.disabled = false;
    ckZaraProd.disabled = false;

    document.getElementById("btnApply").disabled = false;
})

ckBluzeProd.addEventListener('change', () => {
    ckAllProd.disabled = false;
    // ckAllCat.disabled = false;
    ckAllBr.disabled = false;

    document.getElementById("btnApply").disabled = false;
})

ckRochiiProd.addEventListener('change', () => {
    ckAllProd.disabled = false;
    // ckAllCat.disabled = false;
    ckAllBr.disabled = false;

    document.getElementById("btnApply").disabled = false;
})

ckBershkaProd.addEventListener('change', () => {
    ckAllProd.disabled = false;
    ckAllCat.disabled = false;
    // ckAllBr.disabled = false;

    document.getElementById("btnApply").disabled = false;
})

ckZaraProd.addEventListener('change', () => {
    ckAllProd.disabled = false;
    ckAllCat.disabled = false;
    // ckAllBr.disabled = false;

    document.getElementById("btnApply").disabled = false;
})


document.getElementById("listCrescator").addEventListener('change', () => {
    document.getElementById("btnApply").disabled = false;
    GetFilterIncPrice();
    $('#divBody').load(document.URL +  '  #divBody');
    window.onload = GetFilterIncPrice;
})

document.getElementById("listDescrescator").addEventListener('change', () => {
    document.getElementById("btnApply").disabled = false;
    GetFilterDecPrice();
    $('#divBody').load(document.URL +  '  #divBody');
    window.onload = GetFilterDecPrice;
})


// EVENIMENT BUTON APLICA FILTRE
document.getElementById("btnApply").addEventListener('click', () => {
    
    GetFilter();
    $('#divBody').load(document.URL +  '  #divBody');
    window.onload = GetFilter;

    if(ckIncPret.checked){
        console.log("PRET CRESCATOR CHECKED ---");
        GetFilterIncPrice();
        $('#divBody').load(document.URL +  '  #divBody');
        window.onload = GetFilterIncPrice;
    }

    if(ckDecPret.checked){
        console.log("PRET DESCRESCATOR CHECKED ---");
        GetFilterDecPrice();
        $('#divBody').load(document.URL +  '  #divBody');
        window.onload = GetFilterDecPrice;
    }

    
})

// EVENTIMENT BUTON STERGE FILTRE
document.getElementById("btnClear").addEventListener('click', () => {
  
    document.getElementById("btnApply").disabled = true;
    document.getElementById("listCrescator").checked = false;
    document.getElementById("listDescrescator").checked = false;

    ckStocProd.checked = false;
    ckPromoProd.checked = false;
    ckAllProd.checked = false;

    ckRochiiProd.checked = false;
    ckBluzeProd.checked = false;
    ckAllCat.checked = false;

    ckBershkaProd.checked = false;
    ckZaraProd.checked = false;
    ckAllBr.checked = false;


    ckAllProd.disabled = false;
    ckAllCat.disabled = false;
    ckAllBr.disabled = false;
    ckBluzeProd.disabled = false;
    ckRochiiProd.disabled = false;
    ckBershkaProd.disabled = false;
    ckZaraProd.disabled = false;
    lstFiltre = [];
    GetAllData();
})


// FUNCTIE PENTRU VERIFICAREA MARIMILOR CORESPONDENTE CULORILOR
function checkSize(xsColor, sColor, mColor, lColor, xlColor, xsSize, sSize, mSize, lSize, xlSize){
    if(xsColor != 0){
        xsSize.className = "sizeChange-xs";
        xsSize.style.visibility = "visible";
        xsSize.style.float = "left";
    }else{
        xsSize.style.visibility = "hidden";
        xsSize.style.float = "right";
    }
    if(sColor != 0){
        sSize.className = "sizeChange-s";
        sSize.style.visibility = "visible";
        sSize.style.float = "left";
    }else{
        sSize.style.visibility = "hidden";
        sSize.style.float = "right";
    }
    if(mColor != 0){
        mSize.className = "sizeChange-m";
        mSize.style.visibility = "visible";
        mSize.style.float = "left";
    }else{
        mSize.style.visibility = "hidden";
        mSize.style.float = "right";
    }
    if(lColor != 0){
        lSize.className = "sizeChange-l";
        lSize.style.visibility = "visible";
        lSize.style.float = "left";
    }else{
        lSize.style.visibility = "hidden";
        lSize.style.float = "right";
    }
    if(xlColor != 0){
        xlSize.className = "sizeChange-xl";
        xlSize.style.visibility = "visible";
        xlSize.style.float = "left";
    }else{
        xlSize.style.visibility = "hidden";
        xlSize.style.float = "right";
    }
}

// FUNCTIE PENTRU TRIMITEREA LA PAGINA DE DETALII 
function goToDetails(img1, img2, keyProd) {
    
    sessionStorage.setItem("image1", img1);
    console.log("SESSION STORAGE IMG 1 ==== " + sessionStorage.getItem("image1"));
    
    sessionStorage.setItem("image2", img2);
    console.log("SESSION STORAGE IMG 2 ==== " + sessionStorage.getItem("image2"));

    sessionStorage.setItem("keyProd", keyProd);
    console.log("SESSION STORAGE KEY  ==== " + sessionStorage.getItem("keyProd"));
    
    window.location.href = "form_details.html";
}


var divBody = document.getElementById('divBody');
var count = 0;
var countProd = 1;
let prodMap = new Map();

// FUNCTII PENTRU GENERAREA DINAMICA A PRODUSELOR PE SITE
// key        -> cheia produsului 
// favoriteBy -> uid-ul persoanei care a adaugat acest produs la favorite
function AddItem(key, brand, imagine1, imagine2, nume, pret, reducere, pretRedus, favoriteBy){
    
    let div = document.createElement('div');
    div.className = "pro";
        // BUTON PENTRU ADAUGAREA PRODUSELOR LA FAVORITE
        let td1 = document.createElement('a');
            td1.id = "love" + count;
            td1.className = "love";
            td1.innerHTML = '<i class="fas fa-heart heart"></i>';
            td1.children[0].classList.add("inactiveHeart");
        // BUTON DE EDITARE PRODUS PENTRU UTILIZATORII CU ROL DE ADMIN
        let tdEdit = document.createElement('a');
            tdEdit.id = "edit" + key;
            tdEdit.innerHTML = '<i class="fas fa-pen"></i>';
            tdEdit.classList.add("pen");
        // BUTON DE STERGERE PRODUS PENTRU UTILIZATORII CU ROL DE ADMIN
        let tdDelete = document.createElement('a');
            tdDelete.id = "delete" + key;
            tdDelete.innerHTML = '<i class="fas fa-trash"></i>';
            tdDelete.classList.add("trash");
        // SECTIUNEA PENTRU IMAGINEA PRODUSULUI
        let divImg = document.createElement('div');
            divImg.className = "containerImg";
        let divPhoto = document.createElement('div');
            divPhoto.className = "overlay";
        let td2 = document.createElement('img');
            td2.id = "photo1" + key;
            td2.src = imagine1;
            td2.onclick = "goToDetails(" + imagine1 + "," + imagine2 + "," + key + ");";
        let td2i = document.createElement('img');
            td2i.id = "photo2" + key
            td2i.src = imagine2;
            td2i.onclick = "goToDetails(" + imagine1 + "," + imagine2 + "," + key + ");";
        // SECTIUNEA PENTRU BRAND-UL PRODUSULUI
        let td3 = document.createElement('span');
            td3.className = "des";
            td3.innerHTML = brand;
        // SECTIUNEA PENTRU NUMELE PRODUSULUI
        let td4 = document.createElement('h5');
            td4.className = "des";
            td4.innerHTML = nume;
        // BUTOANE PENTRU SELECTAREA CULORII PRODUSULUI
        let divColor = document.createElement('div');
            divColor.id = "color" + key;
            divColor.className = "btnColor";
            // CULOARE - NEGRU
            let blackColor = document.createElement('button');
                blackColor.title = "Culoare neagra";
                blackColor.id = "black" + key;
                blackColor.innerHTML = "";
            // CULOARE - ALB
            let whiteColor = document.createElement('button');
                whiteColor.title = "Culoare alba";
                whiteColor.id = "white" + key;
                whiteColor.innerHTML = "";
            // CULOARE - ALBASTRU
            let blueColor = document.createElement('button');
                blueColor.title = "Culoare albastra";
                blueColor.id = "blue" + key;
                blueColor.innerHTML = "";
            // CULOARE - ROSU
            let redColor = document.createElement('button');
                redColor.title = "Culoare rosie";
                redColor.id = "red" + key;
                redColor.innerHTML = "";
            // CULOARE - VERDE
            let greenColor = document.createElement('button');
                greenColor.title = "Culoare verde";
                greenColor.id = "green" + key;
                greenColor.innerHTML = "";
            // CULOARE - MOV
            let purpleColor = document.createElement('button');
                purpleColor.title = "Culoare mov";
                purpleColor.id = "purple" + key;
                purpleColor.innerHTML = "";
            // CULOARE - BEJ
            let beigeColor = document.createElement('button');
                beigeColor.title = "Culoare bej";
                beigeColor.id = "beige" + key;
                beigeColor.innerHTML = "";
            // CULOARE - ROZ
            let pinkColor = document.createElement('button');
                pinkColor.title = "Culoare roz";
                pinkColor.id = "pink" + key;
                pinkColor.innerHTML = "";
        // BUTOANE PENTRU SELECTAREA MARIMII PRODUSULUI
        let divSize = document.createElement('div');
            divSize.id = "divSize" + key;
            divSize.className = "btnSize";
            // MarimiA XS
            let xsSize = document.createElement('button');
                xsSize.title = "Marimea XS";
                xsSize.id = "sizeXs" + key;
                xsSize.innerHTML = "XS";
            // MarimiA S
            let sSize = document.createElement('button');
                sSize.title = "Marimea S";
                sSize.id = "sizeS" + key;
                sSize.innerHTML = "S";
            // MarimiA M
            let mSize = document.createElement('button');
                mSize.title = "Marimea M";
                mSize.id = "sizeM" + key;
                mSize.innerHTML = "M";
            // MarimiA L
            let lSize = document.createElement('button');
                lSize.title = "Marimea L";
                lSize.id = "sizeL" + key;
                lSize.innerHTML = "L";
            // MarimiA XL
            let xlSize = document.createElement('button');
                xlSize.title = "Marimea XL";
                xlSize.id = "sizeXL" + key;
                xlSize.innerHTML = "XL";
        // SECTIUNEA PENTRU PRETUL PRODUSULUI
        let td5 = document.createElement('h4');
            td5.id = "pret" + key;
            td5.className = "des";
            td5.innerHTML = pret + ' lei';
        // BUTON PENTRU ADAUGAREA PRODUSULUI IN COSUL DE CUMPARATURI 
        let td6 = document.createElement('a');
            td6.id = "cos" + count;
            td6.innerHTML = '<i class="fa fa-shopping-cart cart"></i>';
    
    td2.addEventListener('click', () => {
        goToDetails(imagine1, imagine2, key);
    });
    td2i.addEventListener('click', () => {
        goToDetails(imagine1, imagine2, key);
    })




    get(child(dbRef, "Produse/" + key)).then((snapshot) => {
        if (snapshot.exists()) {
            // AFISAREA BUTOANELOR CORESPONDENTE CULORILOR EXISTENTE
            // BLACK 
            var negru1 = snapshot.val().Culori.Negru.PozaFata;
            var negru2 = snapshot.val().Culori.Negru.PozaSpate;
            var imgBlack = snapshot.val().Culori.Negru.PozaCuloare;
            if(negru1.length != 0 || negru2.length != 0){
                blackColor.className = "colorChange";
                blackColor.style.backgroundImage = 'url("' + imgBlack + '")';
                blackColor.style.visibility = "visible";
            }else{
                blackColor.style.visibility = "hidden";
            }
            // WHITE 
            var alb1 = snapshot.val().Culori.Alb.PozaFata;
            var alb2 = snapshot.val().Culori.Alb.PozaSpate;
            var imgWhite = snapshot.val().Culori.Alb.PozaCuloare;
            if(alb1.length != 0 || alb2.length != 0){
                whiteColor.className = "colorChange";
                whiteColor.style.backgroundImage = 'url("' + imgWhite + '")';
                whiteColor.style.visibility = "visible";
            }else{
                whiteColor.style.visibility = "hidden";
            }
            // BLUE 
            var albastru1 = snapshot.val().Culori.Albastru.PozaFata;
            var albastru2 = snapshot.val().Culori.Albastru.PozaSpate;
            var imgBlue = snapshot.val().Culori.Albastru.PozaCuloare;
            if(albastru1.length != 0 || albastru2.length != 0){
                blueColor.className = "colorChange";
                blueColor.style.backgroundImage = 'url("' + imgBlue + '")';
                blueColor.style.visibility = "visible";
            }else{
                blueColor.style.visibility = "hidden";
            }
            // RED 
            var rosu1 = snapshot.val().Culori.Rosu.PozaFata;
            var rosu2 = snapshot.val().Culori.Rosu.PozaSpate;
            var imgRed = snapshot.val().Culori.Rosu.PozaCuloare;
            if(rosu1.length != 0 || rosu2.length != 0){
                redColor.className = "colorChange";
                redColor.style.backgroundImage = 'url("' + imgRed + '")';
                redColor.style.visibility = "visible";
            }else{
                redColor.style.visibility = "hidden";
            }
            // GREEN 
            var verde1 = snapshot.val().Culori.Verde.PozaFata;
            var verde2 = snapshot.val().Culori.Verde.PozaSpate;
            var imgGreen = snapshot.val().Culori.Verde.PozaCuloare;
            if(verde1.length != 0 || verde2.length != 0){
                greenColor.className = "colorChange";
                greenColor.style.backgroundImage = 'url("' + imgGreen + '")';
                greenColor.style.visibility = "visible";
            }else{
                greenColor.style.visibility = "hidden";
            }
            // PURPLE 
            var mov1 = snapshot.val().Culori.Mov.PozaFata;
            var mov2 = snapshot.val().Culori.Mov.PozaSpate;
            var imgPurple = snapshot.val().Culori.Mov.PozaCuloare;
            if(mov1.length != 0 || mov2.length != 0){
                purpleColor.className = "colorChange";
                purpleColor.style.backgroundImage = 'url("' + imgPurple + '")';
                purpleColor.style.visibility = "visible";
            }else{
                purpleColor.style.visibility = "hidden";
            }
            // BEIGE 
            var bej1 = snapshot.val().Culori.Bej.PozaFata;
            var bej2 = snapshot.val().Culori.Bej.PozaSpate;
            var imgBeige = snapshot.val().Culori.Bej.PozaCuloare;
            if(bej1.length != 0 || bej2.length != 0){
                beigeColor.className = "colorChange";
                beigeColor.style.backgroundImage = 'url("' + imgBeige + '")';
                beigeColor.style.visibility = "visible";
            }else{
                beigeColor.style.visibility = "hidden";
            }
            // PINK 
            var roz1 = snapshot.val().Culori.Roz.PozaFata;
            var roz2 = snapshot.val().Culori.Roz.PozaSpate;
            var imgPink = snapshot.val().Culori.Roz.PozaCuloare;
            if(roz1.length != 0 || roz2.length != 0){
                pinkColor.className = "colorChange";
                pinkColor.style.backgroundImage = 'url("' + imgPink + '")';
                pinkColor.style.visibility = "visible";
            }else{
                pinkColor.style.visibility = "hidden";
            }


            // AFISAREA BUTOANELOR CORESPONDENTE MARIMILOR EXISTENTE
            // XS 
            var negruXS = snapshot.val().Culori.Negru.Marimi.xs;
            var albXS = snapshot.val().Culori.Alb.Marimi.xs;
            var albastruXS = snapshot.val().Culori.Albastru.Marimi.xs;
            var rosuXS = snapshot.val().Culori.Rosu.Marimi.xs;
            var verdeXS = snapshot.val().Culori.Verde.Marimi.xs;
            var movXS = snapshot.val().Culori.Mov.Marimi.xs;
            var bejXS = snapshot.val().Culori.Bej.Marimi.xs;
            var rozXS = snapshot.val().Culori.Roz.Marimi.xs;
            if(negruXS != 0 || albXS != 0 || albastruXS != 0 || rosuXS != 0 || verdeXS != 0 || movXS != 0 || bejXS != 0 || rozXS != 0){
                xsSize.className = "sizeChange-xs";
                xsSize.style.visibility = "visible";
            }else{
                xsSize.style.visibility = "hidden";
            }
            // S 
            var negruS = snapshot.val().Culori.Negru.Marimi.s;
            var albS = snapshot.val().Culori.Alb.Marimi.s;
            var albastruS = snapshot.val().Culori.Albastru.Marimi.s;
            var rosuS = snapshot.val().Culori.Rosu.Marimi.s;
            var verdeS = snapshot.val().Culori.Verde.Marimi.s;
            var movS = snapshot.val().Culori.Mov.Marimi.s;
            var bejS = snapshot.val().Culori.Bej.Marimi.s;
            var rozS = snapshot.val().Culori.Roz.Marimi.s;
            if(negruS != 0 || albS != 0 || albastruS != 0 || rosuS != 0 || verdeS != 0 || movS != 0 || bejS != 0 || rozS != 0){
                sSize.className = "sizeChange-s";
                sSize.style.visibility = "visible";
            }else{
                sSize.style.visibility = "hidden";
            }
            // M 
            var negruM = snapshot.val().Culori.Negru.Marimi.m;
            var albM = snapshot.val().Culori.Alb.Marimi.m;
            var albastruM = snapshot.val().Culori.Albastru.Marimi.m;
            var rosuM = snapshot.val().Culori.Rosu.Marimi.m;
            var verdeM = snapshot.val().Culori.Verde.Marimi.m;
            var movM = snapshot.val().Culori.Mov.Marimi.m;
            var bejM = snapshot.val().Culori.Bej.Marimi.m;
            var rozM = snapshot.val().Culori.Roz.Marimi.m;
            if(negruM != 0 || albM != 0 || albastruM != 0 || rosuM != 0 || verdeM != 0 || movM != 0 || bejM != 0 || rozM != 0){
                mSize.className = "sizeChange-m";
                mSize.style.visibility = "visible";
            }else{
                mSize.style.visibility = "hidden";
            }
            // L 
            var negruL = snapshot.val().Culori.Negru.Marimi.l;
            var albL = snapshot.val().Culori.Alb.Marimi.l;
            var albastruL = snapshot.val().Culori.Albastru.Marimi.l;
            var rosuL = snapshot.val().Culori.Rosu.Marimi.l;
            var verdeL = snapshot.val().Culori.Verde.Marimi.l;
            var movL = snapshot.val().Culori.Mov.Marimi.l;
            var bejL = snapshot.val().Culori.Bej.Marimi.l;
            var rozL = snapshot.val().Culori.Roz.Marimi.l;
            if(negruL != 0 || albL != 0 || albastruL != 0 || rosuL != 0 || verdeL != 0 || movL != 0 || bejL != 0 || rozL != 0){
                lSize.className = "sizeChange-l";
                lSize.style.visibility = "visible";
            }else{
                lSize.style.visibility = "hidden";
            }
            // XL 
            var negruXL = snapshot.val().Culori.Negru.Marimi.xl;
            var albXL = snapshot.val().Culori.Alb.Marimi.xl;
            var albastruXL = snapshot.val().Culori.Albastru.Marimi.xl;
            var rosuXL = snapshot.val().Culori.Rosu.Marimi.xl;
            var verdeXL = snapshot.val().Culori.Verde.Marimi.xl;
            var movXL = snapshot.val().Culori.Mov.Marimi.xl;
            var bejXL = snapshot.val().Culori.Bej.Marimi.xl;
            var rozXL = snapshot.val().Culori.Roz.Marimi.xl;
            if(negruXL != 0 || albXL != 0 || albastruXL != 0 || rosuXL != 0 || verdeXL != 0 || movXL != 0 || bejXL != 0 || rozXL != 0){
                xlSize.className = "sizeChange-xl";
                xlSize.style.visibility = "visible";
            }else{
                xlSize.style.visibility = "hidden";
            }


            // APLICAREA REDUCERII
            var price = document.getElementById("pret" + key);
            var size = document.getElementById("divSize" + key);
            if(snapshot.val().Stoc === 0){
                size.innerHTML = "<strong style='float: left;'>Stoc epuizat</strong>";
                size.style.color = "#e41616";

                price.innerHTML = " ";
            }

            if(snapshot.val().PretRedus != "0" && snapshot.val().Stoc != "0")
            {
                console.log("PRET VECHI: " + pret);

                console.log("PRET REDUS:" + pretRedus);
                
                price.innerHTML = '<del>' + pret + " lei" + '</del>' + " " + '<strong style="color:#e41616;">' + pretRedus + " lei</strong>";  
            }
            
            
        }
    })
   
    divImg.appendChild(td2);
    divPhoto.appendChild(td2i);
    divImg.appendChild(divPhoto);
    divColor.appendChild(blackColor);
    divColor.appendChild(whiteColor);
    divColor.appendChild(blueColor);
    divColor.appendChild(redColor);
    divColor.appendChild(greenColor);
    divColor.appendChild(purpleColor);
    divColor.appendChild(beigeColor);
    divColor.appendChild(pinkColor);
    divSize.appendChild(xsSize);
    divSize.appendChild(sSize);
    divSize.appendChild(mSize);
    divSize.appendChild(lSize);
    divSize.appendChild(xlSize);

    // BUTON - ADAUGARE PRODUSE LA FAVORITE
    div.appendChild(td1);
    div.appendChild(tdEdit);
    div.appendChild(tdDelete);
    div.appendChild(divImg);
    // SECTIUNE BRAND PRODUS
    div.appendChild(td3);
    // SECTIUNE NUME PRODUS
    div.appendChild(td4);
    div.appendChild(divColor);
    div.appendChild(divSize);
    // SECTIUNE PRET PRODUS
    div.appendChild(td5);
    // BUTON - ADAUGARE PRODUSE IN COSUL DE CUMPARATURI
    div.appendChild(td6);

    divBody.appendChild(div);

    var btnEdit = document.getElementById("edit" + key);
    var btnDelete = document.getElementById("delete" + key);

    get(child(dbRef, "Conturi/" + uid)).then((snapshot) => {
        if (snapshot.exists()) {
            if(snapshot.val().Rol && snapshot.val().Rol === "admin")
            {
                // DACA UTILIZATORUL ARE ROLUL DE ADMIN, ATUNCI II VOR FI VIZIBILE URMATOARELE FUNCTII:
                // EDITAREA SI STERGEREA UNUI PRODUS
                console.log("Rolul este:");
                console.log(snapshot.val().Rol);
               
                btnEdit.classList.add("pen-admin");
                btnDelete.classList.add("trash-admin");
            }
        }
    })


    get(child(dbRef, "Produse/" + key)).then((snapshot) => {
        if (snapshot.exists()) {
            // MODIFICAREA IMAGINILOR IN FUNCTIE DE CULOAREA SELECTATA
            var image1 = snapshot.val().Poza;
            var image2 = snapshot.val().Poza2;

            // VARIABILE BUTOANE CULORI
            var black = document.getElementById("black" + key);
            var white = document.getElementById("white" + key);
            var blue = document.getElementById("blue" + key);
            var red = document.getElementById("red" + key);
            var green = document.getElementById("green" + key);
            var purple = document.getElementById("purple" + key);
            var beige = document.getElementById("beige" + key);
            var pink = document.getElementById("pink" + key);
        // BLACK
            // imagini
            var imageBlack1 = snapshot.val().Culori.Negru.PozaFata;
            var imageBlack2 = snapshot.val().Culori.Negru.PozaSpate;
            // marimi
            var negruXS = snapshot.val().Culori.Negru.Marimi.xs;    
            var negruS = snapshot.val().Culori.Negru.Marimi.s;
            var negruM = snapshot.val().Culori.Negru.Marimi.m;
            var negruL = snapshot.val().Culori.Negru.Marimi.l;
            var negruXL = snapshot.val().Culori.Negru.Marimi.xl;
            // verificarea marimilor pentru poza afisata
            if(image1 === imageBlack1 && image2 === imageBlack2){
                checkSize(negruXS, negruS, negruM, negruL, negruXL, xsSize, sSize, mSize, lSize, xlSize);
            }
            // eveniment pentru butonul pentru culoarea neagra
            black.addEventListener('click', () => {
                black.style.border = "1px solid black";
                white.style.border = "none";
                blue.style.border = "none";
                red.style.border = "none";
                green.style.border = "none";
                purple.style.border = "none";
                beige.style.border = "none";
                pink.style.border = "none";

                td2.src = imageBlack1;
                td2i.src = imageBlack2;
                $('#divImg').load(document.URL +  '  #divImg');
                // verificarea marimilor pentru poza afisata
                checkSize(negruXS, negruS, negruM, negruL, negruXL, xsSize, sSize, mSize, lSize, xlSize)
            })

        // WHITE
            // imagini
            var imageWhite1 = snapshot.val().Culori.Alb.PozaFata;
            var imageWhite2 = snapshot.val().Culori.Alb.PozaSpate;
            // marimi
            var albXS = snapshot.val().Culori.Alb.Marimi.xs;    
            var albS = snapshot.val().Culori.Alb.Marimi.s;
            var albM = snapshot.val().Culori.Alb.Marimi.m;
            var albL = snapshot.val().Culori.Alb.Marimi.l;
            var albXL = snapshot.val().Culori.Alb.Marimi.xl;
            // verificarea marimilor pentru poza afisata
            if(image1 === imageWhite1 && image2 === imageWhite2){
                checkSize(albXS, albS, albM, albL, albXL, xsSize, sSize, mSize, lSize, xlSize);
            }
            // eveniment pentru butonul pentru culoarea alba
            white.addEventListener('click', () => {
                white.style.border = "1px solid black";
                black.style.border = "none";
                blue.style.border = "none";
                red.style.border = "none";
                green.style.border = "none";
                purple.style.border = "none";
                beige.style.border = "none";
                pink.style.border = "none";

                td2.src = imageWhite1;
                td2i.src = imageWhite2;
                $('#divImg').load(document.URL +  '  #divImg');
                // verificarea marimilor pentru poza afisata
                checkSize(albXS, albS, albM, albL, albXL, xsSize, sSize, mSize, lSize, xlSize);
            })

        // BLUE
            // imagini
            var imageBlue1 = snapshot.val().Culori.Albastru.PozaFata;
            var imageBlue2 = snapshot.val().Culori.Albastru.PozaSpate;
            // marimi
            var albastruXS = snapshot.val().Culori.Albastru.Marimi.xs;    
            var albastruS = snapshot.val().Culori.Albastru.Marimi.s;
            var albastruM = snapshot.val().Culori.Albastru.Marimi.m;
            var albastruL = snapshot.val().Culori.Albastru.Marimi.l;
            var albastruXL = snapshot.val().Culori.Albastru.Marimi.xl;
            // verificarea marimilor pentru poza afisata
            if(image1 === imageBlue1 && image2 === imageBlue2){
                checkSize(albastruXS, albastruS, albastruM, albastruL, albastruXL, xsSize, sSize, mSize, lSize, xlSize);
            }
            // eveniment pentru butonul pentru culoarea albastra
            blue.addEventListener('click', () => {
                blue.style.border = "1px solid black";
                black.style.border = "none";
                white.style.border = "none";
                red.style.border = "none";
                green.style.border = "none";
                purple.style.border = "none";
                beige.style.border = "none";
                pink.style.border = "none";

                td2.src = imageBlue1;
                td2i.src = imageBlue2;
                $('#divImg').load(document.URL +  '  #divImg');
                // verificarea marimilor pentru poza afisata
                checkSize(albastruXS, albastruS, albastruM, albastruL, albastruXL, xsSize, sSize, mSize, lSize, xlSize);
            })

        // RED
            // imagini
            var imageRed1 = snapshot.val().Culori.Rosu.PozaFata;
            var imageRed2 = snapshot.val().Culori.Rosu.PozaSpate;
            // marimi
            var rosuXS = snapshot.val().Culori.Rosu.Marimi.xs;    
            var rosuS = snapshot.val().Culori.Rosu.Marimi.s;
            var rosuM = snapshot.val().Culori.Rosu.Marimi.m;
            var rosuL = snapshot.val().Culori.Rosu.Marimi.l;
            var rosuXL = snapshot.val().Culori.Rosu.Marimi.xl;
            // verificarea marimilor pentru poza afisata
            if(image1 === imageRed1 && image2 === imageRed2){
                checkSize(rosuXS, rosuS, rosuM, rosuL, rosuXL, xsSize, sSize, mSize, lSize, xlSize);
            }
            // eveniment pentru butonul pentru culoarea rosu
            red.addEventListener('click', () => {
                red.style.border = "1px solid black";
                black.style.border = "none";
                white.style.border = "none";
                blue.style.border = "none";
                green.style.border = "none";
                purple.style.border = "none";
                beige.style.border = "none";
                pink.style.border = "none";

                td2.src = imageRed1;
                td2i.src = imageRed2;
                $('#divImg').load(document.URL +  '  #divImg');
                // verificarea marimilor pentru poza afisata
                checkSize(rosuXS, rosuS, rosuM, rosuL, rosuXL, xsSize, sSize, mSize, lSize, xlSize);
            })

        // GREEN
            // imagini
            var imageGreen1 = snapshot.val().Culori.Verde.PozaFata;
            var imageGreen2 = snapshot.val().Culori.Verde.PozaSpate;
            // marimi
            var verdeXS = snapshot.val().Culori.Verde.Marimi.xs;    
            var verdeS = snapshot.val().Culori.Verde.Marimi.s;
            var verdeM = snapshot.val().Culori.Verde.Marimi.m;
            var verdeL = snapshot.val().Culori.Verde.Marimi.l;
            var verdeXL = snapshot.val().Culori.Verde.Marimi.xl;
            // verificarea marimilor pentru poza afisata
            if(image1 === imageGreen1 && image2 === imageGreen2){
                checkSize(verdeXS, verdeS, verdeM, verdeL, verdeXL, xsSize, sSize, mSize, lSize, xlSize);
            }
            // eveniment pentru butonul pentru culoarea verde
            green.addEventListener('click', () => {
                green.style.border = "1px solid black";
                black.style.border = "none";
                white.style.border = "none";
                blue.style.border = "none";
                red.style.border = "none";
                purple.style.border = "none";
                beige.style.border = "none";
                pink.style.border = "none";

                td2.src = imageGreen1;
                td2i.src = imageGreen2;
                $('#divImg').load(document.URL +  '  #divImg');
                // verificarea marimilor pentru poza afisata
                checkSize(verdeXS, verdeS, verdeM, verdeL, verdeXL, xsSize, sSize, mSize, lSize, xlSize);
            })

        // PURPLE
            // imagini
            var imagePurple1 = snapshot.val().Culori.Mov.PozaFata;
            var imagePurple2 = snapshot.val().Culori.Mov.PozaSpate;
            // marimi
            var movXS = snapshot.val().Culori.Mov.Marimi.xs;    
            var movS = snapshot.val().Culori.Mov.Marimi.s;
            var movM = snapshot.val().Culori.Mov.Marimi.m;
            var movL = snapshot.val().Culori.Mov.Marimi.l;
            var movXL = snapshot.val().Culori.Mov.Marimi.xl;
            // verificarea marimilor pentru poza afisata
            if(image1 === imagePurple1 && image2 === imagePurple2){
                checkSize(movXS, movS, movM, movL, movXL, xsSize, sSize, mSize, lSize, xlSize);
            }
            // eveniment pentru butonul pentru culoarea mov
            purple.addEventListener('click', () => {
                purple.style.border = "1px solid black";
                black.style.border = "none";
                white.style.border = "none";
                blue.style.border = "none";
                red.style.border = "none";
                green.style.border = "none";
                beige.style.border = "none";
                pink.style.border = "none";

                td2.src = imagePurple1;
                td2i.src = imagePurple2;
                $('#divImg').load(document.URL +  '  #divImg');
                // verificarea marimilor pentru poza afisata
                checkSize(movXS, movS, movM, movL, movXL, xsSize, sSize, mSize, lSize, xlSize);
            })

        // BEIGE
            // imagini
            var imageBeige1 = snapshot.val().Culori.Bej.PozaFata;
            var imageBeige2 = snapshot.val().Culori.Bej.PozaSpate;
            // marimi
            var bejXS = snapshot.val().Culori.Bej.Marimi.xs;    
            var bejS = snapshot.val().Culori.Bej.Marimi.s;
            var bejM = snapshot.val().Culori.Bej.Marimi.m;
            var bejL = snapshot.val().Culori.Bej.Marimi.l;
            var bejXL = snapshot.val().Culori.Bej.Marimi.xl;
            // verificarea marimilor pentru poza afisata
            if(image1 === imageBeige1 && image2 === imageBeige2){
                checkSize(bejXS, bejS, bejM, bejL, bejXL, xsSize, sSize, mSize, lSize, xlSize);
            }
            // eveniment pentru butonul pentru culoarea bej
            beige.addEventListener('click', () => {
                beige.style.border = "1px solid black";
                black.style.border = "none";
                white.style.border = "none";
                blue.style.border = "none";
                red.style.border = "none";
                green.style.border = "none";
                purple.style.border = "none";
                pink.style.border = "none";

                td2.src = imageBeige1;
                td2i.src = imageBeige2;
                $('#divImg').load(document.URL +  '  #divImg');
                // verificarea marimilor pentru poza afisata
                checkSize(bejXS, bejS, bejM, bejL, bejXL, xsSize, sSize, mSize, lSize, xlSize);
            })

        // PINK
            // imagini
            var imagePink1 = snapshot.val().Culori.Roz.PozaFata;
            var imagePink2 = snapshot.val().Culori.Roz.PozaSpate;
            // marimi
            var rozXS = snapshot.val().Culori.Roz.Marimi.xs;    
            var rozS = snapshot.val().Culori.Roz.Marimi.s;
            var rozM = snapshot.val().Culori.Roz.Marimi.m;
            var rozL = snapshot.val().Culori.Roz.Marimi.l;
            var rozXL = snapshot.val().Culori.Roz.Marimi.xl;
            // verificarea marimilor pentru poza afisata
            if(image1 === imagePink1 && image2 === imagePink2){
                checkSize(rozXS, rozS, rozM, rozL, rozXL, xsSize, sSize, mSize, lSize, xlSize);
            }
            // eveniment pentru butonul pentru culoarea roz
            pink.addEventListener('click', () => {
                pink.style.border = "1px solid black";
                black.style.border = "none";
                white.style.border = "none";
                blue.style.border = "none";
                red.style.border = "none";
                green.style.border = "none";
                purple.style.border = "none";
                beige.style.border = "none";

                td2.src = imagePink1;
                td2i.src = imagePink2;
                $('#divImg').load(document.URL +  '  #divImg');
                // verificarea marimilor pentru poza afisata
                checkSize(rozXS, rozS, rozM, rozL, rozXL, xsSize, sSize, mSize, lSize, xlSize);
            })
        }
    })


    // EVENIMENT PENTRU STERGEREA PRODUSELOR DE CATRE UTILIZATORUL CU ROL DE ADMIN
    btnDelete.addEventListener('click', () => {
        console.log("delete");
        let confirmRemove = confirm("Sunteti sigur ca doriti sa stergeti acest produs definitiv?");
        if(confirmRemove){
            
            remove(child(dbRef, "Produse/" + key))
            .then(() => {
                alert("Produsul a fost sters din baza de date!");
                $('#divBody').load(document.URL +  '  #divBody');
                GetAllData();
            })
            .catch((error) => {
                alert("Eroare: " + error);
            })

            get(child(dbRef, "Conturi/")).then((snapshot) =>{
                let conturi = snapshot.val();
                console.log("Conturile tuturor ", conturi);
                snapshot.forEach(cont => {
                    let cos = cont.val().CosCumparaturi;
                    console.log("Cosuri ", cos);
                    if(cos){
                        console.log(Object.keys(cos));
                        Object.keys(cos).forEach(item => {
                            if(item === key){
                                console.log("item", item);
                                console.log("path", "Conturi/" + cont.key + "/CosCumparaturi" + "/" + item);
                                remove(child(dbRef, "Conturi/" + cont.key + "/CosCumparaturi" + "/" + item))
                                .then(() => {
                                    alert("Produsul a fost sters din baza de date!");
                                    $('#divBody').load(document.URL +  '  #divBody');
                                    GetAllData();
                                })
                                .catch((error) => {
                                    alert("Eroare: " + error);
                                })
                            }
                        })
                    }
                })
            })
        }
    });

    var btnAdd = document.getElementById("btnAdd");
    var btnSave = document.getElementById("btnSave");
    var categorie = document.getElementById("categorieProd");
    var marca = document.getElementById("brandProd");
    var nume = document.getElementById("nameProd");
    var pretA = document.getElementById("pretProd");
    var reducere = document.getElementById("reducereProd");
    var detaliiStil = document.getElementById("stil");
    var detaliiMaterial = document.getElementById("material");
    var detaliiCompozitie = document.getElementById("compozitie");

    // VARIABILE PENTRU CULORI
    //PRODUSE DE CULOARE NEAGRA
    var xsNegru = document.getElementById("nrProdXS-negru");
    var sNegru = document.getElementById("nrProdS-negru");
    var mNegru = document.getElementById("nrProdM-negru");
    var lNegru = document.getElementById("nrProdL-negru");
    var xlNegru = document.getElementById("nrProdXL-negru");
    // PRODUSE DE CULOARE ALBA
    var xsAlb = document.getElementById("nrProdXS-alb");
    var sAlb = document.getElementById("nrProdS-alb");
    var mAlb = document.getElementById("nrProdM-alb");
    var lAlb = document.getElementById("nrProdL-alb");
    var xlAlb = document.getElementById("nrProdXL-alb");


    var keyEdit;
    // EVENIMENT PENTRU EDITAREA PRODUSELOR DE CATRE UTILIZATORUL CU ROL DE ADMIN
    btnEdit.addEventListener('click', () => {
        btnSave.disabled = false;
        btnAdd.disabled = true;

        // BUTOANE RADIO PENTRU ALEGEREA POZELOR CE NU VOR MAI FI AFISATE 
        let optBlack = document.getElementById("optBlack");
        let optWhite = document.getElementById("optWhite");
        let optBlue = document.getElementById("optBlue");
        let optRed = document.getElementById("optRed");
        let optGreen = document.getElementById("optGreen");
        let optPurple = document.getElementById("optPurple");
        let optBeige = document.getElementById("optBeige");
        let optPink = document.getElementById("optPink");

        optBlack.style.display = "none";
        optWhite.style.display = "none";
        optBlue.style.display = "none";
        optRed.style.display = "none";
        optGreen.style.display = "none";
        optPurple.style.display = "none";
        optBeige.style.display = "none";
        optPink.style.display = "none";

        // CONDITIE PENTRU ACCEPTAREA PROCESULUI DE EDITARE
        let confirmEdit = confirm("Sunteti sigur ca doriti sa editati acest produs?");
        if(confirmEdit){
            if(key)
                keyEdit = key;

            console.log("KEY ===== " + key);
            get(child(dbRef, "Produse/" + key)).then((snapshot) =>{
                if(snapshot.exists()){
                    let category = snapshot.val().Categorie;
                    let brand = snapshot.val().Brand;
                    let name = snapshot.val().Nume;
                    let price = snapshot.val().Pret;
                    let discount = snapshot.val().Reducere;
                    let material = snapshot.val().Detalii.Material;
                    let stil = snapshot.val().Detalii.Stil;
                    let compozitie = snapshot.val().Detalii.Compozitie;

                    console.log("CATEGORY/BRAND/NAME/PRICE/DISCOUNT: ");
                    console.log(category + "/" + brand + "/" + name + "/" + price + "/" + discount);
                    
                    categorie.value = category.toLowerCase();
                    marca.value = brand.toLowerCase();
                    nume.value = name;
                    pretA.value = price;
                    reducere.value = discount;
                    detaliiStil.value = stil;
                    detaliiCompozitie.value = compozitie;
                    detaliiMaterial.value = material;

                    console.log("CATEGORIE/MARCA/NUME/PRET/REDUCERE: ");
                    console.log(categorie.value + "/" + marca.value + "/" + nume.value + "/" + pretA.value + "/" + reducere.value);
                
                    // SECTIUNEA DE CULORI/MARIMI/POZE
                    let blackXS = snapshot.val().Culori.Negru.Marimi.xs;
                    let blackS = snapshot.val().Culori.Negru.Marimi.s;
                    let blackM = snapshot.val().Culori.Negru.Marimi.m;
                    let blackL = snapshot.val().Culori.Negru.Marimi.l;
                    let blackXL = snapshot.val().Culori.Negru.Marimi.xl;
                    
                    xsNegru.value = blackXS;
                    sNegru.value = blackS;
                    mNegru.value = blackM;
                    lNegru.value = blackL;
                    xlNegru.value = blackXL;

                    let albXS = snapshot.val().Culori.Alb.Marimi.xs;
                    let albS = snapshot.val().Culori.Alb.Marimi.s;
                    let albM = snapshot.val().Culori.Alb.Marimi.m;
                    let albL = snapshot.val().Culori.Alb.Marimi.l;
                    let albXL = snapshot.val().Culori.Alb.Marimi.xl;

                    xsAlb.value = albXS;
                    sAlb.value = albS;
                    mAlb.value = albM;
                    lAlb.value = albL;
                    xlAlb.value = albXL;

                    console.log("SALB VALUE === " +  sAlb.value);
                }
            })
        }
    });

    // EVENIMENT PENTRU SALVAREA MODIFICARILOR
    btnSave.addEventListener('click', () => {
        
        var reducerePr;
        var pretNou;
        if(reducere.value != 0 ){
            reducerePr =  parseFloat(reducere.value/100*pretA.value).toFixed(2);
            pretNou = pretA.value - reducerePr;
        }else{
            pretNou = 0;
        }
        
        var categorieVal = categorie.options[categorie.selectedIndex].text;
        var marcaVal = marca.options[marca.selectedIndex].text;
        console.log("");
        console.log("CHEIA PRODUSULUI >>> ", keyEdit);
        console.log("");
        if(keyEdit){
            update(child(dbRef, "Produse/" + keyEdit),{
                Categorie: categorieVal,
                Brand: marcaVal,
                Nume: nume.value,
                Pret: pretA.value,
                Reducere: reducere.value,
                PretRedus: pretNou
            })
            .then(() => {
                console.log("MODIFICARILE AU FOST SALVATE");
                window.location.reload(true);
            })
            .catch((error) => {
                console.log(error);
            })
           
            update(child(dbRef, "Produse/" + keyEdit + "/" + "Detalii"), {
                Material: detaliiMaterial.value,
                Compozitie: detaliiCompozitie.value,
                Stil: detaliiStil.value
            }) 
            .then(() => {
                console.log("MODIFICARILE AU FOST SALVATE");
                window.location.reload(true);
            })
            .catch((error) => {
                console.log(error);
            }) 
        }
         
    });

    // "Culori": {
    //             "Negru": {
    //                 "Marimi": {
    //                     "xs": xsNegru.value,
    //                     "s": sNegru.value,
    //                     "m": mNegru.value,
    //                     "l": lNegru.value, 
    //                     "xl": xlNegru.value
    //                 }
    //             },
    //             "Alb": {
    //                 "Marimi": {
    //                     "xs": xsAlb.value,
    //                     "s": sAlb.value,
    //                     "m": mAlb.value,
    //                     "l": lAlb.value, 
    //                     "xl": xlAlb.value
    //                 }
    //             }
    //         }
    
    
    prodMap.set(td1.id, key);
    console.log("ProdMap:"); 
    console.log(prodMap);
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

            console.log("Lista de utilizatori cu produs favorit:");
            console.log(allFavorite);
            console.log("Size allfavorite", allFavorite.size);


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
            

            console.log("UID-ul curent:");
            console.log(uid);

            console.log("Lista inainte de stergere", favoriteBy);

            let updatedList = favoriteBy.filter(item => {
                return item !== uid;
            });

            console.log("Lista de utilizatori cu produs favorit dupa stergere:");
            console.log(updatedList);
            console.log("upd ", updatedList.length);
            
            // ADD NR RECOMANDARE
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
    
    var cos = document.getElementById("cos" + count);
    // EVENIMENT PENTRU ADAUGAREA PRODUSELOR IN COSUL DE CUMPARATURI
    cos.addEventListener('click', () => {
        console.log("KEY COS === " + key)
        goToDetails(imagine1, imagine2, key);
    })
    
    count ++;

    if(favoriteBy && favoriteBy.includes(uid)){
        console.log("loveOn--------------------");
        td1.children[0].classList.remove("inactiveHeart");
        td1.children[0].classList.add("activeHeart");
    }else{
        console.log("loveOff--------------------");
        td1.children[0].classList.remove("activeHeart");
        td1.children[0].classList.add("inactiveHeart");
    }
}

let lstTotala = [];
function AddAllItems(Produse){
    divBody.innerHTML = "";
    Produse.forEach(element => {
        console.log("Cheia produsului adaugat:");
        console.log(element.key);
        console.log("FavoriteBy:");
        console.log(element.val().FavoriteBy);
        
        
        AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
       
        lstTotala.push(element.key);
        console.log("LISTA TOTALA DE PRODUSE == ", lstTotala);
        
    })
}


function GetAllData(){
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
            lstTotala = [];
            AddAllItems(prod);
        }else{
            document.getElementById("mesaj").innerHTML = "NU EXISTA PRODUSE IN STOC!";
            document.getElementById("mesaj").className = "showMessage";

            // DISPONIBILITATE
            document.getElementById("checkStoc").disabled = true;
            document.getElementById("checkPromotii").disabled = true;
            document.getElementById("checkAll").disabled = true;

            // SORTARE - PRET/REDUCERE
            document.getElementById("listCrescator").disabled = true;
            document.getElementById("listDescrescator").disabled = true;

            // BRAND-uri
            document.getElementById("listBershka").disabled = true;
            document.getElementById("listZara").disabled = true;
            document.getElementById("listBrAll").disabled = true;

            // CATEGORII
            document.getElementById("listRochii").disabled = true;
            document.getElementById("listBluze").disabled = true;
            document.getElementById("listCatAll").disabled = true;
        }
    })
    .catch((error) => {
        console.log("Mesaj eroare " + error);
    })
}
window.onload = GetAllData;

function searchKeyWord(childSnapshot, input){
    let nume = childSnapshot.val().Nume;
    let words = nume.split(" ");
    console.log("Nume - ", words);

    for(let word of words){
        if(word.toLowerCase() === input.toLowerCase()){
            return childSnapshot;
        }
    }
}

var bntSearch = document.getElementById("btnSearch");
function SearchData(){
    let inputText = document.getElementById("searchText").value;
    
    get(ref(db, "Produse"))
    .then((snapshot) => {
        var prod = [];
        snapshot.forEach(childSnapshot => {
            console.log("Child -> id-urile produselor:");
            console.log(childSnapshot.key);
            let filterProduct = searchKeyWord(childSnapshot, inputText);
            if(filterProduct)
                prod.push(filterProduct);
        });
        
        if(snapshot.exists()){
            lstTotala = [];
            AddAllItems(prod);
        }
    })
}

// EVENIMENT PENTRU BUTONUL DE CAUTARE
bntSearch.addEventListener('click', () => {
    SearchData();
})


// EVENIMENT PENTRU BUTONUL DE VIZUALIZARE COMENZI PLASATE
btnOrders.addEventListener('click', () => {

    let keyOrder;

    let clientName;
    let clientAddress;
    let clientCity;
    let clientCounty;
    let clientZip;
    let clientPhone;
    let clientMail;

    let prodName;
    let prodBrand;
    let prodSize;
    let prodColor;
    let prodPrice;
    let prodSales;
    let prodQty;
    let prodSubtotal;

    let data;
    let ora;
    let plata;
    let status;
    let expediere;
    let taxa;
    let subPlata;
    let total;
    let anulare;
    let plasare;

    let viewOrders;

    console.log("blaaa");
    get(child(dbRef, "Comenzi/")).then((snapshot) => {
        
        snapshot.forEach(childObj => {
            keyOrder = childObj.key;

            viewOrders = document.getElementById("tabel");
            let div = document.createElement('div');
                div.id = "comanda" + keyOrder;
                div.className = "test";
                // div.className = "dropdown-check-list";
            let span = document.createElement('span');
                span.className = "dropDown";
                span.innerHTML = "Comanda" + keyOrder;
            div.appendChild(span);

            let tableClient = document.createElement('table');
                tableClient.className = "propTable";
            let tbody = document.createElement('tbody');
            let th = document.createElement('thead');
            let tr = document.createElement('tr');
            let tdKey = document.createElement('td');
            let tdName = document.createElement('td');
            let tdMail = document.createElement('td');
            let tdPhone = document.createElement('td');
            let tdAddress = document.createElement('td');
            let tdCity = document.createElement('td');
            let tdCounty = document.createElement('td');
            let tdZip = document.createElement('td');

            tdKey.innerHTML = "Cod Comanda";
            tdName.innerHTML = "Nume";
            tdMail.innerHTML = "Mail";
            tdPhone.innerHTML = "Telefon";
            tdAddress.innerHTML = "Adresa";
            tdCity.innerHTML = "Oras";
            tdCounty.innerHTML = "Judet";
            tdZip.innerHTML = "Cod postal";
            
            tr.appendChild(tdKey);
            tr.appendChild(tdName);
            tr.appendChild(tdMail);
            tr.appendChild(tdPhone);
            tr.appendChild(tdAddress);
            tr.appendChild(tdCity);
            tr.appendChild(tdCounty);
            tr.appendChild(tdZip);

            th.appendChild(tr);
            
            

            let trClients = document.createElement('tr');
            let tdSpace = document.createElement('td');
            let tdCName = document.createElement('td');
            let tdCMail = document.createElement('td');
            let tdCPhone = document.createElement('td');
            let tdCAddress = document.createElement('td');
            let tdCCity = document.createElement('td');
            let tdCCounty = document.createElement('td');
            let tdCZip = document.createElement('td');
            
            // datele clientilor care au plasat o comanda
            clientName = childObj.val().Client.Nume;
            clientMail = childObj.val().Client.Mail;
            clientPhone = childObj.val().Client.Telefon;
            clientAddress = childObj.val().Client.Adresa;
            clientCity = childObj.val().Client.Oras;
            clientCounty = childObj.val().Client.Judet;
            clientZip = childObj.val().Client.CodPostal;
           
            // setarea datelor tabelului
            tdSpace.innerHTML = keyOrder;
            tdCName.innerHTML = clientName;
            tdCMail.innerHTML = clientMail;
            tdCPhone.innerHTML = clientPhone;
            tdCAddress.innerHTML = clientAddress;
            tdCCity.innerHTML = clientCity;
            tdCCounty.innerHTML = clientCounty;
            tdCZip.innerHTML = clientZip;

            // popularea randurilor
            trClients.appendChild(tdSpace);
            trClients.appendChild(tdCName);
            trClients.appendChild(tdCMail);
            trClients.appendChild(tdCPhone);
            trClients.appendChild(tdCAddress);
            trClients.appendChild(tdCCity);
            trClients.appendChild(tdCCounty);
            trClients.appendChild(tdCZip);

            tbody.appendChild(trClients);
       
            tableClient.appendChild(th);
            tableClient.appendChild(tbody);

            div.appendChild(tableClient);
            // viewOrders.appendChild(tableClient);
           

            // lista totala de produse comandate
            let prod = childObj.val().Produse;
            console.log(prod);

            let tableProd = document.createElement('table');
                tableProd.className = "propTable";
            let thProd = document.createElement('thead');
            let tbodyProd = document.createElement('tbody');
            let trThProd = document.createElement('tr');
            let tdThName = document.createElement('td');
            let tdThBrand = document.createElement('td');
            let tdThSize = document.createElement('td');
            let tdThColor = document.createElement('td');
            let tdThPrice = document.createElement('td');
            let tdThSales = document.createElement('td');
            let tdThQty = document.createElement('td');
            let tdThSubtotal = document.createElement('td');

            // setarea datelor tabelului
            tdThName.innerHTML = "Nume produs";
            tdThBrand.innerHTML = "Brand";
            tdThSize.innerHTML = "Marime";
            tdThColor.innerHTML = "Culoare";
            tdThPrice.innerHTML = "Pret";
            tdThSales.innerHTML = "Pret Redus";
            tdThQty.innerHTML = "Cantitate";
            tdThSubtotal.innerHTML = "Subtotal";

            trThProd.appendChild(tdThName);
            trThProd.appendChild(tdThBrand);
            trThProd.appendChild(tdThSize);
            trThProd.appendChild(tdThColor);
            trThProd.appendChild(tdThPrice);
            trThProd.appendChild(tdThSales);
            trThProd.appendChild(tdThQty);
            trThProd.appendChild(tdThSubtotal);

            thProd.appendChild(trThProd);

            // parcurgerea listei de produse comandate
            for(const element of prod){
                
                let trProd = document.createElement('tr');
                let tdPName = document.createElement('td');
                let tdPBrand = document.createElement('td');
                let tdPSize = document.createElement('td');
                let tdPColor = document.createElement('td');
                let tdPPrice = document.createElement('td');
                let tdPSales = document.createElement('td');
                let tdPQty = document.createElement('td');
                let tdPSubtotal = document.createElement('td');

                prodName = element['nume'];
                prodBrand = element['brand'];
                prodSize = element['marime'];
                prodColor = element['culoare'];
                prodPrice = element['pret'];
                prodSales = element['pretRedus'];
                prodQty = element['cantitate'];
                prodSubtotal = element['subtotal'];

                // setarea datelor tabelului
                tdPName.innerHTML = prodName;
                tdPBrand.innerHTML = prodBrand;
                tdPSize.innerHTML = prodSize;
                tdPColor.innerHTML = prodColor;
                tdPPrice.innerHTML = prodPrice;
                tdPSales.innerHTML = prodSales;
                tdPQty.innerHTML = prodQty;
                tdPSubtotal.innerHTML = prodSubtotal;

                // popularea randurilor
                trProd.appendChild(tdPName);
                trProd.appendChild(tdPBrand);
                trProd.appendChild(tdPSize);
                trProd.appendChild(tdPColor);
                trProd.appendChild(tdPPrice);
                trProd.appendChild(tdPSales);
                trProd.appendChild(tdPQty);
                trProd.appendChild(tdPSubtotal);

                tbodyProd.appendChild(trProd);

                tableProd.appendChild(thProd);
                tableProd.appendChild(tbodyProd);

                div.appendChild(tableProd);
                // viewOrders.appendChild(tableProd);
            }


            let tableDetails = document.createElement('table');
                tableDetails.className = "propTable";
            let theadDetails = document.createElement('thead');
            let tbodyDetails = document.createElement('tbody');

            let tr_headDetails = document.createElement('tr');

            let td_headData = document.createElement('td');
            let td_headStatus = document.createElement('td');
            let td_headExpediere = document.createElement('td');
            let td_headSubPlata = document.createElement('td');
            let td_headTotal = document.createElement('td');
            let td_headAnulare = document.createElement('td');
            let td_headPlasare = document.createElement('td');
            

            td_headData.innerHTML = "Data/Ora";
            td_headStatus.innerHTML = "Status plata";
            td_headExpediere.innerHTML = "Taxa transport";
            td_headSubPlata.innerHTML = "Subplata";
            td_headTotal.innerHTML = "Total";
            td_headAnulare.innerHTML = "Anulare";
            td_headPlasare.innerHTML = "Expediere";

            tr_headDetails.appendChild(td_headData);
            tr_headDetails.appendChild(td_headStatus);
            tr_headDetails.appendChild(td_headExpediere);
            tr_headDetails.appendChild(td_headSubPlata);
            tr_headDetails.appendChild(td_headTotal);
            tr_headDetails.appendChild(td_headAnulare);
            tr_headDetails.appendChild(td_headPlasare);

            theadDetails.appendChild(tr_headDetails);
            
        
            
            let trDetails = document.createElement('tr');
            let tdData = document.createElement('td');
            let tdStatus = document.createElement('td');
            let tdExpediere = document.createElement('td');
            let tdSubPlata = document.createElement('td');
            let tdTotal = document.createElement('td');
            let tdAnulare = document.createElement('td');
            let tdPlasare = document.createElement('td');

            // datele clientilor care au plasat o comanda
            data = childObj.val().Detalii.Data;
            ora = childObj.val().Detalii.Ora;
            plata = childObj.val().Detalii.Plata;
            status = childObj.val().Detalii.StatusPlata;
            expediere = childObj.val().Detalii.MetodaExpediere;
            taxa = childObj.val().Detalii.TaxaTransport;
            subPlata = childObj.val().Detalii.SubPlata;
            total = childObj.val().Detalii.Total;
            anulare = "btnAnulare";
            plasare = "btnPlasare";
        
            // setarea datelor tabelului
            tdData.innerHTML = data + " / " + ora;
            tdStatus.innerHTML = status + " / " + plata;
            tdExpediere.innerHTML = expediere + " / " + taxa + " lei";
            tdSubPlata.innerHTML = subPlata;
            tdTotal.innerHTML = total;
            tdAnulare.innerHTML = anulare;
            tdPlasare.innerHTML = plasare;

            // popularea randurilor
            trDetails.appendChild(tdData);
            trDetails.appendChild(tdStatus);
            trDetails.appendChild(tdExpediere);
            trDetails.appendChild(tdSubPlata);
            trDetails.appendChild(tdTotal);
            trDetails.appendChild(tdAnulare);
            trDetails.appendChild(tdPlasare);

            tbodyDetails.appendChild(trDetails);

            tableDetails.appendChild(theadDetails);
            tableDetails.appendChild(tbodyDetails);

            div.appendChild(tableDetails);
            // viewOrders.appendChild(tableDetails);

            viewOrders.appendChild(div);


            div.getElementsByClassName('dropDown')[0].onclick = function(evt) {
                console.log("blslf");
                if (div.classList.contains('visible'))
                    div.classList.remove('visible');
                else
                    div.classList.add('visible');
            }
        })
        
    })
    
})
