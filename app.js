'use strict'

const nodemailer = require('nodemailer');

var mailerTool = function() {

    console.log('############# LAUNCHED');

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

    function dataTreat(addresses, names, time) {
        var count = 0;
        count = addresses.split(';').length; // -1 to have the correct ';' count, here it's just the number of people
        var data = new Array();
        console.log(count + ' entries');
        console.log('### Proceeding entries');
        for (var i = 0; i < count; i++) {
            console.log('Entry n°' + (i + 1));
            var n = addresses.indexOf(';');
            var t = names.indexOf(';');
            if (n == -1 || t == -1) {
                n = addresses.length + 1;
                t = names.length + 1;
            }
            data[i] = {
                address: addresses.substring(0, n),
                name: names.substring(0, t),
            };
            addresses = addresses.substring(n + 1);
            names = names.substring(t + 1);
            if (data.length == count) {
                sendMail(data,time);
            }
        }
    }

    function sendMail(data, time) {
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'lucas.lion.12@neoma-bs.com',
                    pass: 'Lucas59'
                }
            });

            console.log('### Sending mails');
            for (var i = 0; i < data.length; i++) {

                var htmlSubject = 'Ton horaire de navette pour ce soir';
                var htmlBody = '<p>Salut à toi ' + data[i].name + ' !</p><p>La navette qui t\’a été attribuée au shotgun est celle de <strong>' + time + '</strong></p><p>Ce bus magique t\'emmènera vers une toute nouvelle salle pour la SAT BDE x JE.</p><p>On t\’attend <span style="font-size: 25px">15 minutes</span> avant le départ de ta navette pour toujours plus de kiffe.</p><p>A ce soir !</p><img src="cid:azerty123" alt=""><br>';

                let mailOptions = {
                    from: '"Plug\'N\'Play" <lucas.lion.12@neoma-bs.com>', // sender address
                    to: data[i].address, // list of receivers
                    subject: htmlSubject, // Subject line
                    // subject: document.getElementById('htmlSubject').value,
                    // html: document.getElementById('htmlBody').value
                    html: htmlBody, // html body
                    attachments: [{
                        filename: 'image.png',
                        path: './imgs/image.png',
                        cid: 'azerty123' //same cid value as in the html img src
                    }]
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    } else {
                        return console.log('Mail n°' + (i + 1) + ' pour ' + data[i].name + ' envoyé !');
                        if (i == data.length -1) {
                            return console.log('############# DONE');
                        }
                    }
                });
            }
        });
    }
}
