// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {getDatabase, ref, set, get, child, update, push} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"

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
var color = "";
var model = "";
var size = "";
var maximStoc;
// FUNCTIE PENTRU VERIFICAREA MARIMILOR CORESPONDENTE CULORILOR
function checkSize(xsColor, sColor, mColor, lColor, xlColor, xsSize, sSize, mSize, lSize, xlSize){
    
    if(xsColor != 0){
        xsSize.className = "sizeChangeXS";
        xsSize.style.visibility = "visible";
        xsSize.style.float = "left";
    }else{
        xsSize.style.visibility = "hidden";
        xsSize.style.float = "right";
    }
    if(sColor != 0){
        sSize.className = "sizeChangeS";
        sSize.style.visibility = "visible";
        sSize.style.float = "left";
    }else{
        sSize.style.visibility = "hidden";
        sSize.style.float = "right";
    }
    if(mColor != 0){
        mSize.className = "sizeChangeM";
        mSize.style.visibility = "visible";
        mSize.style.float = "left";
    }else{
        mSize.style.visibility = "hidden";
        mSize.style.float = "right";
    }
    if(lColor != 0){
        lSize.className = "sizeChangeL";
        lSize.style.visibility = "visible";
        lSize.style.float = "left";
    }else{
        lSize.style.visibility = "hidden";
        lSize.style.float = "right";
    }
    if(xlColor != 0){
        xlSize.className = "sizeChangeXL";
        xlSize.style.visibility = "visible";
        xlSize.style.float = "left";
    }else{
        xlSize.style.visibility = "hidden";
        xlSize.style.float = "right";
    }
    
    let nrProd =  document.getElementById("nrDetails");
    get(child(dbRef, "Produse/" + keyProd)).then((snapshot) => {
    xsSize.addEventListener('click', () => {
        size = "XS";
        nrProd.value = 1;
        if(model == snapshot.val().Culori.Negru.PozaCuloare){
            color = "Negru";
            maximStoc = snapshot.val().Culori.Negru.Marimi.xs;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Alb.PozaCuloare){
            color = "Alb";
            maximStoc = snapshot.val().Culori.Alb.Marimi.xs;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Albastru.PozaCuloare){
            color = "Albastru";
            maximStoc = snapshot.val().Culori.Albastru.Marimi.xs;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Rosu.PozaCuloare){
            color = "Rosu";
            maximStoc = snapshot.val().Culori.Rosu.Marimi.xs;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Verde.PozaCuloare){
            color = "Verde";
            maximStoc = snapshot.val().Culori.Verde.Marimi.xs;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Mov.PozaCuloare){
            color = "Mov";
            maximStoc = snapshot.val().Culori.Mov.Marimi.xs;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Bej.PozaCuloare){
            color = "Bej";
            maximStoc = snapshot.val().Culori.Bej.Marimi.xs;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Roz.PozaCuloare){
            color = "Roz";
            maximStoc = snapshot.val().Culori.Roz.Marimi.xs;
            nrProd.setAttribute("max", maximStoc);
        }
        
        xsSize.style.backgroundColor = '#367976';
        xsSize.style.color = 'white';
        xsSize.style.border = "2px solid white";
        xsSize.style.outline = "2px solid black";

        sSize.style.backgroundColor = '#f8f8f8';
        mSize.style.backgroundColor = '#f8f8f8';
        lSize.style.backgroundColor = '#f8f8f8';
        xlSize.style.backgroundColor = '#f8f8f8';
         
        sSize.style.color = 'black';
        mSize.style.color = 'black';
        lSize.style.color = 'black';
        xlSize.style.color = 'black';
    })
    sSize.addEventListener('click', () => {
        size = "S";
        console.log("--- MARIMEA S ---");
        nrProd.value = 1;
        if(model == snapshot.val().Culori.Negru.PozaCuloare){
            color = "Negru";
            maximStoc = snapshot.val().Culori.Negru.Marimi.s;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Alb.PozaCuloare){
            color = "Alb";
            maximStoc = snapshot.val().Culori.Alb.Marimi.s;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Albastru.PozaCuloare){
            color = "Albastru";
            maximStoc = snapshot.val().Culori.Albastru.Marimi.s;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Rosu.PozaCuloare){
            color = "Rosu";
            maximStoc = snapshot.val().Culori.Rosu.Marimi.s;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Verde.PozaCuloare){
            color = "Verde";
            maximStoc = snapshot.val().Culori.Verde.Marimi.s;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Mov.PozaCuloare){
            color = "Mov";
            maximStoc = snapshot.val().Culori.Mov.Marimi.s;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Bej.PozaCuloare){
            color = "Bej";
            maximStoc = snapshot.val().Culori.Bej.Marimi.s;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Roz.PozaCuloare){
            color = "Roz";
            maximStoc = snapshot.val().Culori.Roz.Marimi.s;
            nrProd.setAttribute("max", maximStoc);                }

        sSize.style.backgroundColor = '#367976';
        sSize.style.color = 'white';
        sSize.style.border = "2px solid white";
        sSize.style.outline = "2px solid black";

        xsSize.style.backgroundColor = '#f8f8f8';
        mSize.style.backgroundColor = '#f8f8f8';
        lSize.style.backgroundColor = '#f8f8f8';
        xlSize.style.backgroundColor = '#f8f8f8';

        xsSize.style.color = 'black';
        mSize.style.color = 'black';
        lSize.style.color = 'black';
        xlSize.style.color = 'black';
    })
    mSize.addEventListener('click', () => {
        size = "M";
        nrProd.value = 1;
        if(model == snapshot.val().Culori.Negru.PozaCuloare){
            color = "Negru";
            maximStoc = snapshot.val().Culori.Negru.Marimi.m;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Alb.PozaCuloare){
            color = "Alb";
            maximStoc = snapshot.val().Culori.Alb.Marimi.m;
            nrProd.setAttribute("max", maximStoc);                
        }else if(snapshot.val().Culori.Albastru.PozaCuloare){
            color = "Albastru";
            maximStoc = snapshot.val().Culori.Albastru.Marimi.m;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Rosu.PozaCuloare){
            color = "Rosu";
            maximStoc = snapshot.val().Culori.Rosu.Marimi.m;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Verde.PozaCuloare){
            color = "Verde";
            maximStoc = snapshot.val().Culori.Verde.Marimi.m;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Mov.PozaCuloare){
            color = "Mov";
            maximStoc = snapshot.val().Culori.Mov.Marimi.m;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Bej.PozaCuloare){
            color = "Bej";
            maximStoc = snapshot.val().Culori.Bej.Marimi.m;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Roz.PozaCuloare){
            color = "Roz";
            maximStoc = snapshot.val().Culori.Roz.Marimi.m;
            nrProd.setAttribute("max", maximStoc);
        }

        mSize.style.backgroundColor = '#367976';
        mSize.style.color = 'white';
        mSize.style.border = "2px solid white";
        mSize.style.outline = "2px solid black";

        xsSize.style.backgroundColor = '#f8f8f8';
        sSize.style.backgroundColor = '#f8f8f8';
        lSize.style.backgroundColor = '#f8f8f8';
        xlSize.style.backgroundColor = '#f8f8f8';
         
        xsSize.style.color = 'black';
        sSize.style.color = 'black';
        lSize.style.color = 'black';
        xlSize.style.color = 'black';
    })
    lSize.addEventListener('click', () => {
        size = "L";
        nrProd.value = 1;
        if(model == snapshot.val().Culori.Negru.PozaCuloare){
            color = "Negru";
            maximStoc = snapshot.val().Culori.Negru.Marimi.l;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Alb.PozaCuloare){
            color = "Alb";
            maximStoc = snapshot.val().Culori.Alb.Marimi.l;
            nrProd.setAttribute("max", maximStoc);                
        }else if(snapshot.val().Culori.Albastru.PozaCuloare){
            color = "Albastru";
            maximStoc = snapshot.val().Culori.Albastru.Marimi.l;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Rosu.PozaCuloare){
            color = "Rosu";
            maximStoc = snapshot.val().Culori.Rosu.Marimi.l;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Verde.PozaCuloare){
            color = "Verde";
            maximStoc = snapshot.val().Culori.Verde.Marimi.l;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Mov.PozaCuloare){
            color = "Mov";
            maximStoc = snapshot.val().Culori.Mov.Marimi.l;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Bej.PozaCuloare){
            color = "Bej";
            maximStoc = snapshot.val().Culori.Bej.Marimi.l;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Roz.PozaCuloare){
            color = "Roz";
            maximStoc = snapshot.val().Culori.Roz.Marimi.l;
            nrProd.setAttribute("max", maximStoc);
        }

        lSize.style.backgroundColor = '#367976';
        lSize.style.color = 'white';
        lSize.style.border = "2px solid white";
        lSize.style.outline = "2px solid black";

        xsSize.style.backgroundColor = '#f8f8f8';
        sSize.style.backgroundColor = '#f8f8f8';
        mSize.style.backgroundColor = '#f8f8f8';
        xlSize.style.backgroundColor = '#f8f8f8';
         
        xsSize.style.color = 'black';
        sSize.style.color = 'black';
        mSize.style.color = 'black';
        xlSize.style.color = 'black';
    })
    xlSize.addEventListener('click', () => {
        size = "XL";
        nrProd.value = 1;
        if(model == snapshot.val().Culori.Negru.PozaCuloare){
            color = "Negru";
            maximStoc = snapshot.val().Culori.Negru.Marimi.xl;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Alb.PozaCuloare){
            color = "Alb";
            maximStoc = snapshot.val().Culori.Alb.Marimi.xl;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Albastru.PozaCuloare){
            color = "Albastru";
            maximStoc = snapshot.val().Culori.Albastru.Marimi.xl;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Rosu.PozaCuloare){
            color = "Rosu";
            maximStoc = snapshot.val().Culori.Rosu.Marimi.xl;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Verde.PozaCuloare){
            color = "Verde";
            maximStoc = snapshot.val().Culori.Verde.Marimi.xl;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Mov.PozaCuloare){
            color = "Mov";
            maximStoc = snapshot.val().Culori.Mov.Marimi.xl;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Bej.PozaCuloare){
            color = "Bej";
            maximStoc = snapshot.val().Culori.Bej.Marimi.xl;
            nrProd.setAttribute("max", maximStoc);
        }else if(snapshot.val().Culori.Roz.PozaCuloare){
            color = "Roz";
            maximStoc = snapshot.val().Culori.Roz.Marimi.xl;
            nrProd.setAttribute("max", maximStoc);
        }

        xlSize.style.backgroundColor = '#367976';
        xlSize.style.color = 'white';
        xlSize.style.border = "2px solid white";
        xlSize.style.outline = "2px solid black";

        xsSize.style.backgroundColor = '#f8f8f8';
        sSize.style.backgroundColor = '#f8f8f8';
        mSize.style.backgroundColor = '#f8f8f8';
        lSize.style.backgroundColor = '#f8f8f8';
         
        xsSize.style.color = 'black';
        sSize.style.color = 'black';
        mSize.style.color = 'black';
        lSize.style.color = 'black';
    })
})
}

var divDetails = document.getElementById('productDetails');
var keyProd = sessionStorage.getItem("keyProd");
get(child(dbRef, "Produse/" + keyProd)).then((snapshot) => {
    if(snapshot.exists()){

        // AFISARE DETALII PRODUS
        let textH4 = document.createElement('h4');
        textH4.innerHTML = "Detalii produs";
        let span1 = document.createElement('span');
            span1.id = "caract";
        let span2 = document.createElement('span');
            span2.id = "comp";
        let bold1 = document.createElement('b');
        let bold2 = document.createElement('b');

        let paragraf1 = document.createElement('p');
        let paragraf2 = document.createElement('p');

        bold1.innerHTML = 'Caracteristici:';
        paragraf1.innerHTML = '-' + snapshot.val().Detalii.Material + '<br>' + '-' + snapshot.val().Detalii.Stil;
        bold2.innerHTML = "Compozitie:";
        paragraf2.innerHTML = '-' + snapshot.val().Detalii.Compozitie;

        span1.appendChild(bold1);
        span1.appendChild(paragraf1);
        span2.appendChild(bold2);
        span2.appendChild(paragraf2);

        divDetails.appendChild(textH4);
        divDetails.appendChild(span1);
        divDetails.appendChild(span2);



        var brand = document.getElementById("brandDetails");
            brand.innerText = snapshot.val().Brand;
        var name = document.getElementById("nameDetails");
            name.innerText = snapshot.val().Nume;
        
        // AFISAREA BUTOANELOR CORESPONDENTE CULORILOR EXISTENTE
            // BLACK 
            var negru1 = snapshot.val().Culori.Negru.PozaFata;
            var negru2 = snapshot.val().Culori.Negru.PozaSpate;
            var imgBlack = snapshot.val().Culori.Negru.PozaCuloare;
            if(negru1.length != 0 || negru2.length != 0){
                blackColor.className = "colorChangeD";
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
                whiteColor.className = "colorChangeD";
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
                blueColor.className = "colorChangeD";
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
                redColor.className = "colorChangeD";
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
                greenColor.className = "colorChangeD";
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
                purpleColor.className = "colorChangeD";
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
                beigeColor.className = "colorChangeD";
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
                pinkColor.className = "colorChangeD";
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
                xsSize.className = "sizeChangeXS";
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
                sSize.className = "sizeChangeS";
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
                mSize.className = "sizeChangeM";
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
                lSize.className = "sizeChangeL";
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
                xlSize.className = "sizeChangeXL";
                xlSize.style.visibility = "visible";
            }else{
                xlSize.style.visibility = "hidden";
            }

            // EVENIMENT PENTRU BUTOANELE CORESPUNZATOARE CULORILOR
            // MODIFICAREA IMAGINILOR IN FUNCTIE DE CULOAREA SELECTATA

            var image1 = snapshot.val().Poza;
            var image2 = snapshot.val().Poza2;
            var mainImg = document.getElementById("mainImg");
            var secondaryImg = document.getElementById("secondaryImg");
        // BLACK
            // imagini
            var imageBlack1 = snapshot.val().Culori.Negru.PozaFata;
            var imageBlack2 = snapshot.val().Culori.Negru.PozaSpate;
            var imageBlack = snapshot.val().Culori.Negru.PozaCuloare;
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
            var black = document.getElementById("blackColor");
            black.addEventListener('click', () => {
                mainImg.src = imageBlack1;
                secondaryImg.src = imageBlack2;
                model = imageBlack;

                black.style.border = "2px solid white";
                black.style.outline = "2px solid black";

                white.style.border = "2px solid black";
                white.style.outline = "none";

                blue.style.border = "2px solid black";
                blue.style.outline = "none";

                red.style.border = "2px solid black";
                red.style.outline = "none";

                green.style.border = "2px solid black";
                green.style.outline = "none";

                purple.style.border = "2px solid black";
                purple.style.outline = "none";

                beige.style.border = "2px solid black";
                beige.style.outline = "none";

                pink.style.border = "2px solid black";
                pink.style.outline = "none";
                // verificarea marimilor pentru poza afisata
                checkSize(negruXS, negruS, negruM, negruL, negruXL, xsSize, sSize, mSize, lSize, xlSize)
            })

        // WHITE
            // imagini
            var imageWhite1 = snapshot.val().Culori.Alb.PozaFata;
            var imageWhite2 = snapshot.val().Culori.Alb.PozaSpate;
            var imageWhite = snapshot.val().Culori.Alb.PozaCuloare;
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
            var white = document.getElementById("whiteColor");
            white.addEventListener('click', () => {
                mainImg.src = imageWhite1;
                secondaryImg.src = imageWhite2;
                model = imageWhite;

                white.style.border = "2px solid white";
                white.style.outline = "2px solid black";

                black.style.border = "2px solid black";
                black.style.outline = "none";

                blue.style.border = "2px solid black";
                blue.style.outline = "none";

                red.style.border = "2px solid black";
                red.style.outline = "none";

                green.style.border = "2px solid black";
                green.style.outline = "none";

                purple.style.border = "2px solid black";
                purple.style.outline = "none";

                beige.style.border = "2px solid black";
                beige.style.outline = "none";

                pink.style.border = "2px solid black";
                pink.style.outline = "none";
                // verificarea marimilor pentru poza afisata
                checkSize(albXS, albS, albM, albL, albXL, xsSize, sSize, mSize, lSize, xlSize);
            })

        // BLUE
            // imagini
            var imageBlue1 = snapshot.val().Culori.Albastru.PozaFata;
            var imageBlue2 = snapshot.val().Culori.Albastru.PozaSpate;
            var imageBlue = snapshot.val().Culori.Albastru.PozaCuloare;
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
            var blue = document.getElementById("blueColor");
            blue.addEventListener('click', () => {
                mainImg.src = imageBlue1;
                secondaryImg.src = imageBlue2;
                model = imageBlue;

                blue.style.border = "2px solid white";
                blue.style.outline = "2px solid black";

                black.style.border = "2px solid black";
                black.style.outline = "none";

                white.style.border = "2px solid black";
                white.style.outline = "none";

                red.style.border = "2px solid black";
                red.style.outline = "none";

                green.style.border = "2px solid black";
                green.style.outline = "none";

                purple.style.border = "2px solid black";
                purple.style.outline = "none";

                beige.style.border = "2px solid black";
                beige.style.outline = "none";

                pink.style.border = "2px solid black";
                pink.style.outline = "none";
                // verificarea marimilor pentru poza afisata
                checkSize(albastruXS, albastruS, albastruM, albastruL, albastruXL, xsSize, sSize, mSize, lSize, xlSize);
            })

        // RED
            // imagini
            var imageRed1 = snapshot.val().Culori.Rosu.PozaFata;
            var imageRed2 = snapshot.val().Culori.Rosu.PozaSpate;
            var imageRed = snapshot.val().Culori.Rosu.PozaCuloare;
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
            var red = document.getElementById("redColor");
            red.addEventListener('click', () => {
                mainImg.src = imageRed1;
                secondaryImg.src = imageRed2;
                model = imageRed;

                red.style.border = "2px solid white";
                red.style.outline = "2px solid black";

                black.style.border = "2px solid black";
                black.style.outline = "none";

                white.style.border = "2px solid black";
                white.style.outline = "none";

                blue.style.border = "2px solid black";
                blue.style.outline = "none";

                green.style.border = "2px solid black";
                green.style.outline = "none";

                purple.style.border = "2px solid black";
                purple.style.outline = "none";

                beige.style.border = "2px solid black";
                beige.style.outline = "none";

                pink.style.border = "2px solid black";
                pink.style.outline = "none";
                // verificarea marimilor pentru poza afisata
                checkSize(rosuXS, rosuS, rosuM, rosuL, rosuXL, xsSize, sSize, mSize, lSize, xlSize);
            })

        // GREEN
            // imagini
            var imageGreen1 = snapshot.val().Culori.Verde.PozaFata;
            var imageGreen2 = snapshot.val().Culori.Verde.PozaSpate;
            var imageGreen = snapshot.val().Culori.Verde.PozaCuloare;
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
            var green = document.getElementById("greenColor");
            green.addEventListener('click', () => {
                mainImg.src = imageGreen1;
                secondaryImg.src = imageGreen2;
                model = imageGreen;

                green.style.border = "2px solid white";
                green.style.outline = "2px solid black";

                black.style.border = "2px solid black";
                black.style.outline = "none";

                white.style.border = "2px solid black";
                white.style.outline = "none";

                blue.style.border = "2px solid black";
                blue.style.outline = "none";

                red.style.border = "2px solid black";
                red.style.outline = "none";

                purple.style.border = "2px solid black";
                purple.style.outline = "none";

                beige.style.border = "2px solid black";
                beige.style.outline = "none";

                pink.style.border = "2px solid black";
                pink.style.outline = "none";
                // verificarea marimilor pentru poza afisata
                checkSize(verdeXS, verdeS, verdeM, verdeL, verdeXL, xsSize, sSize, mSize, lSize, xlSize);
            })

        // PURPLE
            // imagini
            var imagePurple1 = snapshot.val().Culori.Mov.PozaFata;
            var imagePurple2 = snapshot.val().Culori.Mov.PozaSpate;
            var imagePurple = snapshot.val().Culori.Mov.PozaCuloare;
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
            var purple = document.getElementById("purpleColor");
            purple.addEventListener('click', () => {
                mainImg.src = imagePurple1;
                secondaryImg.src = imagePurple2;
                model = imagePurple;

                purple.style.border = "2px solid white";
                purple.style.outline = "2px solid black";

                black.style.border = "2px solid black";
                black.style.outline = "none";

                white.style.border = "2px solid black";
                white.style.outline = "none";

                blue.style.border = "2px solid black";
                blue.style.outline = "none";

                red.style.border = "2px solid black";
                red.style.outline = "none";

                green.style.border = "2px solid black";
                green.style.outline = "none";

                beige.style.border = "2px solid black";
                beige.style.outline = "none";

                pink.style.border = "2px solid black";
                pink.style.outline = "none";
                // verificarea marimilor pentru poza afisata
                checkSize(movXS, movS, movM, movL, movXL, xsSize, sSize, mSize, lSize, xlSize);
            })

        // BEIGE
            // imagini
            var imageBeige1 = snapshot.val().Culori.Bej.PozaFata;
            var imageBeige2 = snapshot.val().Culori.Bej.PozaSpate;
            var imageBeige = snapshot.val().Culori.Bej.PozaCuloare;
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
            var beige = document.getElementById("beigeColor");
            beige.addEventListener('click', () => {
                mainImg.src = imageBeige1;
                secondaryImg.src = imageBeige2;
                model = imageBeige;

                beige.style.border = "2px solid white";
                beige.style.outline = "2px solid black";

                black.style.border = "2px solid black";
                black.style.outline = "none";

                white.style.border = "2px solid black";
                white.style.outline = "none";

                blue.style.border = "2px solid black";
                blue.style.outline = "none";

                red.style.border = "2px solid black";
                red.style.outline = "none";

                green.style.border = "2px solid black";
                green.style.outline = "none";

                purple.style.border = "2px solid black";
                purple.style.outline = "none";

                pink.style.border = "2px solid black";
                pink.style.outline = "none";
                // verificarea marimilor pentru poza afisata
                checkSize(bejXS, bejS, bejM, bejL, bejXL, xsSize, sSize, mSize, lSize, xlSize);
            })

        // PINK
            // imagini
            var imagePink1 = snapshot.val().Culori.Roz.PozaFata;
            var imagePink2 = snapshot.val().Culori.Roz.PozaSpate;
            var imagePink = snapshot.val().Culori.Roz.PozaCuloare;
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
            var pink = document.getElementById("pinkColor");
            pink.addEventListener('click', () => {
                mainImg.src = imagePink1;
                secondaryImg.src = imagePink2;
                model = imagePink;

                pink.style.border = "2px solid white";
                pink.style.outline = "2px solid black";

                black.style.border = "2px solid black";
                black.style.outline = "none";

                white.style.border = "2px solid black";
                white.style.outline = "none";

                blue.style.border = "2px solid black";
                blue.style.outline = "none";

                red.style.border = "2px solid black";
                red.style.outline = "none";

                green.style.border = "2px solid black";
                green.style.outline = "none";

                purple.style.border = "2px solid black";
                purple.style.outline = "none";

                beige.style.border = "2px solid black";
                beige.style.outline = "none";
                // verificarea marimilor pentru poza afisata
                checkSize(rozXS, rozS, rozM, rozL, rozXL, xsSize, sSize, mSize, lSize, xlSize);
            });
        }


        var price = document.getElementById("priceDetails");
        var pret = snapshot.val().Pret;
        var reducere = snapshot.val().Reducere;
        var stoc = snapshot.val().Stoc;
        var pretRedus = snapshot.val().PretRedus;

        // APLICAREA REDUCERII
        if(stoc == "0"){
            document.getElementById("addDetails").disabled = true;

            let notify = document.createElement('button');
            notify.id = "notificareProd" + keyProd;
            notify.innerHTML = 'Click aici pentru notificare stoc';
            notify.className = "notificare";
            document.getElementById("divNotify").appendChild(notify);
            document.getElementById("nrDetails").style.pointerEvents = "none";

            let message = document.createElement('label');
            message.id = "lblIndisponibil";
            message.innerHTML = "Stoc epuizat";
            document.getElementById("sizeDetails").appendChild(message);
        }else{
            document.getElementById("addDetails").disabled = false;
        }

        function refreshPage(){
            window.location.reload(true);
        }


        function sendNotification() {
            get(child(dbRef, "Conturi/" + uid)).then((snapshot) => {
                if(snapshot.exists()){
                    let mail = snapshot.val().Mail;
                    console.log("MAIL === " + mail);
                    Email.send({
                        SecureToken : "d4e41b30-45f4-4df0-9742-b6750961dc90",
                        To : mail,
                        From : "muntyancraciunela@gmail.com",
                        Subject : "Stoc Produs" + keyProd,
                        Body : "Multumim, " + snapshot.val().Nume + " pentru ca ati ales aceasta optiune de notificare." +
                            "<br> Va vom anunta cand produsul va fi iar in stoc." + 
                            "<br><br>Cu respect,<br>Echipa MIMI"
                    })
                    .then( message => {
                        document.getElementById("lblNotify").innerHTML = "Cererea a fost trimisa cu succes. In scurt timp veti primi un mail de confirmare.";
                        document.getElementById("lblNotify").style.color = "blue";
                        console.log("MAIL UL A FOST TRM CU SUCCES");
                        console.log(message);
                        setTimeout(refreshPage, 2500);
                    });
                }
            });
        }  
        

        if(document.getElementById("notificareProd" + keyProd)){
            document.getElementById("notificareProd" + keyProd).addEventListener('click', () => {
                sendNotification();
            })
        }

        if(reducere != "0" && stoc != "0")
        {
            console.log("PRET VECHI: " + pret);

            console.log("PRET REDUS: " + pretRedus);
            
            price.innerHTML = '<del>' + pret + " lei" + '</del>' + " " + '<strong style="color:#e41616;">' + pretRedus + " lei</strong>";  
        }else{
            price.innerHTML = pret + " lei";
        }

        var marca = snapshot.val().Brand;
        var nume = snapshot.val().Nume;


        // EVENIMENT PENTRU BUTONUL DE ADAUGARE IN COSUL DE CUMPARATURI
        var error = document.getElementById("errorAdd");
        var btnAdd = document.getElementById("addDetails");
        var nr =  document.getElementById("nrDetails");
        
        
        btnAdd.addEventListener('click', () => {
            console.log("IMAGINEA PRINCIPALA === " + mainImg.src);

            if(model == ""){
                error.innerText = "Selectati culoarea dorita!";
            }else if(size == ""){
                error.innerText = "Selectati marimea dorita!";
            }else{
                error.innerText = "";
                console.log("MARIMEA SELECTATA ESTE === " + size);
                console.log("CULOAREA SELECTATA ESTE === " + model);
                

                var subtotal;
                if(pretRedus == 0){
                    subtotal = parseFloat(pret)*parseFloat(nr.value);
                    console.log("0 - - - SUBTOTAL ", subtotal);
                }else{
                    subtotal = parseFloat(pretRedus)*parseFloat(nr.value);
                    console.log("/0 - - - SUBTOTAL ", subtotal);
                }
                console.log("SUBTOTAL === " + subtotal);

 

                get(ref(db, "Conturi/" +  uid + "/CosCumparaturi/" + keyProd)).then((snapshot) =>{
                     
                    console.table(snapshot.val());
                    console.log("Key ", keyProd);
                    if(!snapshot.val()){
                        push(ref(db, "Conturi/" +  uid + "/CosCumparaturi/" + keyProd),{
                            Brand: marca,
                            Nume: nume,
                            Pret: Number(pret),
                            PretRedus: pretRedus,
                            Poza: mainImg.src,
                            Model: model,
                            Culoare: color,
                            Marime: size,
                            Cantitate: nr.value,
                            Subtotal: subtotal,
                            MaximStoc : maximStoc
                        })
                        .then(()=>{
                            console.log("!snapshot - - - ");
                            var confirmCos = confirm(" //Produsul a fost adaugat in cos. Doriti sa vizualizati cosul de cumparaturi?");
                            if(confirmCos){
                                window.location.href = "form_cart.html";
                            }
                            console.log("Cosul de cumparaturi a fost actualizat");
                        })
                        .catch((error)=>{
                            console.log(error);
                        })
                    }

                    snapshot.forEach(element => {
                        console.log("sbfhkbaskfb ", element);
                    
                        console.log("COLOR - ", element.val().Culoare + "= = =" + color);
                        console.log("SIZE - ", element.val().Marime + "= = =" + size);

                        let qty = element.val().Cantitate;
                        console.log("CANTITATE ", qty);
                        var totalQty;

                        if(element.val().Brand == marca && 
                        element.val().Nume == nume &&
                        element.val().Pret == pret &&
                        element.val().Culoare == color){
                            if(element.val().Marime == size){

                                console.log(" - - - -  CANTITATE - - - ", qty);
                                console.log(" - - - -  MAXIM STOC  - - - ", maximStoc);
                                if(qty >= maximStoc){
                                    totalQty = maximStoc;
                                }else{
                                    totalQty = parseInt(nr.value) + parseInt(qty);
                                }

                                console.log(" - - - -  TOTAL CANTITATE - - - ", totalQty);

                                update(ref(db,"Conturi/" +  uid + "/CosCumparaturi/" + keyProd + "/" + element.key),{
                                    Cantitate: totalQty
                                })
                                .then(()=>{
                                    var confirmCos = confirm("if - Produsul a fost adaugat in cos. Doriti sa vizualizati cosul de cumparaturi?");
                                    if(confirmCos){
                                        window.location.href = "form_cart.html";
                                    }
                                    console.log("Cosul de cumparaturi a fost actualizat");
                                })
                                .catch((error)=>{
                                    console.log(error);
                                })

                                console.log("CANTITATE VAL ", parseInt(nr.value) + parseInt(qty));
                            }else {
                                console.log("RETURN - - - ");
                                
                                return;
                            }
                                
                        }else{
                            push(ref(db, "Conturi/" +  uid + "/CosCumparaturi/" + keyProd),{
                                Brand: marca,
                                Nume: nume,
                                Pret: pret,
                                PretRedus: pretRedus,
                                Poza: mainImg.src,
                                Model: model,
                                Culoare: color,
                                Marime: size,
                                Cantitate: nr.value,
                                Subtotal: subtotal,
                                MaximStoc : maximStoc
                            })
                            .then(()=>{
                                var confirmCos = confirm("else - Produsul a fost adaugat in cos. Doriti sa vizualizati cosul de cumparaturi?");
                                if(confirmCos){
                                    window.location.href = "form_cart.html";
                                }
                                console.log("Cosul de cumparaturi a fost actualizat");
                            })
                            .catch((error)=>{
                                console.log(error);
                            })
                        }
                    });
                })


            }
        })  
});