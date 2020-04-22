var app = new Vue({
    el: "#divP",
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
            color : "red",
            fontSize : "20px"
        },
        CompleteOneOf: false,
        subSuccess:0,
    },
    methods: {
        reloadPaye(){
            app.equiPrixSub = app.subPaid*4.99;
            app.equiPrixSub = Math.round(app.equiPrixSub * 100) / 100;
        }
    },
    mounted() {
        if(localStorage.noix){this.noix = localStorage.noix;}
        if(localStorage.sanctu){this.sanctu = localStorage.sanctu;}
        if(localStorage.litho){this.litho = localStorage.litho;}
        if(localStorage.hinox){this.hinox = localStorage.hinox;}
        if(localStorage.subToPay){this.subToPay = localStorage.subToPay;}
        if(localStorage.subPaid){this.subPaid = localStorage.subPaid;}
        if(localStorage.equiPrixSub){this.equiPrixSub = localStorage.equiPrixSub;}
    },
    watch: {
        noix(newNoix) {
            localStorage.noix = newNoix;
        },
        sanctu(newSanctu) {
            localStorage.sanctu = newSanctu;
        },
        litho(newLitho) {
            localStorage.litho = newLitho;
        },
        hinox(newHinox) {
            localStorage.hinox = newHinox;
        },
        subToPay(newSubToPay) {
            localStorage.subToPay = newSubToPay;
        },
        subPaid(newSubPaid) {
            localStorage.subPaid = newSubPaid;
        },
        equiPrixSub(newEquiPrixSub) {
            localStorage.equiPrixSub = newEquiPrixSub;
        }
    }

});

function eastereggBG(gifname, timeout){
    document.getElementById("onStream").style.backgroundImage = 'url(./images/'+gifname+'.gif)';
    setTimeout("finEastereggBG()",timeout);
}

function finEastereggBG() {
    document.getElementById("onStream").style.backgroundImage = "";
}

// verify if all the goals are validated, if true -> play a gif in the background
function checkend(){
    if(app.stateQuestHinox === "☑" && app.stateQuestLitho === "☑" &&  app.stateQuestSanctu === "☑" && app.stateQuestNoix === "☑"){
        setTimeout("",20000);
        eastereggBG("FINI",10000);
    }
}

// function called when the user click on "validation" button
function validepaye(){
    if(app.subToPay>0){
        eastereggBG("pensif",3000);
        app.subPaid += app.subToPay;
        app.equiPrixSub += 4.99*app.subToPay;
        app.subToPay=0;
        app.equiPrixSub = Math.round(app.equiPrixSub * 100) / 100;
    }
}

// control the help part
function aide(){
    if(app.help){
        app.help = false;
        app.helpStyle.color="red";
        app.helpMsg = "Aide : OFF";
    }else{
        app.help = true;
        app.helpStyle.color="green";
        app.helpMsg = "Aide : ON";
    }
}

function add(type){
    switch (type){
        case "noix":
            if(app.noix<900 && app.stateQuestNoix !== "☑"){app.noix++; app.help?app.subToPay+=5:{};}
            if(app.noix===900 && app.stateQuestNoix !== "☑"){ randomizer(20);  app.stateQuestNoix = "☑"; app.CompleteOneOf=true; eastereggBG('dance', 8000);}
            checkend();
            break;
        case "sanctu":
            if(app.sanctu<120 && app.stateQuestSanctu !== "☑"){app.sanctu++; app.help?app.subToPay+=15:{};}
            if(app.sanctu===120 && app.stateQuestSanctu !== "☑"){ randomizer(200);  app.stateQuestSanctu = "☑"; app.CompleteOneOf=true; eastereggBG('dance', 8000);}
            checkend();
            break;
        case "litho":
            if(app.litho<40 && app.stateQuestLitho !== "☑"){app.litho++; app.help?app.subToPay+=20:{};}
            if(app.litho===40 && app.stateQuestLitho !== "☑"){ randomizer(20);  app.stateQuestLitho = "☑"; app.CompleteOneOf=true; eastereggBG('dance', 8000);}
            if(app.litho===10 || app.litho===20 || app.litho===30 ){
                eastereggBG('smart', 1000);
            }
            checkend();
            break;
        case "hinox":
            if(app.hinox<40 && app.stateQuestHinox !== "☑"){app.hinox++; app.help?app.subToPay+=10:{};}
            if(app.hinox===40 && app.stateQuestHinox !== "☑"){ randomizer(20);  app.stateQuestHinox = "☑"; app.CompleteOneOf=true; eastereggBG('fin', 4000);}
            checkend();
            break;
    }
}

function moins(type){
    switch (type){
        case "noix":
            if(app.noix!==0) {
                if(app.stateQuestNoix === "☑" && app.subToPay!==0){
                    app.subToPay -= app.subSuccess;
                }
                app.noix--;
                app.stateQuestNoix = "☐";
                if(app.subToPay!==0) {
                    app.help ? app.subToPay -= 5 : {};
                }
            }
            break;
        case "sanctu":
            if(app.sanctu!==0) {
                if(app.stateQuestSanctu === "☑" && app.subToPay!=0){
                    app.subToPay -= app.subSuccess;
                }
                app.sanctu--;
                app.stateQuestSanctu = "☐";
                if(app.subToPay!==0) {
                    app.help ? app.subToPay -= 15 : {};
                }
            }
            break;
        case "litho":
            if(app.litho!==0){
                if(app.stateQuestLitho === "☑" && app.subToPay!=0){
                    app.subToPay -= app.subSuccess;
                }
                app.litho--;
                app.stateQuestLitho = "☐";
                if(app.subToPay!==0){
                    app.help?app.subToPay-=20:{};
                }
            }
            break;
        case "hinox":
            if(app.hinox!==0) {
                if(app.stateQuestHinox === "☑" && app.subToPay!=0){
                    app.subToPay -= app.subSuccess;
                }
                app.hinox--;
                app.stateQuestHinox = "☐";
                if(app.subToPay!==0){
                    app.help ? app.subToPay -= 10 : {};
                }
            }
            break;
    }
}

// randomize a number between 0 and max.
function randomizer(max){
    app.subSuccess = Math.floor(Math.random() * Math.floor(max));
    if(app.subSuccess>10){
        eastereggBG("mort",10000);
    }
    app.subToPay += app.subSuccess;
    setTimeout("app.CompleteOneOf=false;",20000);
}