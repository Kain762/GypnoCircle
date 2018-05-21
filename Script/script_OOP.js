window.onload = init;

function init(){
    var image = document.getElementsByTagName("img")
    //основной процесс
    controll.initID(image);   

    //таймер проверки
    var timerCheck = setInterval(logic.checkColor(image), model.multipl);

    //обработка спот-кнопки
    var butStop = document.getElementById("butStop");
    butStop.onclick = function(){
        logic.stopTimer(model.timerMass.length);
        model.timerMass = 0;

    };

    //обработка старт-кнопки
    var butStart = document.getElementById("butStart");
    butStart.onclick = function(){
        model.timerMass = [];

        controll.initID(image);
    };
    //остоновка таймера по клику
    controll.initClick(image);
}


var model = {
    timerMass: new  Array(),
    multipl: 250,
    massColor: ["image/red.png",
                "image/black.png",
                "image/green.png",
                "image/blue.png",
                "image/yellow.png",
                "image/blue_2.png",
                "image/green_2.png",
                "image/yellow_2.png"],
    counter: 0

}

var controll = {
    initID: function(image){
      //  var image = document.getElementsByTagName("img");
        console.log("initID");

        for (var i = 0;i < image.length ;i++) {
            var numID = "img" + i;

            image[i].id =  numID;
            console.log(numID);
            this.initTimer(numID);
        }
    },

    initTimer: function(strID){
        console.log("initTimer");

        var interval = Math.floor(Math.random() * 8) + 1;
        interval *= model.multipl;

        var timerID = setInterval(logic.SSColor, interval, strID);

        //var timerObj = {timer: timerID,
        //                flagPlay: true
        //};

        var numID = Number(strID.substr(3))

        model.timerMass.push({});

        model.timerMass[numID].timer = timerID;
        model.timerMass[numID].flagPlay = true;
        console.log(model.timerMass.length + " interval: " + interval);
    },

    initClick: function (image) {
        for(var i = 0;i < image.length;i++) {
            image[i].onclick = logic.freez;
        }
    }

}

var logic = {
    
    SSColor: function(strID){
        var flag = true;
        var image = document.getElementById(strID);

        do{
            var randColor = Math.floor(Math.random() * model.massColor.length);
            if(image.src.indexOf(model.massColor[randColor]) >= 0 ){
                continue;
            } else {
                flag = false;
                image.src = model.massColor[randColor];
            }
        }while(flag);
        //model.counter++;
        //console.log(model.counter);
    },

    stopTimer: function(numTimer){
        for(var i = 0;i<numTimer ;i++){
            clearInterval(model.timerMass[i].timer);
            model.timerMass[i].flagPlay = false;
        };
    },

    checkColor: function(image){
        var firstImage = image[0].src;
        for (var i = 1 ;i < image.length ;i++){
            if(firstImage !== image[i].src){
                return;
            }
        }
        console.log("!@!@!@!@!@!@@!@!@!@!@!@");
    },

    freez: function (event) {
        var numID = event.target.id;
        numID = numID.substr(3);

        console.log(model.timerMass[numID].timer);

        if (model.timerMass[numID].flagPlay){
            clearInterval(model.timerMass[numID].timer);
            model.timerMass[numID].flagPlay = false;
            console.log(numID + " timer stop");
        } else {
            event.target.onclick = controll.initTimer(event.target.id);
            model.timerMass[numID].flagPlay = true;
            console.log(numID + " timer start");
        }





    }
}