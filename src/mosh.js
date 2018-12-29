const fs = require('fs');
const { dialog } = require('electron').remote

const app = document.querySelector('.app');
let width = 1920;
let height = 1050;

const cacheImagePath = `https://source.unsplash.com/random/${width}x${height}`;

// let file = dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
// let fileData = fs.readFileSync(file[0]);

// fs.writeFileSync('./img.png', fileData);

let image = document.createElement('img');
image.id = 'targetImage'
image.src = cacheImagePath;
image.style.display = 'none';
image.style.height = '100vh';


app.appendChild(image);

var options = {
    width,
    height,
    image: '#targetImage',
    app: '.app',
    color: false,
    blendingMode: 'mutiply',
    renderPasses: 0,
    invert: false,
    lineWidth: 1,
    lineType: 'point',
    origin: ['top'],
    renderSize: 'original',
    workers: 70,
    speed: 25,
    turningAngle: 100,
    backgroundColor: 'whitesmoke'
};

let renderer = new Renderer(options);

console.log(window);

setTimeout(() => {
    renderer.save();
}, 60000 * 5);
