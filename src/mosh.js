const fs = require('fs');
const { dialog } = require('electron').remote

const app = document.querySelector('.app');
const cacheImagePath = 'https://source.unsplash.com/random/1920x1050';

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
    image: '#targetImage',
    color: false,
    blendingMode: 'lighten',
    renderPasses: 0,
    invert: false,
    lineWidth: 1,
    lineType: 'point',
    origin: ['top'],
    renderSize: 'original',
    workers: 70,
    speed: 25,
    turningAngle: 100
};

let renderer = new Renderer(options);

renderer.start();

setInterval(() => {
    location.reload();
}, 60000 * 5);
