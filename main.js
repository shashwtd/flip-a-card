var cards = [], associations = [], flipped = [];
let first_flip = '', second_flip = '', previousTarget;
var count = 0, delay = 800;
const astley = true;
var API_KEY = '31266814-2adc0eb15aa7d78852e5cb233';
var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('minimal');
const items = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
]

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

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

function initialize_cards() {
    for (let index = 0; index < cards.length/2; index++) {
        associations.push(items[index]);
    }
    
    associations = associations.concat(associations);
    associations = associations.sort(() => Math.random() - 0.5);

    for (let index = 0; index < associations.length; index++) {
        const elm = cards[index];
        // elm.innerText = associations[index];
    }
}

const resetGuesses = () => {
    first_flip = '';
    second_flip = '';
    count = 0;
    previousTarget = null;

    let selected = document.querySelectorAll('[flipped]');
    for (let i = 0; i < selected.length; i++) {
        selected[i].removeAttribute('flipped')
    }
};

const match = () => {
    let selected = document.querySelectorAll('[flipped]');
    for (let i = 0; i < selected.length; i++) {
        selected[i].setAttribute("matched", 'true');
    }
}

function handle_flip(elm) {
    if (elm.hasAttribute('flipped') || elm.hasAttribute('matched')) {
        return;
    }
    if(count < 2){
        count ++;
        if (count === 1){
            first_flip = associations[cards.indexOf(elm)];
            elm.setAttribute('flipped', 'true')
        } else{
            second_flip = associations[cards.indexOf(elm)];
            elm.setAttribute('flipped', 'true')
        }

        if(first_flip !== '' && second_flip !== ''){
            if (first_flip === second_flip) {
                setTimeout(match, delay/2);
                setTimeout(resetGuesses, delay);
            }else {
                setTimeout(resetGuesses, delay);
            }
        }

        previousTarget = elm;
    }
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
            if (element.classList.contains("astley")) {
                element.classList.remove("astley");
            } else {
                element.classList.add("astley");
            }
        }
    }, 600)
}

function rickroll(elm) {
    elm.classList.add('astley');
    let roll = document.getElementById("rickroll_audio");
    roll.play();

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

function install_listeners() {
    cards.forEach(card => {
        card.addEventListener("click", e => {
            if (astley){
                rickroll(e.target);
            } else {
                handle_flip(e.target);
            }
        });
    });

    return true;
}

function init() {
    kaam_shuru(5);
    initialize_cards();
    install_listeners();
}

window.onload = init();

