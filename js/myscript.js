var app = new Vue({
    el: '#divP',
    data: {
        noix : 0,
        sanctu:0,
        litho : 0,
        hinox : 0,
        subToPay : 0,
        subPaid: 0,
        equiPrixSub: 0,
        stateQuestNoix: "☐",
        stateQuestSanctu: "☐",
        stateQuestLitho: "☐",
        stateQuestHinox: "☐",
        help: false,
        helpMsg : "Aide : OFF",
        helpStyle : {
            color : 'red',
            fontSize : '20px'
        },
        CompleteOneOf: false,
        subSuccess:0,
    }
});

function reloadPaye(){
    app.equiPrixSub = app.subPaid*4.99;
    app.equiPrixSub = Math.round(app.equiPrixSub * 100) / 100
}

function validepaye(){
    if(app.subToPay>0){
        eastereggBG("pensif",3000)
        app.subPaid += app.subToPay;
        app.equiPrixSub += 4.99*app.subToPay;
        app.subToPay=0;
        app.equiPrixSub = Math.round(app.equiPrixSub * 100) / 100
    }
}

function aide(){
    if(app.help){
        app.help = false;
        app.helpStyle.color='red';
        app.helpMsg = "Aide : OFF"
    }else{
        app.help = true;
        app.helpStyle.color='green';
        app.helpMsg = "Aide : ON"
    }
}

function add(type){
    switch (type){
        case 'noix':
            if(app.noix!==900 && app.stateQuestNoix !== "☑"){app.noix++; app.help?app.subToPay+=20:{}}
            if(app.noix===900 && app.stateQuestNoix !== "☑"){ randomizer(20);  app.stateQuestNoix = "☑"; app.CompleteOneOf=true; eastereggBG('dance', 8000);}
            checkend();
            break;
        case 'sanctu':
            if(app.sanctu!==120 && app.stateQuestSanctu !== "☑"){app.sanctu++; app.help?app.subToPay+=20:{}}
            if(app.sanctu===120 && app.stateQuestSanctu !== "☑"){ randomizer(200);  app.stateQuestSanctu = "☑"; app.CompleteOneOf=true; eastereggBG('dance', 8000);}
            checkend();
            break;
        case 'litho':
            if(app.litho!==40 && app.stateQuestLitho !== "☑"){app.litho++; app.help?app.subToPay+=20:{}}
            if(app.litho===40 && app.stateQuestLitho !== "☑"){ randomizer(20);  app.stateQuestLitho = "☑"; app.CompleteOneOf=true; eastereggBG('dance', 8000);}
            if(app.litho===10 || app.litho===20 || app.litho===30 ){
                eastereggBG('smart', 1000);
            }
            checkend();
            break;
        case 'hinox':
            if(app.hinox!==40 && app.stateQuestHinox !== "☑"){app.hinox++; app.help?app.subToPay+=20:{}}
            if(app.hinox===40 && app.stateQuestHinox !== "☑"){ randomizer(20);  app.stateQuestHinox = "☑"; app.CompleteOneOf=true; eastereggBG('fin', 4000);}
            checkend();
            break;
    }
}

function eastereggBG(gifname, timeout){
    console.log("debut");
    document.getElementById("onStream").style.backgroundImage = 'url(./images/'+gifname+'.gif)';
    setTimeout("finEastereggBG()",timeout);
}

function finEastereggBG() {
    console.log("fin");
    document.getElementById("onStream").style.backgroundImage = '';
}

function randomizer(max){
    app.subSuccess = Math.floor(Math.random() * Math.floor(max));
    if(app.subSuccess>10){
        eastereggBG("mort",10000)
    }
    app.subToPay += app.subSuccess;
    setTimeout("timingOut()",20000);
}

function timingOut(){
    app.CompleteOneOf=false;
}

function checkend(){
    if(app.stateQuestHinox === "☑" && app.stateQuestLitho === "☑" &&  app.stateQuestSanctu === "☑" && app.stateQuestNoix === "☑"){
        setTimeout("",20000);
        eastereggBG("FINI",10000)
    }
}

function save(){

    var contentJson = {
        "saveInfos":[
            {"Noix":app.noix, "Sanctuaires":app.sanctu, "Litho":app.litho, "Hinox":app.hinox, "Sub to pay":app.subToPay,"Sub paid":app.subPaid}
        ]
    };

    contentJson = JSON.stringify(contentJson);

    var content = "Noix : "+app.noix+ "\nSanctuaires : "+app.sanctu+"\nLitho : " +app.litho + "\nHinox : " +app.hinox + "\nSub to pay : "+app.subToPay+"\nSub paid : "+app.subPaid
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contentJson));
    element.setAttribute('download', "save.txt");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function readBlob(opt_startByte, opt_stopByte) {

    var files = document.getElementById('files').files;
    if (!files.length) {
        alert('Veuillez choisir une save à charger');
        return;
    }

    var file = files[0];
    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;

    var reader = new FileReader();

    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) {
            loadsavedata(evt.target.result);

        }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);


}

document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
    if (evt.target.tagName.toLowerCase() == 'button') {
        var startByte = evt.target.getAttribute('data-startbyte');
        var endByte = evt.target.getAttribute('data-endbyte');
        readBlob(startByte, endByte);
    }
}, false);

function loadsavedata(contentOfTxt){
    var parsing = JSON.parse(contentOfTxt);
    app.noix = parsing.saveInfos[0].Noix;
    app.sanctu = parsing.saveInfos[0].Sanctuaires;
    app.litho = parsing.saveInfos[0].Litho;
    app.hinox = parsing.saveInfos[0].Hinox;
    app.subToPay = parsing.saveInfos[0]["Sub to pay"];
    app.subPaid = parsing.saveInfos[0]["Sub paid"];
    reloadPaye();
}