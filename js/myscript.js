var app = new Vue({
    el: "#divP",
    data: {
        subToPay : 0,
        subPaid: 0,
        equiPrixSub: 0,
        help: false,
        helpMsg : "Aide : OFF",
        helpStyle : {
            color : "red",
            fontSize : "20px"
        },
        CompleteOneOf: false,
        subSuccess:0,
        items_add_moins : {
            "Noix" :
            {
                display_name : "Noix",
                recolte : 0,
                max : 900,
                ifHelptoPay : 5,
                randomizeCompleteMax : 20,
                state : "☐"
            },
            "Sanctuaires" : {
                display_name : "Sanctuaires",
                recolte : 0,
                max : 120,
                ifHelptoPay : 15,
                randomizeCompleteMax : 200,
                state : "☐"
            },
            "Lithoroks" : {
                display_name : "Lithoroks",
                recolte : 0,
                max : 40,
                ifHelptoPay : 20,
                randomizeCompleteMax : 20,
                state : "☐"
            },
            "Hinox" : {
                display_name : "Hinox",
                recolte : 0,
                max : 40,
                ifHelptoPay : 10,
                randomizeCompleteMax : 20,
                state : "☐"
            }
        }
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
        add: function (itemToModif) {
            const item = this.items_add_moins[itemToModif];
            if (item.recolte < item.max && item.state !== "☑") {
                item.recolte++;
                this.help ? this.subToPay += item.ifHelptoPay : {};
            }
            if (item.recolte  === item.max && item.state !== "☑") {
                this.randomizer(item.randomizeCompleteMax);
                item.state = "☑";
                this.CompleteOneOf = true;
                eastereggBG("dance", 8000);
            }
            this.checkend();

        },
        randomizer : function(max){
            this.subSuccess = Math.floor(Math.random() * Math.floor(max));
            if(this.subSuccess>10){
                eastereggBG("mort",10000);
            }
            this.subToPay += this.subSuccess;
            setTimeout("app.CompleteOneOf=false;",20000);
        },
        moins: function (itemToModif) {
            const item = this.items_add_moins[itemToModif];
            if (item.recolte !== 0) {
                if (item.state === "☑" && this.subToPay !== 0) {
                    this.subToPay -= this.subSuccess;
                }
                item.recolte--;
                item.state = "☐";
                if (this.subToPay !== 0) {
                    this.help ? this.subToPay -= item.ifHelptoPay : {};
                }
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
            if (this.items_add_moins.Hinox.state === "☑" && this.items_add_moins.Lithoroks.state === "☑" && this.items_add_moins.Sanctuaires.state === "☑" && this.items_add_moins.Noix.state === "☑") {
                setTimeout("", 20000);
                eastereggBG("FINI", 10000);
            }
        }
    },
    mounted() {
        if(localStorage.subToPay){this.subToPay = parseInt(localStorage.subToPay);}
        if(localStorage.subPaid){this.subPaid = parseInt(localStorage.subPaid);}
        if(localStorage.equiPrixSub){this.equiPrixSub = parseInt(localStorage.equiPrixSub);}
        if(localStorage.items_add_moins){
            for(let item in JSON.parse(localStorage.items_add_moins)){
                this.items_add_moins[item] = JSON.parse(localStorage.items_add_moins)[item];
            }
        }
    },
    watch: {
        subToPay(newSubToPay) {
            localStorage.subToPay = newSubToPay;
        },
        subPaid(newSubPaid) {
            localStorage.subPaid = newSubPaid;
        },
        equiPrixSub(newEquiPrixSub) {
            localStorage.equiPrixSub = newEquiPrixSub;
        },
        items_add_moins : {
            handler(val){
                localStorage.setItem('items_add_moins', JSON.stringify(val));
            },
            deep: true
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