function fillScreen(numPixels) {
    console.time('fillScreen');
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
    console.timeEnd('fillScreen');
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

// event delegation
const pixelMouseOver = document.querySelector('.screen');
pixelMouseOver.addEventListener('mouseover', (e) => {
    if (e.target.style.backgroundColor === '') {
        e.target.style.backgroundColor = 'black';
        console.log(e.target.style.backgroundColor);
        e.stopPropagation();
    }
});

btnRight.addEventListener('click', (e) => {
    fillScreen(numPixels);
})