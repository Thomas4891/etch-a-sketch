function fillScreen(numPixels) {
    screen.innerHTML = '';
    const pixelWidth = screen.offsetWidth / numPixels;
    const pixelHeight = screen.offsetHeight / numPixels;
    const fragment = document.createDocumentFragment();
    const pixelTotal = numPixels * numPixels;
    for (let i = 0; i < pixelTotal; ++i) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.width =  pixelWidth + 'px';
        pixel.style.height = pixelHeight + 'px';
        fragment.appendChild(pixel);
    }
    screen.appendChild(fragment);
}


const container = document.querySelector('#container');
const h1 = document.createElement('h1');
h1.textContent = 'Etch-a-Sketch';
container.appendChild(h1);

const screen = document.createElement('div');
screen.classList.add('screen');
container.appendChild(screen);

const controls = document.createElement('div');
controls.classList.add('controls');
container.appendChild(controls);

const btnLeft = document.createElement('button');
btnLeft.classList.add('btn');
btnLeft.id = 'btn-left';
btnLeft.textContent = 'Black';
controls.appendChild(btnLeft);

const slider = document.createElement('div');
slider.classList.add('slider');
controls.appendChild(slider);

const resolution = document.createElement('input');
resolution.id = 'resolution';
resolution.type = 'range';
resolution.name = 'resolution';
resolution.value = '16';
resolution.min = '1';
resolution.max = '50';
slider.appendChild(resolution);

const label = document.createElement('label');
label.id = 'pixel-label';
label.htmlFor = 'resolution';
label.textContent = `Resolution : ${resolution.value} x ${resolution.value}`;
document.querySelector('.slider').appendChild(label);

const btnRight = document.createElement('button');
btnRight.classList.add('btn');
btnRight.id = 'btn-right';
btnRight.textContent = 'Clear';
controls.appendChild(btnRight);

let numPixels = parseInt(resolution.value);

fillScreen(numPixels);

resolution.addEventListener('input', function () {
    resolution.value = parseInt(resolution.value);
    label.textContent =
        `Resolution : ${resolution.value} x ${resolution.value}`;
    numPixels = parseInt(resolution.value);
    fillScreen(numPixels);
});

const pixelMouseOver = document.querySelector('.screen');
pixelMouseOver.addEventListener('mouseover', (e) => {
    if (btnLeft.textContent.toLowerCase() === 'black') {
        fillBlack(e.target);
    } else if (btnLeft.textContent.toLowerCase() === 'greyscale') {
        fillGreyscale(e.target);
    } else if (btnLeft.textContent.toLowerCase() === 'rgb') {
        fillRgb(e.target);
    }
    e.stopPropagation();
});

btnRight.addEventListener('click', (e) => {
    fillScreen(numPixels);
})

btnLeft.addEventListener('click', (e) => {
    if (e.target.textContent.toLowerCase() === 'black') {
      btnLeft.textContent = 'Greyscale';
    } else if (e.target.textContent.toLowerCase() === 'greyscale') {
      btnLeft.textContent = 'RGB';
    } else if (e.target.textContent.toLowerCase() === 'rgb') {
      btnLeft.textContent = 'Black';
    } 
});

function fillGreyscale(target) {
    const currentColor = target.style.backgroundColor || 'rgb(255, 255, 255)';
    const rgbValue = parseInt(currentColor.slice(4, 7));
    const darkenColor = Math.floor(rgbValue - (rgbValue * .1));
    target.style.backgroundColor =
        `rgb(${darkenColor}, ${darkenColor}, ${darkenColor})`;
}
function fillBlack(target) {
  target.style.backgroundColor = 'rgb(0, 0, 0)';
}
function fillRgb(target) {
  target.style.backgroundColor = 'rgb(0, 0, 0)';
}