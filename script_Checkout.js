// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {getDatabase, ref, get, child, set, push, remove, update} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"

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
        console.log("--------------------------");

        const fname = document.getElementById('fname');
        const fullName = snapshot.val().Nume;
        fname.value = fullName;

        const mail = document.getElementById('email');
        const email =  snapshot.val().Mail;
        mail.value = email;

        const adr = document.getElementById('adr');
        const address =  snapshot.val().Adresa;
        adr.value = address;

        const cty = document.getElementById('city');
        const city =  snapshot.val().Oras;
        cty.value = city;

        const cnty = document.getElementById('county');
        const county =  snapshot.val().Judet;
        cnty.value = county;

        const phone = document.getElementById('phone');
        const nr =  snapshot.val().Telefon;
        phone.value = nr;

        const zip = document.getElementById('zip');
        const czip =  snapshot.val().Cod_postal;
        zip.value = czip;
        console.log("Cod postal: " + czip);
    } else {
        console.log("No data available");
    }
})
.catch((error) => {
    console.error(error);
});

var radioPlata = document.querySelectorAll('input[type=radio][name="optradio2"]');
radioPlata.forEach(radio => radio.addEventListener('change', () => {
    if(document.getElementById('cash').checked) {
        document.getElementById("error-cname").style.display = "none";
        document.getElementById("error-ccnum").style.display = "none";
        document.getElementById("error-cvv").style.display = "none";
        document.getElementById("error-expmonth").style.display = "none";
        document.getElementById("error-expyear").style.display = "none";

        document.getElementById("cname").disabled = true;
        document.getElementById("ccnum").disabled = true;
        document.getElementById("expmonth").disabled = true;
        document.getElementById("expyear").disabled = true;
        document.getElementById("cvv").disabled = true;
    }else if(document.getElementById('card').checked) {
        document.getElementById("error-cname").style.display = "flex";
        document.getElementById("error-ccnum").style.display = "flex";
        document.getElementById("error-cvv").style.display = "flex";
        document.getElementById("error-expmonth").style.display = "flex";
        document.getElementById("error-expyear").style.display = "flex";
        
        document.getElementById("cname").disabled = false;
        document.getElementById("ccnum").disabled = false;
        document.getElementById("expmonth").disabled = false;
        document.getElementById("expyear").disabled = false;
        document.getElementById("cvv").disabled = false;
    }
}));

var divContainer = document.getElementById('divContainer');
var divCart = document.getElementById('divCart');
var divTransport = document.getElementById('divTransport');
var divTotal = document.createElement('divTotal');



function add(){
    ////////////////DIV TRANSPORT////////////////////////

    let pT = document.createElement('p');
        pT.innerHTML = "Transport";
    let spanT = document.createElement('span');
        spanT.innerHTML = "0";
        spanT.id = "transport";
        spanT.className = "price";

    pT.appendChild(spanT);

    divTransport.appendChild(pT);

    ////////////////DIV TOTAL////////////////////////

    var sum = sessionStorage.getItem("subPlata");
    console.log(" ");
    console.log("SESSION STORAGE SUBPLATA === " + sum);
    console.log(" ");
    let pTotal = document.createElement('p');
        pTotal.innerHTML = "Total";
    let spanTotal = document.createElement('span');
        spanTotal.id = "total";
        spanTotal.className = "price";
        spanTotal.style = "color:black";
    let bTotal = document.createElement('b');
        bTotal.innerHTML = sum;

    spanTotal.appendChild(bTotal);
    pTotal.appendChild(spanTotal);

    divTotal.appendChild(pTotal);

    /////////////////////////////////////////////////

    divContainer.appendChild(divTotal, divTransport);
    

    var radioExpediere = document.querySelectorAll('input[type=radio][name="optradio1"]');
    radioExpediere.forEach(radio => radio.addEventListener('change', () => {
        if(document.getElementById('express').checked) {
            document.getElementById('transport').innerHTML = "39";
        }else if(document.getElementById('domiciliu').checked) {
            document.getElementById('transport').innerHTML = "19";
        }else if(document.getElementById('posta').checked){
            document.getElementById('transport').innerHTML = "13";
        }else if(document.getElementById('magazin').checked){
            document.getElementById('transport').innerHTML = "0";
        }

        var total = document.getElementById('total');
        var transport = document.getElementById('transport');
        total.innerHTML = parseFloat(transport.innerHTML) + parseFloat(sum);

    }));
}

function AddProd(cartKey, denumire, can, size, subtotal){
    get(child(dbRef, "Conturi/" +  uid + "/CosCumparaturi/" + cartKey)).then((snapshot) => {
        if(snapshot.exists()){
            /////////////////////DIV CART/////////////////////////
            let p = document.createElement('p');
            let a = document.createElement('a');
                a.id = "nameProd" + cartKey;
                a.setAttribute('href', 'form_details.html');
            
            let span = document.createElement('span');
                span.id = "sizeProd" + cartKey;
                span.className = "spanCantitate";
            let span1 = document.createElement('span');
                span1.id = "canProd" + cartKey;
                span1.className = "spanCantitate";
            let span2 = document.createElement('span');
                span2.id = "prProd" + cartKey;
                span2.className = "price";
                
            a.innerHTML = '<img class="photo" src="' + denumire + '">';
            span.innerHTML = "(" + size + ")";
            span1.innerHTML = " x" + can;
            span2.innerHTML = parseFloat(subtotal)/parseFloat(can).toFixed(2) + " lei";

            p.appendChild(a);
            
            p.appendChild(span1);
            p.appendChild(span);
            p.appendChild(span2);
            

            divCart.appendChild(p);

            //////////////////////////////////////////////////////
            
        }  
    });
}




var listProducts = [];

function AddAllProd(ProdCart){
    divCart.innerHTML = "";
    divTransport.innerHTML = "";
    divTotal.innerHTML = "";
    
    ProdCart.forEach(element => {
        get(child(dbRef, "Conturi/" + uid + "/CosCumparaturi/" + element.key)).then((snapshot) => {
            snapshot.forEach(function(child){
                console.log("Cantitate: " + child.key + " " + child.val().Cantitate);
                console.log("Subtotal: " + child.key + " " + child.val().Subtotal);
                console.log("POZA : " + child.val().Poza);
                AddProd(element.key, child.val().Poza, child.val().Cantitate, child.val().Marime, child.val().Subtotal)
                let pretRed;
                if(child.val().PretRedus == 0){
                    pretRed = child.val().Pret;
                }else{
                    pretRed = child.val().PretRedus;
                }


                var obj = {
                    nume: child.val().Nume,
                    brand: child.val().Brand,
                    marime: child.val().Marime,
                    culoare: child.val().Culoare,
                    pret: child.val().Pret,
                    pretRedus: pretRed, 
                    cantitate: child.val().Cantitate, 
                    subtotal: child.val().Subtotal
                };
                
                listProducts.push(obj);

                console.log("");
                console.log("LISTA Nume prod - - - ");
                console.log(obj['nume']);
                console.log("");


            })
        })
        .catch((error) => {
            console.log("Mesaj eroare " + error);
        })
    })
    
}

function GetAllProd(){
    const dbRef = ref(db);
    get(child(dbRef, "Conturi/" + uid + "/CosCumparaturi/"))
    .then((snapshot) => {
        var prod = [];
        snapshot.forEach(childSnapshot => {
            prod.push(childSnapshot);
            console.log("SNAPSHOT VAL");
            console.log(snapshot.val());
        });
        if(snapshot.exists())
        {
            AddAllProd(prod);
            add();
        }else{
            let p = document.createElement('p');
            p.innerHTML = "Nu mai exista produse in cos";
            p.style.color = "red";
            divCart.appendChild(p);
            document.getElementById("btnSend").disabled = true;
        }
        
    })
    .catch((error) => {
        console.log("Mesaj eroare " + error);
    })
    
}
window.onload = GetAllProd;

document.getElementById("btnContinue").addEventListener('click', () => {
    window.location.href = "/form_products.html";
})


function DeleteData(){
    console.log(" - - - - - - DELETE");


    let lstOrder = [];
    for(const element of listProducts){
        lstOrder.push(element);
        console.log("LST order - - - ", element); 
    }

    // ----------------------------------------------------
    // remove(ref(db, "Conturi/" + uid + "/CosCumparaturi/"))
    // .then(() => {
    //     alert("Produsele au fost sterse din cosul de cumparaturi!");
    // })
    // .catch((error) => {
    //     alert("Eroare: " + error);
    // })
    
}

function refreshPage(){
    window.location.reload(true);
}


function parcurgeLista(){
    let listaProd = [];
    for(const element of listProducts){
        listaProd.push(element);
    }

    return listaProd; 
}

var numeFactura = "factura-" + uid + ".pdf";

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
   

    console.log("FUNCTIE");
    console.log(parcurgeLista());
    
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, {
        styles: {fillColor: [89, 150, 148]},
        columnStyles: {
            id: {fillColor: 255}
        },
        margin: {top: 300},
        didDrawPage: function(data) {
            doc.text("FACTURA", 40, 30);
            doc.autoTable({
                head: [['Nr. Factura', 'Data emiterii', 'Ora emiterii']],
                body: [
                    [count, zi + '/' + luna + '/' + an, ora + ':' + minute + ':' + secunde]
                ]
            });
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
    console.log("NUME FACTURA - -  - ", numeFactura);

    const confirmSave = confirm("Doriti sa descarcati factura?");
    if(confirmSave){
        doc.save(numeFactura);
    }
        
    sendEmail(numeFactura, pdfBase64);
}

function sendEmail(factura, url) {
    
    Email.send({
    SecureToken : "d4e41b30-45f4-4df0-9742-b6750961dc90",
    To : document.getElementById("email").value,
    From : "muntyancraciunela@gmail.com",
    Subject : "Procesare comanda - " + uid,
    Body : 'Multumim ca ati ales produsele noastre!<br><br>' +
        'Comanda este in curs de procesare, o sa revenim curand cu un mail'+
        ' pentru a va tine la curent cu starea comenzii.'+
        '<br><br><br>Multumim,<br> Echipa MIMI',
    Attachments: [{
        name: factura,
        data: url
    }]
    })
    .then( message => {
        setTimeout(refreshPage, 2000);
        document.getElementById("message").display = "none";
        
    });


}

var lstClients = [];

function getIdClient(){

    get(child(dbRef, "ComenziPlasate")).then((snapshot) => {
        snapshot.forEach(childObj => {
            console.log("uid existente", childObj.key);
            var idClients = childObj.key;
            lstClients.push(idClients);
            console.log("List Clienti", lstClients);
            
        })
    })

    
}

// modificari
var count = 0;

document.getElementById("btnSend").addEventListener('click', () => {
    getIdClient();
    if(!validate()){
        console.log("Date invalide");

        return;
    }else{
        let paragraph = document.createElement('p');
            paragraph.id = "message";
            paragraph.innerHTML = "<br>COMANDA ESTE IN CURS DE PROCESARE...!";
            paragraph.className = "showMessage";
            paragraph.style.color = "#367879!important";
        document.getElementById("divProces").appendChild(paragraph);

        let clientName;
        let clientAddress;
        let clientCity;
        let clientCounty;
        let clientZip;
        let clientPhone;
        let clientMail;
        get(child(dbRef, "Conturi/" +  uid)).then((snapshot) => {
            if(snapshot.exists()){
                clientName = document.getElementById("fname").value
                clientAddress = document.getElementById("adr").value;
                clientCity = document.getElementById("city").value;
                clientCounty = document.getElementById("county").value;
                clientZip = document.getElementById("zip").value;
                clientPhone = document.getElementById("phone").value;
                clientMail = document.getElementById("email").value;
                count ++;
                generarePDF(clientName, clientAddress, clientCity, clientCounty, clientZip, clientPhone, clientMail);
            }
        })
        .then(() => {
            let today = new Date();

            let zi = today.getDate();
            let luna = today.getMonth() + 1;
            let an = today.getFullYear();
            let data = zi + "-" + luna + "-" + an;

            let ora = today.getHours();
            let minute = today.getMinutes();
            let secunde = today.getSeconds();
            let hour = ora + ":" + minute + ":" + secunde;

            let sumProd = sessionStorage.getItem("subPlata");
            let expediere;
            let statusPlata;
            let plata;
            let taxaTransport;
            let total;

            if(document.getElementById('cash').checked){
                statusPlata = "Neachitat";
                plata = "Cash";
            }else if(document.getElementById('card').checked){
                statusPlata = "Achitat";
                plata = "Card";
            }

            if(document.getElementById('express').checked) {
                taxaTransport = 39;
                expediere = "Expres la domiciliu";
            }else if(document.getElementById('domiciliu').checked) {
                taxaTransport = 19;
                expediere = "La domiciliu";
            }else if(document.getElementById('posta').checked){
                taxaTransport = 13;
                expediere = "Prin posta";
            }else if(document.getElementById('magazin').checked){
                taxaTransport = 0;
                expediere = "In magazin";
            }

            total = parseFloat(sumProd) + parseFloat(taxaTransport);

            push(ref(db, "Comenzi/"),{
                Client: {
                    "Nume": clientName,
                    "Adresa": clientAddress,
                    "Oras": clientCity,
                    "Judet": clientCounty,
                    "CodPostal": clientZip,
                    "Telefon": clientPhone,
                    "Mail": clientMail
                },
                Produse: parcurgeLista(),
                Detalii: {
                    "Data": data,
                    "Ora": hour,
                    "MetodaExpediere": expediere,
                    "Plata": plata,
                    "StatusPlata": statusPlata,
                    "SubPlata": Number(sumProd),
                    "TaxaTransport": taxaTransport,
                    "Total": total
                }
            }); 
        })

        DeleteData();
    }
})


////////VALIDARI/////////
var name = document.getElementById("fname");
var mail = document.getElementById("email");
var address = document.getElementById("adr");
var city = document.getElementById("city");
var county = document.getElementById("county");
var phone = document.getElementById("phone");
var code = document.getElementById("zip");

var cardName = document.getElementById("cname");
var cardNr = document.getElementById("ccnum");
var cvv = document.getElementById("cvv");
var month = document.getElementById("expmonth");
var year = document.getElementById("expyear");

let lettersRegex = /^[a-zA-Z -]*$/;//letter, line and space
let mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let phoneRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
let codeRegex = /^\d{6}$/;
let cvvRegex = /^[0-9]{3,4}$/;
let monthRegex = /^1[0-2]|0[1-9]$/;
let yearRegex = /^[2][0][2-9]{2}$/;


function ValidateCreditCardNumber() {

    var ccNum = document.getElementById("ccnum").value;
    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var isValid = false;

    if (visaRegEx.test(ccNum)) {
        isValid = true;
    } else if(mastercardRegEx.test(ccNum)) {
        isValid = true;
    } 

    if(isValid) {
        document.getElementById("error-ccnum").innerHTML = '';
    } else {
        document.getElementById("error-ccnum").innerHTML = "Numar card invalid";
        document.getElementById("error-ccnum").style.color = "red";
    }
}

function validateCardName(){
    document.getElementById("error-cname").innerHTML = ((lettersRegex.test(cardName.value)) ? "" : "Numele trebuie sa contina doar litere!");
}

function validateCvv(){
    document.getElementById("error-cvv").innerHTML = ((cvvRegex.test(cvv.value)) ? "" : "Cod invalid!");
}

function validateMonth(){
    document.getElementById("error-expmonth").innerHTML = ((monthRegex.test(month.value)) ? "" : "Luna invalida!");
}

function validateYear(){
    document.getElementById("error-expyear").innerHTML = ((yearRegex.test(year.value)) ? "" : "An invalid!");
}

function validateName(){
    document.getElementById("error-name").innerHTML = ((lettersRegex.test(name.value)) ? "" : "Numele trebuie sa contina doar litere!");
}

function validateMail(){
    document.getElementById("error-mail").innerHTML = ((mailRegex.test(mail.value)) ? "" : "Mail invalid!");
}

function validatePhone(){
    document.getElementById("error-phone").innerHTML = ((phoneRegex.test(phone.value)) ? "" : "Numarul de telefon este invalid!");
}

function validateCounty(){
    document.getElementById("error-county").innerHTML = ((lettersRegex.test(county.value)) ? "" : "Judetul trebuie sa contina doar litere!");
}

function validateCity(){
    document.getElementById("error-city").innerHTML = ((lettersRegex.test(city.value)) ? "" : "Orasul trebuie sa contina doar litere!");
}

function validateCode(){
    document.getElementById("error-code").innerHTML = ((codeRegex.test(code.value)) ? "" : "Cod postal invalid!");
}

function validateFieldNull(field){
    if(field.value == null || field.value.match(/^ *$/) !== null){
        //field isn't good
        return false;
    }else{
        //field is good
        return true;
    }
}

name.addEventListener('keyup', validateName);
mail.addEventListener('keyup', validateMail);
phone.addEventListener('keyup', validatePhone);
county.addEventListener('keyup', validateCounty);
city.addEventListener('keyup', validateCity);
code.addEventListener('keyup', validateCode);
cardName.addEventListener('keyup', validateCardName);
cardNr.addEventListener('keyup', ValidateCreditCardNumber);
cvv.addEventListener('keyup', validateCvv);
month.addEventListener('keyup', validateMonth);
year.addEventListener('keyup', validateYear);


function validate(){
    if(document.getElementById('cash').checked) {
        console.log("No problem");
        parcurgeLista();
    }else if(document.getElementById('card').checked) {
        if(validateFieldNull(cardName) == false || validateFieldNull(cardNr) == false || validateFieldNull(cvv) == false || validateFieldNull(month) == false || validateFieldNull(year) == false){
        document.getElementById("error-all").innerHTML = "Completati toate campurile!";
        document.getElementById("error-all").style.color = "red";
        return false;
        }else{
            if(document.getElementById("error-cname").innerHTML != '' ||
                document.getElementById("error-ccnum").innerHTML != '' ||
                document.getElementById("error-cvv").innerHTML != '' ||
                document.getElementById("error-expmonth").innerHTML != '' ||
                document.getElementById("error-expyear").innerHTML != ''){
                    document.getElementById("error-all").innerHTML = "Date invalide!";
                    document.getElementById("error-all").style.color = "red";
                    return false;
            }
            else{ 
                document.getElementById("error-all").innerHTML = '';
                return true;
            }
        } 
    }

    
    if(validateFieldNull(name) == false || validateFieldNull(mail) == false || validateFieldNull(phone) == false || validateFieldNull(county) == false || validateFieldNull(city) == false || validateFieldNull(address) == false || validateFieldNull(code) == false){
        document.getElementById("error-all").innerHTML = "Completati toate campurile!";
        document.getElementById("error-all").style.color = "red";
        return false;
     }else {
        if(document.getElementById("error-name").innerHTML != '' ||
            document.getElementById("error-mail").innerHTML != '' ||
            document.getElementById("error-phone").innerHTML != '' ||
            document.getElementById("error-county").innerHTML != '' ||
            document.getElementById("error-city").innerHTML != '' ||
            document.getElementById("error-code").innerHTML != ''){
                document.getElementById("error-all").innerHTML = "Date invalide!";
                document.getElementById("error-all").style.color = "red";
                return false;
        }
        else{ 
            document.getElementById("error-all").innerHTML = '';
            return true;
        }
     }
    return true;
}