const camSections = document.querySelectorAll('.cam-section');
const initial = document.querySelector('#initial');
const midSections = Array.from(camSections).slice(1, 6);
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
    camSections.forEach(el => { 
        colorHelper(el.querySelectorAll('li'), "color", gray)
        colorHelper(el.querySelectorAll('span:not(.cam-name)'), "border", "1px solid rgba(255, 255, 255, 0.2)");
    });
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

  const highlight = [
    { selector: '.red-black', color: 'red' },
    { selector: '.yellow-black', color: '#bbbb00' },
    { selector: '.white-black', color: '#ddd' }
  ];

  highlight.forEach(({ selector, color }) => {
    const matches = el.querySelectorAll(selector);  
    if (matches.length) colorHelper(matches, 'color', color);
  });

  colorHelper(el.querySelectorAll('li'), "color", "#ddd");
  colorHelper(divider, "backgroundColor", gray);
  colorHelper(el.querySelectorAll('span:not(.cam-name)'), "border", "1px solid #888");
};

camSections.forEach(el => {
    ['mouseleave', 'focusout'].forEach(e => 
        el.addEventListener(e, resetColors)
    );
    ['mouseenter', 'focusin'].forEach(e =>
    el.addEventListener(e, () => focused(el))
    );
});
