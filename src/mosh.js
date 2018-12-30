const fs = require('fs');
const _ = require('lodash');
const { dialog } = require('electron').remote

const app = document.querySelector('.app');
let width = 1920;
let height = 1050;

function randomValue(min, max) {
    return Math.floor(Math.random() * max) + min
}
 
const cacheImagePath = `https://source.unsplash.com/random/${randomValue(width/4, width)}x${randomValue(height/2, height)}`;

let image = document.createElement('img');
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
    lineType: 'point',
    origin: ['top'],
    renderSize: 'original',
    workers: randomValue(1, 1000),
    speed: randomValue(1, 5000),
    turningAngle: randomValue(1, 1000),
    backgroundColor: 'whitesmoke'
};

let renderer = new Renderer(options);

renderer.start();

setTimeout(() => {
    renderer.save();
}, randomValue(60000 / 100, 60000 * 1));
