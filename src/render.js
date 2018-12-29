const axios = require('axios');
const request = require("request");
const uuid = require('uuid');

class Renderer {
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
            turningAngle: this.turningAngle,
            backgroundColor: this.backgroundColor
        }
    }

    init () {
        this.node = document.querySelector(this.image);
        this.node.style.display = 'none';
        this.options = this.mapOptions();

        this. chromata = new Chromata(this.node, this.options);

        this.chromata.start();
        setTimeout(() => {
            this.start();
        }, 1500 );
    }

    start () {
        // this.node.style.display = 'block';
        const canvas = document.querySelector(`${this.app} canvas`);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0,0, this.width, this.height);
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

    save () {
        const canvas = document.querySelector(`${this.app} canvas`);

        let data = canvas.toDataURL('image/jpeg');
        let that = this;

        this.auth()
        .then((res, err) => {
            if (res) {
                that.authToken = res.data.access_token;
            }
        })
        .then(() => {
            console.log('ACESS TOKEN ', this.authToken);
            this.upload(data, this.authToken, this.client_id);
        });
    }

    auth () {
        this.token_url = 'https://api.imgur.com/oauth2/token';
        this.client_id = '1225fd4beff5acd';
        this.client_secret = 'd12a7cef58336728cfb69b6dd7bb5c7835b3a7d4';
        this.refresh_token = '59191e3710274b5615695fdd429f01c9b4c2ee9b';
        this.grant_type = 'refresh_token';



        return axios.post(this.token_url, {
                refresh_token: this.refresh_token,
                client_id: this.client_id,
                client_secret: this.client_secret,
                grant_type: this.grant_type
        });
        
    }

    upload (imageData, authToken, clientId) {
        let album  = '9FN8Qgk'
        let url = `https://api.imgur.com/3/image`
        let data = imageData.split(',')[1].toString();

        var jar = request.jar();
        jar.setCookie(request.cookie("IMGURSESSION=dead091ec35fed4edfa2326c5bee9aae"), "https://api.imgur.com/3/image");
        jar.setCookie(request.cookie("_nc=1"), "https://api.imgur.com/3/image");
        
        var options = { method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers:
           { authorization: 'Bearer 80c1a619c04989325987cd94d31ecb48b4dbf1e3',
             'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
          formData:
           { image: data,
             album: '9FN8Qgk',
             type: 'base64',
             name: uuid.v4(),
             title: '',
             description: '' },
          jar: 'JAR' };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          console.log(body);
          location.reload();
        });
        

    }
}