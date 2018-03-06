'use strict'

const nodemailer = require('nodemailer');

var mailerTool = function() {

    console.log('############# LAUNCHED');

    dataTreat(document.getElementById('inputEmails').value, document.getElementById('inputNames').value, document.getElementById('inputTime').value);

    function dataTreat(addresses, names, time) {
        var count = 0;
        count = addresses.split(';').length; // -1 to have the correct ';' count, here it's just the number of people
        var data = new Array();

        console.log('############# ' + (count) + ' entries');
        for (var i = 0; i < count; i++) {
            console.log('Proceeding entry #' + (i + 1));
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
                host: 'smtp.gmail.com',
                port: 465,
                secure: false,
                auth: {
                    user: 'darkben78@gmail.com',
                    pass: 'thibaultlachambre'
                }
            });

            for (var i = 0; i < data.length; i++) {
                let mailOptions = {
                    from: '"BenDelam" <darkben78@gmail.com>', // sender address
                    to: data[i].address, // list of receivers
                    subject: 'Hello data[i].name', // Subject line
                    text: 'Ton bus est à ' + time, // plain text body
                    html: '<b>Hello world?</b>' // html body
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                });
            }
        });
    }
}
