
// EVENIMENT PENTRU AFISAREA ELEMENTELOR DIN DROPDOWN

// DROPDOWN-urile CORESPONDENTE CULORILOR DE LA ADAUGAREA UNUI PRODUS NOU
var listNegru = document.getElementById('listNegru');
var listAlb = document.getElementById('listAlb');
var listAlbastru = document.getElementById('listAlbastru');
var listRosu = document.getElementById('listRosu');
var listVerde = document.getElementById('listVerde');
var listMov = document.getElementById('listMov');
var listBej = document.getElementById('listBej');
var listRoz = document.getElementById('listRoz');


listNegru.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (listNegru.classList.contains('visible'))
        listNegru.classList.remove('visible');
    else
        listNegru.classList.add('visible');
}

listAlb.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (listAlb.classList.contains('visible'))
        listAlb.classList.remove('visible');
    else
        listAlb.classList.add('visible');
}

listAlbastru.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (listAlbastru.classList.contains('visible'))
        listAlbastru.classList.remove('visible');
    else
        listAlbastru.classList.add('visible');
}

listRosu.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (listRosu.classList.contains('visible'))
        listRosu.classList.remove('visible');
    else
        listRosu.classList.add('visible');
}

listVerde.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (listVerde.classList.contains('visible'))
        listVerde.classList.remove('visible');
    else
        listVerde.classList.add('visible');
}

listMov.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (listMov.classList.contains('visible'))
        listMov.classList.remove('visible');
    else
        listMov.classList.add('visible');
}

listBej.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (listBej.classList.contains('visible'))
        listBej.classList.remove('visible');
    else
        listBej.classList.add('visible');
}

listRoz.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (listRoz.classList.contains('visible'))
        listRoz.classList.remove('visible');
    else
        listRoz.classList.add('visible');
}

// DROPDOWN-ul CORESPONDENT DETALIILOR ADAUGATE PRODUSELOR NOI ADAUGATE
var listDetalii = document.getElementById('listDetalii');

listDetalii.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (listDetalii.classList.contains('visible'))
        listDetalii.classList.remove('visible');
    else
        listDetalii.classList.add('visible');
}


// DROPDOWN-urile DE LA FILTRAREA PRODUSELOR
var checkList1 = document.getElementById('list1');
var checkList2 = document.getElementById('list2');
var checkList3 = document.getElementById('list3');
var checkList4 = document.getElementById('list4');

checkList1.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (checkList1.classList.contains('visible'))
        checkList1.classList.remove('visible');
    else
        checkList1.classList.add('visible');
}

checkList2.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (checkList2.classList.contains('visible'))
        checkList2.classList.remove('visible');
    else
        checkList2.classList.add('visible');
}

checkList3.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (checkList3.classList.contains('visible'))
        checkList3.classList.remove('visible');
    else
        checkList3.classList.add('visible');
}

checkList4.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (checkList4.classList.contains('visible'))
        checkList4.classList.remove('visible');
    else
        checkList4.classList.add('visible');
}

// FUNCTIE PENTRU FILTRAREA PRODUSELOR
// AFISAREA FIXA IN TOP-ul PAGINII A DROPDOWN-urilor DE LA FILTRAREA PRODUSELOR
var elementPosition = $('#list').offset();
$(window).scroll(function(){
    if($(window).scrollTop() > elementPosition.top){
        $('#list').css('position','fixed').css('top','83px')
        .css('z-index', '100').css('background-color','white')
        .css('padding','18px').css('opacity','95%')
        .css('left','0').css('right','0');
    } else {
        $('#list').css('position','static');
    }    
});