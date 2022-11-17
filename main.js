var cards = [], associations = [], flipped = [];
let first_flip = '', second_flip = '', previousTarget;
var count = 0, delay = 800;
var astley_activated = false;

var isSmall = screen.width<=1000;

function kaam_shuru(size = 1) {
    let card_container = document.getElementById('container-main')
    while (card_container.firstChild) { card_container.removeChild(card_container.firstChild); }
    card_container.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
    card_container.style.gridTemplateRows = "repeat(" + size + ", 1fr)";

    for (let i = 0; i < size * size; i++) {
        let card_elm = document.createElement("div");
        let front_elm = document.createElement("div");
        card_elm.className = 'card';
        front_elm.className = 'card-front'
        card_container.appendChild(card_elm);
        cards.push(card_elm);
    }

    return true;
}

function astley_wink() {
    let __ = cards.concat([]);
    
    var blink = setInterval(function() {
        let __2 = [];
        for (let i = 0; i < 10; i++) {
            let index = Math.floor(Math.random()* __.length);
            const element = __[index];
            __2.push(element);
        }
        for (let index = 0; index < __2.length; index++) {
            const element = __2[index];
            troll_(element);
        }
    }, 600)
}

function rickroll(elm) {
    elm.classList.add('astley');
    let roll = document.getElementById("rickroll_audio");
    roll.play();
    no_more_astley();

    let uncovered = cards.concat([]);
    uncovered.splice(cards.indexOf(elm), 1);
    var timer = setInterval(function() {
        if (uncovered.length <= 0){
            clearInterval(timer);
            astley_wink();
        } 
        for (let i = 0; i < Math.floor(Math.random() * 6); i++) {
            let x = Math.floor(Math.random()*uncovered.length);
            let item = uncovered[x];
            item.classList.add('astley');
            uncovered.splice(x, 1);
            if (uncovered.length == 0) {break;}
        }
    }, 400);
}

function troll_(elm) {
    if (elm.classList.contains("astley")) {
        elm.classList.remove("astley");
    } else {
        elm.classList.add("astley");
    }
}

function no_more_astley() {
    return astley_activated = true;
}

function install_listeners() {
    cards.forEach(card => {
        card.addEventListener("click", e => {
            if (astley_activated){
                return troll_(e.target);
            }
            rickroll(e.target);
        });
        // card.addEventListener('mouseover', e => {
        //     if (astley_activated){return troll_(e.target);}
        // });
    });

    return true;
}

function init() {
    if (isSmall) { 
        kaam_shuru(4)
    } else {
        kaam_shuru(5);
    }
    install_listeners();
}

window.onload = init();

