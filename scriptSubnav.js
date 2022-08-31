const sub = document.getElementById('sub');
const drop = document.getElementById('drop');
const sub1 = document.getElementById('sub-1');
const drop1 = document.getElementById('drop-1');


if(sub){
    sub.addEventListener('click', () => {
        drop1.classList.add("inactive");
        if(drop.classList.contains("inactive") === true){
            drop.classList.remove("inactive");
            drop.classList.add("active3")
        }
        else{
            drop.classList.add("inactive");
        }

        drop.addEventListener('mouseleave', () => {
            drop.classList.add("inactive");
        })

    }, false)
}

if(sub1){
    sub1.addEventListener('click', () => {
        drop.classList.add("inactive");
        if(drop1.classList.contains("inactive") === true){
            drop1.classList.remove("inactive");
            drop1.classList.add("active3")
        }
        else{
            drop1.classList.add("inactive");
        }

        drop1.addEventListener('mouseleave', () => {
            drop1.classList.add("inactive");
        })

    }, false)
}
