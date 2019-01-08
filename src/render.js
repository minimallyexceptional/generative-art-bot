import axios from "axios";
const uuid = require('uuid');

export default class Renderer {
    constructor(options) {
        this.options = null;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
        this.app = options.app;
        this.colorMode = options.color;
        this.compositeOperation = options.blendingMode;
        this.iterationLimit = options.renderPasses;
        this.key = options.invert;
        this.lineWidth = options.lineWidth;
        this.lineMode = options.lineType;
        this.origin = options.origin;
        this.outputSize = options.renderSize;
        this.pathFinderCount = options.workers;
        this.speed = options.speed;
        this.turningAngle = options.turningAngle;
        this.backgroundColor = options.backgroundColor;
    }

    findColorMode(bool) {
        if (bool) { return 'color' }
        else { return 'greyscale' }
    }

    findInversionMode(bool) {
        if (bool) { return 'low' }
        else { return 'high' }
    }

    mapOptions(options) {
        if (options) {
            return {
                colorMode: this.findColorMode(this.colorMode),
                compositeOperation: this.compositeOperation,
                iterationLimit: this.iterationLimit,
                key: this.findInversionMode(this.key),
                lineWidth: this.lineWidth,
                lineMode: this.lineMode,
                origin: this.origin,
                outputSize: this.outputSize,
                pathFinderCount: this.pathFinderCount,
                speed: this.speed,
                turningAngle: this.turningAngle,
                backgroundColor: this.backgroundColor
            };
        }

        return {};
    }

    init() {
        this.node = document.querySelector(this.image);
        this.node.style.display = 'none';
        this.options = this.mapOptions();

        this.chromata = new Chromata(this.node, this.options);
    }

    start() {
        this.chromata.start();
    }

    pause() {
        this.chromata.toggle();
    }

    stop() {
        this.chromata.stop();
    }

    reset() {
        this.chromata.reset();
    }

    save() {
        const canvas = document.querySelector(`${this.app} canvas`);

        let data = canvas.toDataURL('image/jpeg');
        let that = this;

        this.upload(data, this.authToken, this.client_id);
    }

    upload(imageData) {
        let album = '9FN8Qgk'
        let url = `https://api.imgur.com/3/image`
        let imgData = imageData.split(',')[1].toString();

        var data = new FormData();
        data.append("image", imgData)
        data.append("album", album);
        data.append("type", "base64");
        data.append("name", uuid.v4());
        data.append("title", uuid.v4());
        data.append("description", uuid.v4());

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", url);
        xhr.setRequestHeader("authorization", "Bearer 80c1a619c04989325987cd94d31ecb48b4dbf1e3");

        xhr.send(data);

        setTimeout(() => {
            location.reload();
        }, 3000)
    }
}