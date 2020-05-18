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
        reloadPaye: function () {
            this.equiPrixSub = this.subPaid * 4.99;
            this.equiPrixSub = Math.round(this.equiPrixSub * 100) / 100;
        },
        aide: function () {
            if (this.help) {
                this.help = false;
                this.helpStyle.color = "red";
                this.helpMsg = "Aide : OFF";
            } else {
                this.help = true;
                this.helpStyle.color = "green";
                this.helpMsg = "Aide : ON";
            }
        },
        add: function (type) {
            switch (type) {
                case "noix":
                    if (this.noix < 900 && this.stateQuestNoix !== "☑") {
                        this.noix++;
                        this.help ? this.subToPay += 5 : {};
                    }
                    if (this.noix === 900 && this.stateQuestNoix !== "☑") {
                        this.randomizer(20);
                        this.stateQuestNoix = "☑";
                        this.CompleteOneOf = true;
                        eastereggBG("dance", 8000);
                    }
                    this.checkend();
                    break;
                case "sanctu":
                    if (this.sanctu < 120 && this.stateQuestSanctu !== "☑") {
                        this.sanctu++;
                        this.help ? this.subToPay += 15 : {};
                    }
                    if (this.sanctu === 120 && this.stateQuestSanctu !== "☑") {
                        this.randomizer(200);
                        this.stateQuestSanctu = "☑";
                        this.CompleteOneOf = true;
                        eastereggBG("dance", 8000);
                    }
                    this.checkend();
                    break;
                case "litho":
                    if (this.litho < 40 && this.stateQuestLitho !== "☑") {
                        this.litho++;
                        this.help ? this.subToPay += 20 : {};
                    }
                    if (this.litho === 40 && this.stateQuestLitho !== "☑") {
                        this.randomizer(20);
                        this.stateQuestLitho = "☑";
                        this.CompleteOneOf = true;
                        eastereggBG("dance", 8000);
                    }
                    if (this.litho === 10 || this.litho === 20 || this.litho === 30) {
                        eastereggBG('smart', 1000);
                    }
                    this.checkend();
                    break;
                case "hinox":
                    if (this.hinox < 40 && this.stateQuestHinox !== "☑") {
                        this.hinox++;
                        this.help ? this.subToPay += 10 : {};
                    }
                    if (this.hinox === 40 && this.stateQuestHinox !== "☑") {
                        this.randomizer(20);
                        this.stateQuestHinox = "☑";
                        this.CompleteOneOf = true;
                        eastereggBG("fin", 4000);
                    }
                    this.checkend();
                    break;
            }
        },
        randomizer : function(max){
            this.subSuccess = Math.floor(Math.random() * Math.floor(max));
            if(this.subSuccess>10){
                eastereggBG("mort",10000);
            }
            this.subToPay += this.subSuccess;
            setTimeout("app.CompleteOneOf=false;",20000);
        },
        moins: function (type) {
            switch (type) {
                case "noix":
                    if (this.noix !== 0) {
                        if (this.stateQuestNoix === "☑" && this.subToPay !== 0) {
                            this.subToPay -= this.subSuccess;
                        }
                        this.noix--;
                        this.stateQuestNoix = "☐";
                        if (this.subToPay !== 0) {
                            this.help ? this.subToPay -= 5 : {};
                        }
                    }
                    break;
                case "sanctu":
                    if (this.sanctu !== 0) {
                        if (this.stateQuestSanctu === "☑" && this.subToPay !== 0) {
                            this.subToPay -= this.subSuccess;
                        }
                        this.sanctu--;
                        this.stateQuestSanctu = "☐";
                        if (this.subToPay !== 0) {
                            this.help ? this.subToPay -= 15 : {};
                        }
                    }
                    break;
                case "litho":
                    if (this.litho !== 0) {
                        if (this.stateQuestLitho === "☑" && this.subToPay !== 0) {
                            this.subToPay -= this.subSuccess;
                        }
                        this.litho--;
                        this.stateQuestLitho = "☐";
                        if (this.subToPay !== 0) {
                            this.help ? this.subToPay -= 20 : {};
                        }
                    }
                    break;
                case "hinox":
                    if (this.hinox !== 0) {
                        if (this.stateQuestHinox === "☑" && this.subToPay !== 0) {
                            this.subToPay -= this.subSuccess;
                        }
                        this.hinox--;
                        this.stateQuestHinox = "☐";
                        if (this.subToPay !== 0) {
                            this.help ? app.subToPay -= 10 : {};
                        }
                    }
                    break;
            }
        },
        validepaye: function () {
            if (this.subToPay > 0) {
                eastereggBG("pensif", 3000);
                this.subPaid += app.subToPay;
                this.equiPrixSub += 4.99 * app.subToPay;
                this.subToPay = 0;
                this.equiPrixSub = Math.round(app.equiPrixSub * 100) / 100;
            }
        },
        checkend : function(){
            if (this.stateQuestHinox === "☑" && this.stateQuestLitho === "☑" && this.stateQuestSanctu === "☑" && this.stateQuestNoix === "☑") {
                setTimeout("", 20000);
                eastereggBG("FINI", 10000);
            }
        }
    },
    mounted() {
        if(localStorage.noix){this.noix = localStorage.noix;}
        if(localStorage.sanctu){this.sanctu = localStorage.sanctu;}
        if(localStorage.litho){this.litho = localStorage.litho;}
        if(localStorage.hinox){this.hinox = localStorage.hinox;}
        if(localStorage.subToPay){this.subToPay = parseInt(localStorage.subToPay);}
        if(localStorage.subPaid){this.subPaid = parseInt(localStorage.subPaid);}
        if(localStorage.equiPrixSub){this.equiPrixSub = parseInt(localStorage.equiPrixSub);}
        if(localStorage.stateQuestNoix){this.stateQuestNoix = localStorage.stateQuestNoix;}
        if(localStorage.stateQuestSanctu){this.stateQuestSanctu = localStorage.stateQuestSanctu;}
        if(localStorage.stateQuestLitho){this.stateQuestLitho = localStorage.stateQuestLitho;}
        if(localStorage.stateQuestHinox){this.stateQuestHinox = localStorage.stateQuestHinox;}
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
        },
        stateQuestNoix(newStateQuestNoix) {
            localStorage.stateQuestNoix = newStateQuestNoix;
        },
        stateQuestSanctu(newstateQuestSanctu) {
            localStorage.stateQuestSanctu = newstateQuestSanctu;
        },
        stateQuestLitho(newstateQuestLitho) {
            localStorage.stateQuestLitho = newstateQuestLitho;
        },
        stateQuestHinox(newstateQuestHinox) {
            localStorage.stateQuestHinox = newstateQuestHinox;
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