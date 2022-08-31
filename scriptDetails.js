var selectProd1 = sessionStorage.getItem("image1");
var selectProd2 = sessionStorage.getItem("image2");

var mainImg = document.getElementById("mainImg");
var secondaryImg = document.getElementById("secondaryImg");
console.log("SELECT PROD ===== " + selectProd1 + " " + selectProd2);
function details(){
    mainImg.src = selectProd1;
    secondaryImg.src = selectProd2;
}
window.onload = details();



// pentru caruselu de imagini
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}