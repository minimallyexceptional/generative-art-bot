class Renderer {
    constructor(options) {
        this.options = null;
        this.image = options.image;
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
        this.init();
    }

    findColorMode (bool) {
        if (bool) { return 'color' }
        else { return 'greyscale' }
    }

    findInversionMode (bool) {
        if (bool) { return 'low' }
        else { return 'high' }
    }

    mapOptions () {
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
            turningAngle: this.turningAngle
        }
    }

    init () {
        this.node = document.querySelector(this.image);
        this.node.style.display = 'none';
        this.options = this.mapOptions();

        this. chromata = new Chromata(this.node, this.options);
    }

    start () {
        // this.node.style.display = 'block';
        this.chromata.start();
    }

    pause () {
        this.chromata.toggle();
    }

    stop () {
        this.chromata.stop();
    }

    reset () {
        this.chromata.reset();
    }
}