var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    // console.log(JSON.stringify(result, null, 2));
};

var displayError = function(err) {
    console.error(err);
};


var hostname = "192.168.1.178",
    username = "YxPYRWNawywC-sKHkjuRho7iOwMMSrn3di2ETF74",
    api = new HueApi(hostname, username),
    state = lightState.create();


function light_on(i) {
    setTimeout(function(){
        api.setLightState(i, state.on())
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('on');
        console.log(i);
    }, i * 150);
}

function light_off(i) {
    setTimeout(function(){
        api.setLightState(i, state.off())
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('off');
        console.log(i);
    }, i * 150);
}

function light_dark(i) {
    setTimeout(function(){
        api.setLightState(i, state.bri(1))
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('dark');
        console.log(i);
    }, i * 150);
}

function light_bright(i) {
    setTimeout(function(){
        api.setLightState(i, state.bri(255))
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('dark');
        console.log(i);
    }, i * 150 + 300);
}

function light_blue(i) {
    setTimeout(function(){
        api.setLightState(i, state.hue(50000- 500 * i))
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('blue'+i);
    }, i*250);
}

function light_white(i) {
    setTimeout(function(){
        api.setLightState(i, state.hue(30000+ 500 * i))
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('white');
        console.log(i);
    }, i * 250 + 500);

}

function light_sat_low(i) {
    setTimeout(function(){
        api.setLightState(i, state.sat(1))
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('sat low' + i);
    }, i * 150)
}


function light_sat_high(i) {
    setTimeout(function(){
        api.setLightState(i, state.sat(255))
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('sat high' + i);
    }, i * 150)
}








function light_run() {
    setInterval(function() {
        for (i = 9; i <= 15; i++) {
            light_blue(i);
            light_white(i);
        }
    }, 1800);
}



function light_open() {
    for (i = 9; i<=15; i++){
        light_on(i);
    }
}

function light_close() {
    for (i = 9; i<=15; i++){
        light_off(i);
    }
}

function light_dark_all() {
    for (i = 9; i<=15; i++){
        light_dark(i);
    }
}

function light_bright_all() {
    for (i = 9; i<=15; i++){
        light_bright(i);
    }
}

function light_sat_high_all() {
    for (i = 9; i<=15; i++){
        light_sat_high(i);
    }
}


function light_sat_low_all() {
    for (i = 9; i<=15; i++){
        light_sat_low(i);
    }
}


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('light_control', function(msg){
        console.log('回傳控制碼: ' + msg);
        if (msg == '1'){
            light_run();
        }
        if(msg == 'on'){
            light_open();
        }

        if (msg == 'off'){
            light_close();
        }

        if (msg == 'bright'){
            light_bright_all();
        }

        if(msg == 'dark'){
            light_dark_all();
        }

        if (msg == 'sat high'){
            light_sat_high_all();
        }

        if (msg == 'sat low'){
            light_sat_low_all();
        }
    });
});

http.listen(8080, '127.0.0.1',  function(){
    console.log('HTTP Server: http://127.0.0.1:8080/');
});