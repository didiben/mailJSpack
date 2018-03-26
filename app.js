'use strict'

window.$ = window.jQuery = require('jquery');
const nodemailer = require('nodemailer');
var count = 0;
var data = new Array();
var config = new Array();
var navettesNumber = 0;

function whatDisplay() {
    document.getElementById("subform1").classList.remove('d-none');
    document.getElementById("subform2").classList.remove('d-none');
    document.getElementById("subform3").classList.remove('d-none');
    document.getElementById("subform4").classList.remove('d-none');
    document.getElementById("subform5").classList.remove('d-none');
    document.getElementById("subform6").classList.remove('d-none');
    document.getElementsByClassName("subinput1").required = false;
    document.getElementsByClassName("subinput2").required = false;
    document.getElementsByClassName("subinput3").required = false;
    document.getElementsByClassName("subinput4").required = false;
    document.getElementsByClassName("subinput5").required = false;
    document.getElementsByClassName("subinput6").required = false;
    switch (parseInt(document.getElementById('navettesNumber').value)) {
        case 1:
        document.getElementById("subform2").classList.add('d-none');
        document.getElementById("subform3").classList.add('d-none');
        document.getElementById("subform4").classList.add('d-none');
        document.getElementById("subform5").classList.add('d-none');
        document.getElementById("subform6").classList.add('d-none');
        document.getElementById('emailcontent').style.marginTop = '-60px';
        document.getElementsByClassName("subinput1").required = true;
        navettesNumber = 1;
        break;
        case 2:
        document.getElementById("subform3").classList.add('d-none');
        document.getElementById("subform4").classList.add('d-none');
        document.getElementById("subform5").classList.add('d-none');
        document.getElementById("subform6").classList.add('d-none');
        document.getElementById('emailcontent').style.marginTop = '-60px';
        document.getElementsByClassName("subinput1").required = true;
        document.getElementsByClassName("subinput2").required = true;
        navettesNumber = 2;
        break;
        case 3:
        document.getElementById("subform4").classList.add('d-none');
        document.getElementById("subform5").classList.add('d-none');
        document.getElementById("subform6").classList.add('d-none');
        document.getElementById('emailcontent').style.marginTop = '0px';
        document.getElementsByClassName("subinput1").required = true;
        document.getElementsByClassName("subinput2").required = true;
        document.getElementsByClassName("subinput3").required = true;
        navettesNumber = 3;
        break;
        case 4:
        document.getElementById("subform5").classList.add('d-none');
        document.getElementById("subform6").classList.add('d-none');
        document.getElementById('emailcontent').style.marginTop = '0px';
        document.getElementsByClassName("subinput1").required = true;
        document.getElementsByClassName("subinput2").required = true;
        document.getElementsByClassName("subinput3").required = true;
        document.getElementsByClassName("subinput4").required = true;
        navettesNumber = 4;
        break;
        case 5:
        document.getElementById("subform6").classList.add('d-none');
        document.getElementById('emailcontent').style.marginTop = '0px';
        document.getElementsByClassName("subinput1").required = true;
        document.getElementsByClassName("subinput2").required = true;
        document.getElementsByClassName("subinput3").required = true;
        document.getElementsByClassName("subinput4").required = true;
        document.getElementsByClassName("subinput5").required = true;
        navettesNumber = 5;
        break;
        case 6:
        document.getElementById('emailcontent').style.marginTop = '0px';
        document.getElementsByClassName("subinput1").required = true;
        document.getElementsByClassName("subinput2").required = true;
        document.getElementsByClassName("subinput3").required = true;
        document.getElementsByClassName("subinput4").required = true;
        document.getElementsByClassName("subinput5").required = true;
        document.getElementsByClassName("subinput6").required = true;
        navettesNumber = 6;
        break;
        default:
        document.getElementById("subform2").classList.add('d-none');
        document.getElementById("subform3").classList.add('d-none');
        document.getElementById("subform4").classList.add('d-none');
        document.getElementById("subform5").classList.add('d-none');
        document.getElementById("subform6").classList.add('d-none');
        document.getElementsByClassName("form-control").required = false;
        document.getElementsByClassName("subinput1").required = true;
        navettesNumber = 1;
    }
};

function mailerTool() {

    console.log('############# LAUNCHED #############');

    count = 0;
    data = new Array();
    config = new Array();
    navettesNumber = 0;

    whatDisplay();
    checkFormValidity();

    function checkFormValidity() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                console.log('error');
            } else {
                dataTreat();
            }
            form.classList.add('was-validated');
        }, false);
    }

    function dataTreat() {
        console.log('### Creating configuration variable with ' + navettesNumber + ' buses');
        for (var i = 0; i < navettesNumber; i++) {
            config[i] = {
                addresses: document.getElementById('inputEmails' + (i + 1)).value,
                names: document.getElementById('inputNames' + (i + 1)).value,
                time: document.getElementById('inputTime' + (i + 1)).value
            };
            if (i == navettesNumber - 1) {
                setTimeout(function() {
                    console.log(config);
                    createData(config);
                }, 1000);
            }
        }

        function createData(config) {
            console.log('### Proceeding entries');
            for (var i = 0; i < config.length; i++) {
                var subcount = config[i].addresses.split(';').length;
                console.log(subcount + ' entries for the ' + config[i].time + ' bus');
                count = count + subcount;
                for (var j = 0; j < subcount; j++) {
                    var nbadd = config[i].addresses.indexOf(';');
                    var nbnames = config[i].names.indexOf(';');
                    if (nbadd == -1 || nbames == -1) {
                        data[data.length] = {
                            address: config[i].addresses.substring(0, nbadd + 1),
                            name: config[i].names.substring(0, nbnames + 1),
                            time: config[i].time
                        };
                    } else {
                        data[data.length] = {
                            address: config[i].addresses.substring(0, nbadd),
                            name: config[i].names.substring(0, nbames),
                            time: config[i].time
                        };
                    }
                    console.log('Entry n°' + data.length + ' treated');
                    config[i].addresses = config[i].addresses.substring(nbadd + 1);
                    config[i].names = config[i].names.substring(nbames + 1);

                    if (data.length == count && i == config.length - 1) {
                        console.log('Total entries: ' + count);
                        sendMail();
                    }
                }
            }
        };
    }

    function sendMail() {
        console.log(data);
        let transporter = nodemailer.createTransport({
            pool: true,
            maxConnections: 10,
            maxMessages: 500,
            rateDelta: 2000,
            rateLimit: 1,
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: 'pnp@em-lyon.com',
                pass: 'Access2010'
            },
        });

        console.log('### Sending mails');
        var i = 0;

        function myLoop () {           //  create a loop function
            setTimeout(function () {    //  call a 3s setTimeout when the loop is called
                var htmlSubject = document.getElementById('htmlSubject').value.replace('§', data[i].name);
                var htmlBody = document.getElementById('htmlBody').value.replace('§', data[i].name).replace('°', data[i].time);
                var image = {
                    filename: 'image.png',
                    path: './imgs/image.png',
                    cid: 'killBeerImage'
                };

                let mailOptions = {
                    from: from, // sender address
                    to: data[i].address, // list of receivers
                    subject: htmlSubject, // Subject line
                    html: htmlBody, // html body ==> <img src="cid:leciddonneàl'image"/>
                    attachments: image // A BIEN LIER AVEC LE HTML
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log('!!! Error while sending email to ' + mailOptions.to + '.\n' + error);
                        if (i == data.length -1) {
                            console.log('############# DONE #############');
                        }
                        i++;                     //  increment the counter
                        if (i < count) {            //  if the counter < i, call the loop function
                            myLoop();             //  ..  again which will trigger another
                        }
                    } else {
                        console.log('Email n°' + (i + 1) + ' to ' + data[i].name + ' sent');
                        if (i == data.length - 1) {
                            console.log('############# DONE #############');
                        }
                        i++;                     //  increment the counter
                        if (i < count) {            //  if the counter < i, call the loop function
                            myLoop();             //  ..  again which will trigger another
                        }
                    }
                });
            }, 1500)
        };
        myLoop();
    }
}
