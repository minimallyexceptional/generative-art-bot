import _ from 'lodash';
import Renderer from './render.js';

const app = document.querySelector('.app');
let width = window.innerWidth;
let height = window.innerHeight;

function randomValue(min, max) {
    return Math.round(Math.floor(Math.random() * max) + min)
}
 
const cacheImagePath = `https://source.unsplash.com/random/`;

let image = document.createElement('img');
image.crossOrigin = "Anonymous";
image.setAttribute('crossOrigin', '');
image.id = 'targetImage'
image.src = cacheImagePath;
image.style.display = 'none';
image.style.height = '100vh';


app.appendChild(image);

console.log(_.sample([true, false]));

var options = {
    width,
    height,
    image: '#targetImage',
    app: '.app',
    color: _.sample([true, false]),
    blendingMode: 'multiply',
    renderPasses: 0,
    invert: _.sample([true, false]),
    lineWidth: randomValue(1, 6),
    lineType: 'square',
    origin: ['top'],
    renderSize: 'original',
    workers: randomValue(1, 1000),
    speed: randomValue(1, 10000),
    turningAngle: randomValue(1, 1000),
    backgroundColor: 'whitesmoke'
};

let renderer = new Renderer(options);

renderer.start();

setTimeout(() => {
    renderer.save();
}, randomValue(60000 / 50, 60000 * 1));
