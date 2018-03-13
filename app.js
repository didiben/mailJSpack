'use strict'

const nodemailer = require('nodemailer');
var count = 0;
var data = new Array();
var time = '';

var mailerTool = function() {

    console.log('############# LAUNCHED #############');

    checkFormValidity();

    function checkFormValidity() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                dataTreat(document.getElementById('inputEmails').value, document.getElementById('inputNames').value, document.getElementById('inputTime').value);
            }
            form.classList.add('was-validated');
        }, false);
    }

    function dataTreat(addresses, names, timing) {
        count = addresses.split(';').length; // -1 to have the correct ';' count, here it's just the number of people
        time = timing;
        console.log(count + ' entries');
        console.log('### Proceeding entries');
        for (var i = 0; i < count; i++) {
            var n = addresses.indexOf(';');
            var t = names.indexOf(';');
            if (n == -1 || t == -1) {
                n = addresses.length + 1;
                t = names.length + 1;
            }
            data[i] = {
                address: addresses.substring(0, n),
                name: names.substring(0, t)
            };
            addresses = addresses.substring(n + 1);
            names = names.substring(t + 1);
            if (data.length == count) {
                sendMail(data,time, count);
            }
        }
    }

    function sendMail(data, time, count) {
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'pnp@em-lyon.com',
                    pass: 'Access2010'
                }
            });

            console.log('### Sending mails');

            var i = 0;

            function myLoop () {           //  create a loop function
                setTimeout(function () {    //  call a 3s setTimeout when the loop is called
                    var htmlSubject = 'Ton horaire de navette pour ce soir';
                    var htmlBody = '<p>Salut à toi ' + data[i].name + ' !</p><p>La navette qui t\’a été attribuée au shotgun est celle de <strong>' + time + '</strong></p><p>Ce bus magique t\'emmènera vers une toute nouvelle salle pour la SAT BDE x JE.</p><p>On t\’attend <span style="font-size: 25px">15 minutes</span> avant le départ de ta navette pour toujours plus de kiffe.</p><p>A ce soir !</p><img src="cid:killBeerImage" alt=""><br>';

                    let mailOptions = {
                        from: '"Plug\'N\'Play" <pnp@em-lyon.com>', // sender address
                        to: data[i].address, // list of receivers
                        subject: htmlSubject, // Subject line
                        // subject: document.getElementById('htmlSubject').value,
                        // html: document.getElementById('htmlBody').value
                        html: htmlBody, // html body
                        attachments: [{
                            filename: 'image.png',
                            path: './imgs/image.png',
                            cid: 'killBeerImage' //same cid value as in the html img src
                        }]
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log('!!! Erreur lors de l\'envoi à ' + mailOptions.to + '.\nDétails de l\'erreur : ' + error);
                        } else {
                            console.log('Message n°' + (i + 1) + ' à ' + data[i].name);
                            if (i == data.length -1) {
                                return console.log('############# DONE #############');
                            }
                        }
                    });
                    i++;                     //  increment the counter
                    if (i < count) {            //  if the counter < 10, call the loop function
                        myLoop();             //  ..  again which will trigger another
                    }                        //  ..  setTimeout()
                }, 3000)
            };
            myLoop();
            // for (var i = 0; i < data.length; i++) {
            //
            //     var htmlSubject = 'Ton horaire de navette pour ce soir';
            //     var htmlBody = '<p>Salut à toi ' + data[i].name + ' !</p><p>La navette qui t\’a été attribuée au shotgun est celle de <strong>' + time + '</strong></p><p>Ce bus magique t\'emmènera vers une toute nouvelle salle pour la SAT BDE x JE.</p><p>On t\’attend <span style="font-size: 25px">15 minutes</span> avant le départ de ta navette pour toujours plus de kiffe.</p><p>A ce soir !</p><img src="cid:killBeerImage" alt=""><br>';
            //
            //     let mailOptions = {
            //         from: '"Plug\'N\'Play" <lucas.lion.12@neoma-bs.com>', // sender address
            //         to: data[i].address, // list of receivers
            //         subject: htmlSubject, // Subject line
            //         // subject: document.getElementById('htmlSubject').value,
            //         // html: document.getElementById('htmlBody').value
            //         html: htmlBody, // html body
            //         attachments: [{
            //             filename: 'image.png',
            //             path: './imgs/image.png',
            //             cid: 'killBeerImage' //same cid value as in the html img src
            //         }]
            //     };
            //
            //     transporter.sendMail(mailOptions, function(error, info){
            //         if(error){
            //             console.log('!!! Erreur lors de l\'envoi à ' + mailOptions.to + '.\nDétails de l\'erreur : ' + error);
            //         }
            //         console.log('Message n°: ' + (i + 1) + ' à ' + data[i].name);
            //         if (i == data.length -1) {
            //             return console.log('############# DONE');
            //         }
            //     });
            // }
        });
    }
}
