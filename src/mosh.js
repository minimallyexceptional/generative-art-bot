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
    color: false,
    blendingMode: 'lighten',
    renderPasses: 0,
    invert: _.sample([true, false]),
    lineWidth: randomValue(0.1, 3),
    lineType: _.sample(['square', 'point', 'smooth']),
    origin: ['top'],
    renderSize: 'original',
    workers: randomValue(1, 500),
    speed: randomValue(1, 20),
    turningAngle: randomValue(1, 180),
    backgroundColor: 'black'
};

let renderer = new Renderer(options).init();

renderer.start();
 
setTimeout(() => {
    renderer.save();
}, randomValue(60000 / 20, 60000 * 1));
