const express   = require('express');
const fs        = require('fs');
const io        = require('socket.io');
const NWebcam   = require('node-webcam');

exports.Network = class Network {
    constructor(PORT){
        this.app       = express();
        // Staticページの有効化
        this.app.use(express.static('static'));
        
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.app.get('/ready', (req, res) => {
            exec('ffmpeg -rtbufsize 30M -f dshow -i video="Logicool HD Webcam C270" -ss 0 -f segment -segment_time 5 -vcodec libx264 -vf format=yuv420p,fps=30 %01d.mp4 -y',(err, stdout, stderr) => {
                if (err) {
                    console.error(`exec error: ${err}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            });
            res.send('OK')
            console.log('ffmpeg...');
        });

        this.app.get('/stream/:id', (req, res) => {
            if(req.params.id === 1182828){
                setTimeout(() =>{
                    const path = '0.mp4'
                    const head = {
                    //'Content-Length': fileSize,
                    'Content-Type': 'video/mp4'
                    }
                    res.writeHead(200, head)
                    fs.createReadStream(path).pipe(res)
                },5500)
            } else {
                const path =  req.params.id + '.mp4'
                const head = {
                //'Content-Length': fileSize,
                'Content-Type': 'video/mp4'
                }
                res.writeHead(200, head)
                fs.createReadStream(path).pipe(res)
            }

        });
        this.app.get('/stream/start/:id', (req, res) => {
            
                const path = 'sample.mp4'
                const head = {
                //'Content-Length': fileSize,
                'Content-Type': 'video/mp4'
                }
                res.writeHead(200, head)
                fs.createReadStream(path).pipe(res)
            
        });


        // API
        this.app.use('/api/result/:id', (req, res) => {
            console.log('API V1 : GET RESULT ' + req.params.id);
            res.send(JSON.parse(fs.readFileSync('example.json')));
        });

        this.app.use('/api/v1/ping', (req, res) => {
            res.send('pong');
        });

        this.app.listen(PORT, function () {
            console.log('WindFall SkyCanvas listening on port 3001!');
        });
    }    
}

if(!module.parent){
    server = new exports.Network(3001);
}