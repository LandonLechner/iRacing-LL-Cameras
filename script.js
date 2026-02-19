let msg1 = document.querySelector('#msg1');
let msg1Text = msg1.textContent;
let msg2 = document.querySelector('#msg2');
let msg2Text = msg2.textContent;
let msg3 = document.querySelector('#msg3');
let msg3Text = msg3.textContent;

function setupCopyElement(element, originalText) {
    element.dataset.originalText = originalText;
    element.addEventListener('click', function() {
            navigator.clipboard.writeText(element.dataset.originalText);
            element.innerText = "Copied!";
            setTimeout(() => {
                element.innerText = element.dataset.originalText;
        }, 1300);
    });
}

setupCopyElement(msg1, msg1Text);
setupCopyElement(msg2, msg2Text);
setupCopyElement(msg3, msg3Text);




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
const whiteBlack = document.querySelectorAll('.white-black');
const divider = document.querySelectorAll('.divider');
const gray = "#333";
const activeBlue = "rgba(25, 117, 255, 1)";

let activeSection = null;

const colorHelper = (elements, prop, color) => {
    elements.forEach(el => {
        el.style[prop] = color;
    });
};

const goGrayAll = () => {
    colorHelper(camSections, "color", gray);
    colorHelper(camSections, "border", "1px solid transparent");
    colorHelper(camSections, "boxShadow", "none");
    
    colorHelper(whiteBlack, "color", gray);
    colorHelper(divider, "backgroundColor", gray);

    camSections.forEach(el => {
        colorHelper(el.querySelectorAll('li'), "color", gray);
        colorHelper(el.querySelectorAll('.framed'), "border", "1px solid rgba(255, 255, 255, 0.2)");
        colorHelper(el.querySelectorAll('.tab'), "borderBottom", "1px solid rgba(25, 117, 255, 0)");
        colorHelper(el.querySelectorAll('.tab'), "textShadow", "none");
    });
};

const resetColors = () => {
    camSections.forEach(el => {
        el.style.border = "1px solid transparent";
        el.style.boxShadow = "none";
        
        colorHelper(el.querySelectorAll('li'), "color", "#ddd");
        colorHelper(el.querySelectorAll('.framed'), "border", "1px solid rgba(255, 255, 255, 0.2)");
                colorHelper(el.querySelectorAll('.tab'), "borderBottom", `1px solid ${activeBlue}`);
                colorHelper(el.querySelectorAll('.tab'), "textShadow", "0 4px 4px rgb(25, 117, 255)");
    });
    colorHelper(camSections, "color", ""); 
    colorHelper(whiteBlack, "color", "#ddd");
    colorHelper(divider, "backgroundColor", "#888");
};

const focused = (el) => {
    goGrayAll();
    
    el.style.border = `1px solid ${activeBlue}`;
    el.style.boxShadow = `0 0 8px rgba(25, 117, 255, 0.3)`; 
    
    const highlight = [{ selector: '.white-black', color: '#ddd' }];
    highlight.forEach(({ selector, color }) => {
        const matches = el.querySelectorAll(selector);
        if (matches.length) colorHelper(matches, 'color', color);
    });
    
    colorHelper(el.querySelectorAll('li'), "color", "#ddd");
    colorHelper(el.querySelectorAll('.framed'), "border", "1px solid #888");
    colorHelper(el.querySelectorAll('.tab'), "borderBottom", `1px solid ${activeBlue}`);
    colorHelper(el.querySelectorAll('.tab'), "textShadow", "0 4px 4px rgb(25, 117, 255)");
};

camSections.forEach(el => {
    el.addEventListener('click', () => {
        if (activeSection === el) {
            resetColors(); 
            activeSection = null;
        } else {
            focused(el);
            activeSection = el;
        }
    });
});

resetColors();