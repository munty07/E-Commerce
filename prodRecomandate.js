 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
 import {getDatabase, ref, set, get, child, orderByChild, query, update, limitToLast} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"

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



 var divGenerate = document.getElementById('divGenerate');
 var count = 0;
 var countProd = 1;
 let prodMap = new Map();
 function AddItem(key, brand, imagine1, imagine2, nume, pret, reducere, pretRedus, favoriteBy){
     
     let div = document.createElement('div');
     div.className = "pro";
         // BUTON PENTRU ADAUGAREA PRODUSELOR LA FAVORITE
         let td1 = document.createElement('a');
             td1.id = "love" + count;
             td1.className = "love";
             td1.innerHTML = '<i class="fas fa-heart heart"></i>';
             td1.children[0].classList.add("inactiveHeart");
         
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
             if(snapshot.val().Stoc == "0"){
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

     divGenerate.appendChild(div);

     



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

             let updatedList = favoriteBy.filter(item => {
                 item != uid;
             });

             console.log("Lista de utilizatori cu produs favorit dupa stergere:");
             console.log(updatedList);
             console.log("Length updatedList", updatedList.length);
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


 function AddAllItems(Produse){
     Produse.reverse();
     divGenerate.innerHTML = "";
     Produse.forEach(element => {
         console.log("Cheia produsului adaugat:");
         console.log(element.key);
         console.log("FavoriteBy:");
         console.log(element.val().FavoriteBy);
         
         AddItem(element.key, element.val().Brand, element.val().Poza, element.val().Poza2, element.val().Nume, element.val().Pret, element.val().Reducere, element.val().PretRedus, element.val().FavoriteBy);
     })
 }

 function GetAllData(){
     const que = query(ref(db, "Produse"),orderByChild("NrRecomandare"), limitToLast(4));
     get(que)
     .then((snapshot) => {
         var prod = [];
         snapshot.forEach(childSnapshot => {
             console.log("Child -> id-urile produselor:");
             console.log(childSnapshot.key);
             prod.push(childSnapshot);
         });
         AddAllItems(prod);     
     })
     .catch((error) => {
         console.log("Mesaj eroare " + error);
     })
 }
 window.onload = GetAllData;
 
 
