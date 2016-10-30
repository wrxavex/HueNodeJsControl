var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var async = require('async');





var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    // console.log(JSON.stringify(result, null, 2));
};

var displayError = function(err) {
    console.error(err);
};

var displayStatus = function(status) {
    console.log(status.state.on);
};

var hostname = "192.168.1.178",
    username = "YxPYRWNawywC-sKHkjuRho7iOwMMSrn3di2ETF74",
    api = new HueApi(hostname, username),
    state = lightState.create();

var light9_status = 0;


function light_on(i) {
    if(i>8){
        setTimeout(function(){
            api.setLightState(i, state.on())
                .then(displayResult)
                .fail(displayError)
                .done();
            console.log('on');
            console.log(i);
        }, (i-8) * 150);
    }
    else{
        setTimeout(function(){
            api.setLightState(i, state.on())
                .then(displayResult)
                .fail(displayError)
                .done();
            console.log('on');
            console.log(i);
        }, (i) * 150);
    }

}

function light_off(i) {
    if (i>8){
        setTimeout(function(){
            api.setLightState(i, state.off())
                .then(displayResult)
                .fail(displayError)
                .done();
            console.log('off');
            console.log(i);
        }, (i-8) * 150);
    }
    else{
        setTimeout(function(){
            api.setLightState(i, state.off())
                .then(displayResult)
                .fail(displayError)
                .done();
            console.log('off');
            console.log(i);
        }, (i) * 150);
    }

}

function light_dark(i) {
    setTimeout(function(){
        api.setLightState(i, state.bri(1))
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('dark');
        console.log(i);
    }, (i-8) * 150);
}


function light_alert(i) {
        api.setLightState(i, state.shortAlert())
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('alert');
        console.log(i);
}

function light_bright(i) {
    setTimeout(function(){
        api.setLightState(i, state.bri(255))
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('dark');
        console.log(i);
    }, (i-8) * 150 + 300);
}

function light_blue(i) {
    setTimeout(function(){
        api.setLightState(i, state.hue(50000- 500 * i))
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('blue'+i);
    }, (i-8) * 250);
}

function light_white(i) {
    setTimeout(function(){
        api.setLightState(i, state.hue(30000+ 500 * i))
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('white');
        console.log(i);
    }, (i-8) * 250 + 500);

}

function light_sat_low(i) {
    setTimeout(function(){
        api.setLightState(i, state.sat(1))
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('sat low' + i);
    }, (i-8) * 150)
}


function light_sat_high(i) {
    setTimeout(function(){
        api.setLightState(i, state.sat(255))
            .then(displayResult)
            .fail(displayError)
            .done();
        console.log('sat high' + i);
    }, (i-8) * 150)
}

function light_hue(i, value) {
    api.setLightState(i, state.hue(value))
        .then(displayResult)
        .fail(displayError)
        .done();
    console.log(i + ' hue set to ' + value);
}

function light_run() {
        for (i = 9; i <= 15; i++) {
            light_blue(i);
            light_white(i);
        }
}



function light_open() {
    for (i = 9; i<=15; i++){
        light_on(i);
    }
}

function light_top_open() {
    for (i = 1; i<=6; i++){
        light_on(i);
    }
}

function light_close() {
    for (i = 9; i<=15; i++){
        light_off(i);
    }
}

function light_top_close() {
    for (i = 1; i<=6; i++){
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

function alert_9_15(){
    async.series([
        function(callback) {
            setTimeout(function() {
                light_alert(9);
                console.log('alert 9');
                callback(null, 9);
            }, 0);
        },
        function(callback) {
            setTimeout(function() {
                light_alert(10);
                console.log('alert 10');
                callback(null, 10);
            }, 150);
        },

        function(callback) {
            setTimeout(function() {
                light_alert(11);
                console.log('alert 11');
                callback(null, 11);
            }, 150);
        },

        function(callback) {
            setTimeout(function() {
                light_alert(12);
                console.log('alert 12');
                callback(null, 12);
            }, 150);
        },

        function(callback) {
            setTimeout(function() {
                light_alert(13);
                console.log('alert 13');
                callback(null, 13);
            }, 150);
        },

        function(callback) {
            setTimeout(function() {
                light_alert(14);
                console.log('alert 14');
                callback(null, 14);
            }, 150);
        },

        function(callback) {
            setTimeout(function() {
                light_alert(15);
                console.log('alert 15');
                callback(null, 15);
            }, 150);
        }
    ], function(error, results) {
        console.log(results);
    });
}

function light_loop(i, delaytime){
    async.series([
        function(callback) {
            setTimeout(function() {
                light_alert(i);
                callback(null, "alert");
            }, 0);
        },


        function(callback) {
            setTimeout(function() {
                light_hue(i, 60000);
                callback(null, 60000);
            }, 2000);
        },
        function(callback) {
            setTimeout(function() {
                light_hue(i, 30000);
                callback(null, 30000);
            }, 2000);
        }
    ], function(error, results) {
        console.log(results);
        light_loop(i);
    });
}
//
// async.series([
//     function(callback) {
//         setTimeout(function() {
//             light_loop(9);
//             callback(null, 9);
//         }, 300);
//     },
//     function(callback) {
//         setTimeout(function() {
//             light_loop(10);
//             callback(null, 10);
//         }, 300);
//     },
//     function(callback) {
//         setTimeout(function () {
//             light_loop(11);
//             callback(null, 11);
//         }, 300);
//     },
//     function(callback) {
//         setTimeout(function () {
//             light_loop(12);
//             callback(null, 12);
//         }, 300);
//     },
//     function(callback) {
//         setTimeout(function () {
//             light_loop(13);
//             callback(null, 13);
//         }, 300);
//     },
//     function(callback) {
//         setTimeout(function () {
//             light_loop(14);
//             callback(null, 14);
//         }, 300);
//     },
//     function(callback) {
//         setTimeout(function() {
//             light_loop(15);
//             callback(null, 15);
//         }, 300);
//     }
//
//     ], function(error, results){
//    console.log(results);
// });

function switch_1_action(status){
    if (status.state.on){
        light_off(1);
        io.emit('light_1', 'off');
    }
    if (status.state.on == false){
        light_on(1);
        io.emit('light_1', 'on');
    }
}

function switch_2_action(status){
    if (status.state.on){
        light_off(2);
        io.emit('light_2', 'off');
    }
    if (status.state.on == false){
        light_on(2);
        io.emit('light_2', 'on');
    }
}

function switch_3_action(status){
    if (status.state.on){
        light_off(3);
        io.emit('light_3', 'off');
    }
    if (status.state.on == false){
        light_on(3);
        io.emit('light_3', 'on');
    }
}

function switch_4_action(status){
    if (status.state.on){
        light_off(4);
        io.emit('light_4', 'off');
    }
    if (status.state.on == false){
        light_on(4);
        io.emit('light_4', 'on');
    }
}

function switch_5_action(status){
    if (status.state.on){
        light_off(5);
        io.emit('light_5', 'off');
    }
    if (status.state.on == false){
        light_on(5);
        io.emit('light_5', 'on');
    }
}

function switch_6_action(status){
    if (status.state.on){
        console.log('light is on now ');
        light_off(6);
        io.emit('light_6', 'off');
        console.log('light is change to off');
    }
    if (status.state.on == false){
        console.log('light is off now');
        light_on(6);
        io.emit('light_6', 'on');
        console.log('light is change to on');
    }
}

function switch_7_action(status){
    if (status.state.on){
        light_off(7);
        io.emit('light_7', 'off');
    }
    if (status.state.on == false){
        light_on(7);
        io.emit('light_7', 'on');
    }
}

function switch_8_action(status){
    if (status.state.on){
        light_off(8);
        io.emit('light_8', 'off');
    }
    if (status.state.on == false){
        light_on(8);
        io.emit('light_8', 'on');
    }
}

function switch_9_action(status){
    if (status.state.on){
        console.log('light is on now ');
        light_off(9);
        io.emit('light_9', 'off');
        console.log('light is change to off');
    }
    if (status.state.on == false){
        console.log('light is off now');
        light_on(9);
        io.emit('light_9', 'on');
        console.log('light is change to on');
    }
}

function switch_10_action(status){
    if (status.state.on){
        light_off(10);
        io.emit('light_10', 'off');
    }
    if (status.state.on == false){
        light_on(10);
        io.emit('light_10', 'on');
    }
}

function switch_11_action(status){
    if (status.state.on){
        light_off(11);
        io.emit('light_11', 'off');
    }
    if (status.state.on == false){
        light_on(11);
        io.emit('light_11', 'on');
    }
}

function switch_12_action(status){
    if (status.state.on){
        light_off(12);
        io.emit('light_12', 'off');
    }
    if (status.state.on == false){
        light_on(12);
        io.emit('light_12', 'on');
    }
}

function switch_13_action(status){
    if (status.state.on){
        light_off(13);
        io.emit('light_13', 'off');
    }
    if (status.state.on == false){
        light_on(13);
        io.emit('light_13', 'on');
    }
}

function switch_14_action(status){
    if (status.state.on){
        light_off(14);
        io.emit('light_14', 'off');
    }
    if (status.state.on == false){
        light_on(14);
        io.emit('light_14', 'on');
    }
}

function switch_15_action(status){
    if (status.state.on){
        light_off(15);
        io.emit('light_15', 'off');
    }
    if (status.state.on == false){
        light_on(15);
        io.emit('light_15', 'on');
    }
}


function switch_1(){
    api.lightStatus(1)
        .then(switch_1_action)
        .done();
    console.log('get switch 1');
}
function switch_2(){
    api.lightStatus(2)
        .then(switch_2_action)
        .done();
    console.log('get switch 2');
}
function switch_3(){
    api.lightStatus(3)
        .then(switch_3_action)
        .done();
    console.log('get switch 3');
}
function switch_4(){
    api.lightStatus(4)
        .then(switch_4_action)
        .done();
    console.log('get switch 4');
}
function switch_5(){
    api.lightStatus(5)
        .then(switch_5_action)
        .done();
    console.log('get switch 5');
}

function switch_6(){
    api.lightStatus(6)
        .then(switch_6_action)
        .done();
    console.log('get switch 6');
}

function switch_7(){
    api.lightStatus(7)
        .then(switch_7_action)
        .done();
    console.log('get switch 7');
}

function switch_8(){
    api.lightStatus(8)
        .then(switch_8_action)
        .done();
    console.log('get switch 8');
}

function switch_9(){
    api.lightStatus(9)
        .then(switch_9_action)
        .done();
    console.log('get switch 9');
}

function switch_10(){
    api.lightStatus(10)
        .then(switch_10_action)
        .done();
    console.log('get switch 10');
}
function switch_11(){
    api.lightStatus(11)
        .then(switch_11_action)
        .done();
    console.log('get switch 11');
}
function switch_12(){
    api.lightStatus(12)
        .then(switch_12_action)
        .done();
    console.log('get switch 12');
}

function switch_13(){
    api.lightStatus(13)
        .then(switch_13_action)
        .done();
    console.log('get switch 13');
}

function switch_14(){
    api.lightStatus(14)
        .then(switch_14_action)
        .done();
    console.log('get switch 14');
}

function switch_15(){
    api.lightStatus(15)
        .then(switch_15_action)
        .done();
    console.log('get switch 15');
}

function callback_light_1(status){
    if (status.state.on){
        io.emit('light_1', 'on');
        console.log('init 1 on ');
    }
    if (status.state.on == false){
        io.emit('light_1', 'off');
        console.log('init 1 on ');
    }
}

function callback_light_2(status){
    if (status.state.on){
        io.emit('light_2', 'on');
        console.log('init 2 on ');
    }
    if (status.state.on == false){
        io.emit('light_2', 'off');
        console.log('init 2 on ');
    }
}

function callback_light_3(status){
    if (status.state.on){
        io.emit('light_3', 'on');
        console.log('init 3 on ');
    }
    if (status.state.on == false){
        io.emit('light_3', 'off');
        console.log('init 3 on ');
    }
}

function callback_light_4(status){
    if (status.state.on){
        io.emit('light_4', 'on');
        console.log('init 4 on ');
    }
    if (status.state.on == false){
        io.emit('light_4', 'off');
        console.log('init 4 on ');
    }
}

function callback_light_5(status){
    if (status.state.on){
        io.emit('light_5', 'on');
        console.log('init 5 on ');
    }
    if (status.state.on == false){
        io.emit('light_5', 'off');
        console.log('init 5 on ');
    }
}

function callback_light_6(status){
    if (status.state.on){
        io.emit('light_6', 'on');
        console.log('init 6 on ');
    }
    if (status.state.on == false){
        io.emit('light_6', 'off');
        console.log('init 6 on ');
    }
}

function callback_light_7(status){
    if (status.state.on){
        io.emit('light_7', 'on');
        console.log('init 7 on ');
    }
    if (status.state.on == false){
        io.emit('light_7', 'off');
        console.log('init 7 on ');
    }
}

function callback_light_8(status){
    if (status.state.on){
        io.emit('light_8', 'on');
        console.log('init 8 on ');
    }
    if (status.state.on == false){
        io.emit('light_8', 'off');
        console.log('init 8 on ');
    }
}

function callback_light_9(status){
    if (status.state.on){
        io.emit('light_9', 'on');
        console.log('init 9 on ');
    }
    if (status.state.on == false){
        io.emit('light_9', 'off');
        console.log('init 9 on ');
    }
}

function callback_light_10(status){
    if (status.state.on){
        io.emit('light_10', 'on');
        console.log('init 10 on ');
    }
    if (status.state.on == false){
        io.emit('light_10', 'off');
        console.log('init 10 on ');
    }
}

function callback_light_11(status){
    if (status.state.on){
        io.emit('light_11', 'on');
        console.log('init 11 on ');
    }
    if (status.state.on == false){
        io.emit('light_11', 'off');
        console.log('init 11 on ');
    }
}

function callback_light_12(status){
    if (status.state.on){
        io.emit('light_12', 'on');
        console.log('init 12 on ');
    }
    if (status.state.on == false){
        io.emit('light_12', 'off');
        console.log('init 12 on ');
    }
}

function callback_light_13(status){
    if (status.state.on){
        io.emit('light_13', 'on');
        console.log('init 13 on ');
    }
    if (status.state.on == false){
        io.emit('light_13', 'off');
        console.log('init 13 on ');
    }
}

function callback_light_14(status){
    if (status.state.on){
        io.emit('light_14', 'on');
        console.log('init 14 on ');
    }
    if (status.state.on == false){
        io.emit('light_14', 'off');
        console.log('init 14 on ');
    }
}

function callback_light_15(status){
    if (status.state.on){
        io.emit('light_15', 'on');
        console.log('init 15 on ');
    }
    if (status.state.on == false){
        io.emit('light_15', 'off');
        console.log('init 15 on ');
    }
}

function check_light_1(){
    api.lightStatus(1)
        .then(callback_light_1)
        .done();
    console.log('check 1');
}

function check_light_2(){
    api.lightStatus(2)
        .then(callback_light_2)
        .done();
    console.log('check 2');
}

function check_light_3(){
    api.lightStatus(3)
        .then(callback_light_3)
        .done();
    console.log('check 3');
}

function check_light_4(){
    api.lightStatus(4)
        .then(callback_light_4)
        .done();
    console.log('check 4');
}

function check_light_5(){
    api.lightStatus(5)
        .then(callback_light_5)
        .done();
    console.log('check 5');
}

function check_light_6(){
    api.lightStatus(6)
        .then(callback_light_6)
        .done();
    console.log('check6');
}
function check_light_7(){
    api.lightStatus(7)
        .then(callback_light_7)
        .done();
    console.log('check 7');
}
function check_light_8(){
    api.lightStatus(8)
        .then(callback_light_8)
        .done();
    console.log('check 8');
}

function check_light_9(){
    api.lightStatus(9)
        .then(callback_light_9)
        .done();
    console.log('check 9');
}

function check_light_10(){
    api.lightStatus(10)
        .then(callback_light_10)
        .done();
    console.log('check 10');
}

function check_light_11(){
    api.lightStatus(11)
        .then(callback_light_11)
        .done();
    console.log('check 11');
}

function check_light_12(){
    api.lightStatus(12)
        .then(callback_light_12)
        .done();
    console.log('check 12');
}
function check_light_13(){
    api.lightStatus(13)
        .then(callback_light_13)
        .done();
    console.log('check 13');
}
function check_light_14(){
    api.lightStatus(14)
        .then(callback_light_14)
        .done();
    console.log('check 14');
}
function check_light_15(){
    api.lightStatus(15)
        .then(callback_light_15)
        .done();
    console.log('check 15');
}

function light_init(){

    setTimeout(function(){
        check_light_1();
    },1*250);
    setTimeout(function(){
        check_light_2();
    },2*250);
    setTimeout(function(){
        check_light_3();
    },3*250);
    setTimeout(function(){
        check_light_4();
    },4*250);
    setTimeout(function(){
        check_light_5();
    },5*250);
    setTimeout(function(){
        check_light_6();
    },6*250);
    setTimeout(function(){
        check_light_7();
    },7*250);
    setTimeout(function(){
        check_light_8();
    },8*250);
    setTimeout(function(){
        check_light_9();
    },9*250);
    setTimeout(function(){
        check_light_10();
    },10*250);
    setTimeout(function(){
        check_light_11();
    },11*250);
    setTimeout(function(){
        check_light_12();
    },12*250);
    setTimeout(function(){
        check_light_13();
    },13*250);
    setTimeout(function(){
        check_light_14();
    },14*250);
    setTimeout(function(){
        check_light_15();
    },15*250);



}


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    light_init();

    socket.on('light_control', function(msg){
        console.log('回傳控制碼: ' + msg);
        if (msg == '1'){
            light_run();
        }
        if(msg == 'on'){
            light_open();
            setTimeout(function(){
                light_init();
            }, 2000);
        }

        if(msg == 'top_on'){
            light_top_open();
            setTimeout(function(){
                light_init();
            }, 2000);
        }

        if (msg == 'off'){
            light_close();
            setTimeout(function(){
                light_init();
            }, 2000);
        }

        if (msg == 'top_off'){
            light_top_close();
            setTimeout(function(){
                light_init();
            }, 2000);
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

        if (msg == 'alert_9_15'){
            alert_9_15();
        }
        if (msg == 'switch_1'){
            switch_1();
        }
        if (msg == 'switch_2'){
            switch_2();
        }
        if (msg == 'switch_3'){
            switch_3();
        }
        if (msg == 'switch_4'){
            switch_4();
        }
        if (msg == 'switch_5'){
            switch_5();
        }

        if (msg == 'switch_6'){
            switch_6();
        }

        if (msg == 'switch_7'){
            switch_7();
        }

        if (msg == 'switch_8'){
            switch_8();
        }

        if (msg == 'switch_9'){
            switch_9();
        }
        if (msg == 'switch_10'){
            switch_10();
        }
        if (msg == 'switch_11'){
            switch_11();
        }
        if (msg == 'switch_12'){
            switch_12();
        }
        if (msg == 'switch_13'){
            switch_13();
        }
        if (msg == 'switch_14'){
            switch_14();
        }
        if (msg == 'switch_15'){
            switch_15();
        }
    });
});



http.listen(8080, '0.0.0.0',  function(){
    console.log('HTTP Server: http://127.0.0.1:8080/');
});