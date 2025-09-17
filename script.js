let msg = document.querySelector(`#msg1`)
let msgText = msg.textContent

msg.addEventListener('click', function() {
    navigator.clipboard.writeText(msg.textContent);
        
    msg.innerText = "Copied!";
    
    setTimeout(() => {
        msg.innerText = msgText;
    }, 1300);
})

const preRace = document.querySelector('#pre-race');
const race = document.querySelector('#race');
const mc1 = document.querySelector('.main-container1');
const mc2 = document.querySelector('.main-container2');
const label1 = document.querySelector('.label1');
const label2 = document.querySelector('.label2');

mc2.style.display= 'none'
label1.style.borderBottom = "2px solid #fff"
label2.style.borderBottom = "2px solid #333"

preRace.addEventListener('change', function() {
    if (preRace.checked) {
        mc1.style.display = 'flex'
        mc2.style.display= 'none'
        race.checked = false;
        label1.style.borderBottom = "2px solid #fff"
        label2.style.borderBottom = "2px solid #333"
    } else {
        mc1.style.display = 'none'
        mc2.style.display = 'block'
        race.checked = true;
        label1.style.borderBottom = "2px solid #333"   
        label2.style.borderBottom = "2px solid #fff"
    }
});

race.addEventListener('change', function() {
    if (race.checked) {
        mc1.style.display = 'none'
        mc2.style.display= 'block'
        preRace.checked = false;
        label2.style.borderBottom = "2px solid #fff"
        label1.style.borderBottom = "2px solid #333"
    } else {
        mc1.style.display = 'flex'
        mc2.style.display = 'none'        
        preRace.checked = true;
        label2.style.borderBottom = "2px solid #333"   
        label1.style.borderBottom = "2px solid #fff"
    }
});

const camSections = document.querySelectorAll('.cam-section');
const initial = document.querySelector('#initial');
const midSections = Array.from(camSections).slice(1, 6);
const last = document.querySelector('#last-two');
const whiteBlack = document.querySelectorAll('.white-black');
const divider = document.querySelectorAll('.divider');
const gray = "#333";
const tab = document.querySelectorAll('.tab');

const colorHelper = (elements, prop, color) => {
    elements.forEach(el => el.style[prop] = color);
};


const goGrayAll = () => {
    [camSections, whiteBlack].forEach(el =>
        colorHelper(el, "color", gray))
    colorHelper(divider, "backgroundColor", gray);
    camSections.forEach(el => {
        colorHelper(el.querySelectorAll('li'), "color", gray)
        colorHelper(el.querySelectorAll('.framed'), "border", "1px solid rgba(255, 255, 255, 0.2)");
    });

    camSections.forEach(el => colorHelper(el.querySelectorAll('.tab'), "border-bottom", "2px solid rgba(25, 117, 255, 0)"))
};

const resetColors = () => {
    camSections.forEach(el => {
        colorHelper(el.querySelectorAll('li'), "color", "#ddd");
        colorHelper(el.querySelectorAll('.framed'), "border", "1px solid rgba(255, 255, 255, 0.2)");
        colorHelper(el.querySelectorAll('.tab'), "border-bottom", "2px solid rgba(25, 117, 255, 1)");
    });
    colorHelper(whiteBlack, "color", "#ddd");
    colorHelper(divider, "backgroundColor", "#888");
    colorHelper(document.querySelectorAll('.framed'), "border", "1px solid #888");
};

const focused = (el) => {
    goGrayAll();
    
    const highlight = [
        { selector: '.white-black', color: '#ddd' },
    ];
    
    highlight.forEach(({ selector, color }) => {
        const matches = el.querySelectorAll(selector);
        if (matches.length) colorHelper(matches, 'color', color);
    });
    
    colorHelper(el.querySelectorAll('li'), "color", "#ddd");
    colorHelper(divider, "backgroundColor", gray);
    colorHelper(el.querySelectorAll('.framed'), "border", "1px solid #888");
    colorHelper(el.querySelectorAll('.tab'), "border-bottom", "2px solid rgba(25, 117, 255, 1)");
};

camSections.forEach(el => {
    ['mouseleave', 'focusout'].forEach(e => 
        el.addEventListener(e, resetColors)
        
    );
    ['mouseenter', 'focusin'].forEach(e =>
    el.addEventListener(e, () => focused(el))
    );
});
