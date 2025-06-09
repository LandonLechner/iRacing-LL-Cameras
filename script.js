const camSections = document.querySelectorAll('.cam-section');
const initial = document.querySelector('#initial');
const midSections = Array.from(camSections).splice(1).splice(0,5);
const last = document.querySelector('#last-two');
const redBlack = document.querySelectorAll('.red-black');
const yellowBlack = document.querySelectorAll('.yellow-black');
const whiteBlack = document.querySelectorAll('.white-black');
const divider = document.querySelectorAll('.divider');
const gray = "#333";

const colorHelper = (elements, prop, color) => {
    elements.forEach(el => el.style[prop] = color);
};

const goGrayAll = () => {
    [camSections, redBlack, yellowBlack, whiteBlack].forEach(el =>
        colorHelper(el, "color", gray))
    colorHelper(divider, "backgroundColor", gray);
    camSections.forEach(el => colorHelper(el.querySelectorAll('li'), "color", gray))
    camSections.forEach(el => 
        colorHelper(el.querySelectorAll('span:not(.cam-name)'), "border", "1px solid rgba(255, 255, 255, 0.2)"));
};

const resetColors = () => {
    camSections.forEach(el => colorHelper(el.querySelectorAll('li'), "color", "#ddd"))
    colorHelper(redBlack, "color", "red")
    colorHelper(yellowBlack, "color", "#bbbb00")
    colorHelper(whiteBlack, "color", "#ddd")
    colorHelper(divider, "backgroundColor", "#888")
    colorHelper(document.querySelectorAll('.framed'), "border", "1px solid #888")
};

const focused = (el) => {
    goGrayAll();
    const containedRedBlack = el.querySelectorAll('.red-black')
    if (containedRedBlack.length > 1) {
        colorHelper(containedRedBlack, "color", "red");
    } else {
        el.querySelector('.red-black').style.color = "red";
    }
    colorHelper(el.querySelectorAll('li'), "color", "#ddd");
    colorHelper(el.querySelectorAll('.white-black'), "color", "#ddd");    
    colorHelper(divider, "backgroundColor", "#333");
    el.querySelectorAll('span:not(.cam-name)').forEach(span => span.style.border = "1px solid #888");
    const containedYellowBlack = el.querySelectorAll('.yellow-black')
    if (containedYellowBlack.length > 1) {
        colorHelper(containedYellowBlack, "color", "#bbbb00");
    } else if (containedYellowBlack.length === 1) {
        el.querySelector('.yellow-black').style.color = "#bbbb00";
    } else {
        return;
    }
}

camSections.forEach(el => {
    ['mouseleave', 'focusout'].forEach(e => 
        el.addEventListener(e, resetColors)
    );
    ['mouseenter', 'focusin'].forEach(e =>
    el.addEventListener(e, () => focused(el))
    );
});
