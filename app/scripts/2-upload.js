"use strict"

var app = angular.module('main', []);

app.controller('index', ['$scope', function($scope) {
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
        $scope.readyToGo = false;
        $scope.browser = {
            browsing1: '',
            browsing2: ''
        };
        $scope.discours = '';
        $scope.browsingAlts = {
            alt1: 'Parcourir...',
            alt2: 'Changer'
        };
        $scope.discoursAlts = {
            alt1: 'Vous devez d\'abord renseigner votre nom d\'équipe et votre BU !',
            alt2: 'Le nom du fichier doit être celui de l\'équipe + BU sans majuscule ou accent comme l\'exemple'
        };
        $scope.prevDataOk = {
            init: true,
            bttn: true
        };
        $scope.excelExt = ['.xlsx', 'xlsm', '.xlsb', '.xltx', '.xltm', '.xls', '.xlt', '.xls', '.xml', '.xlam', '.xla', '.xlw'];
        $scope.videoExt = ['.mkv', '.mp4', '.m4v', '.flv', '.avi', '.wmv', '.amv', '.mpeg'];
        $scope.newClass = {
            excel: '',
            video: ''
        };
        $scope.excelName = '';
        $scope.videoName = '';
        $scope.alertExcel = '';
        $scope.alertVideo = '';
        $scope.alertAlts = {
            alt1: 'Mauvais nom de fichier !',
            alt2: 'Extension non reconnue !',
            alt3: 'Mauvais fichier, veuillez suivre les indications'
        };
        $scope.excelPath = 'nomequipe-bu.xlsx';
        $scope.videoPath = 'nomequipe-bu.mp4';
        $scope.$apply();
        $scope.init();
        $scope.watchmen();
    });

    $scope.init = function() {
        $scope.browser.browsing1 = $scope.browsingAlts.alt1;
        $scope.browser.browsing2 = $scope.browsingAlts.alt1;
        $scope.newClass.excel = 'pathOutputInit text-center';
        $scope.newClass.video = 'pathOutputInit text-center';
        $scope.discours = $scope.discoursAlts.alt1;
        $scope.$apply();
        $('.datatog').attr('title', $scope.discours).tooltip('fixTitle');
        $('.pathOutputInit').tooltip('disable');
    }

    $scope.watchmen = function() {
        document.getElementById('teamName').oninput = function() {
            var file = {
                excelFile: $scope.excelName,
                videoFile: $scope.videoName
            };
            $scope.enable(1, file);
            if ($scope.checkInputs(file) == 0) {
                $scope.enable(3, file);
            }
            $scope.checkInputs(file, $scope.enable);
        };
        document.getElementById('buName').oninput = function() {
            var file = {
                excelFile: $scope.excelName,
                videoFile: $scope.videoName
            };
            $scope.enable(1, file);
            if ($scope.checkInputs(file) == 0) {
                $scope.enable(3, file);
            }
            $scope.checkInputs(file, $scope.enable);
        };
        document.getElementById('file-chooser1').onchange = function() {
            var file = {
                excelFile: this.files[0].name,
                videoFile: $scope.videoName
            };
            $scope.excelName = this.files[0].name;
            $scope.excelPath = $scope.excelName;
            $scope.$apply();
            if (this.files[0].name != undefined) {
                $scope.browser.browsing1 = $scope.browsingAlts.alt2;
                $scope.newClass.excel = 'pathOutput text-center';
                $('.pathOutputInit').tooltip('disable');
                $scope.$apply();
            }
            if ($scope.checkInputs(file) == 0) {
                $scope.enable(2, file);
            }
        };
        document.getElementById('file-chooser2').onchange = function() {
            var file = {
                excelFile: $scope.excelName,
                videoFile: this.files[0].name
            };
            $scope.videoName = this.files[0].name;
            $scope.videoPath = $scope.videoName;
            $('.pathOut').tooltip({placement: 'right',trigger: 'manual'}).tooltip('hide');
            $scope.$apply();
            if (this.files[0].name != undefined) {
                $scope.browser.browsing2 = $scope.browsingAlts.alt2;
                $scope.newClass.video = 'pathOutput text-center';
                $('.pathOutputInit').tooltip('disable');
                $scope.$apply();
            }
            if ($scope.checkInputs(file) == 0) {
                $scope.enable(2, file);
            }
        };
    };

    $scope.enable = function(step, input) {
        var fileOk = function(object) {
            if (object.excelFile && object.videoFile) {
                return 1;
            } else {
                return 0;
            }
        };
        switch (step) {
            case 1:
            if ($scope.teamName.length > 2 && $scope.buName.length > 2) {
                $scope.prevDataOk.init = false;
                $scope.discours = $scope.discoursAlts.alt2;
                $scope.$apply();
                $('.datatog').attr('title', $scope.discours).tooltip('fixTitle');
            } else {
                $scope.prevDataOk.init = true;
                $scope.$apply();
            }
            break;
            case 2:
            $scope.prevDataOk.bttn = false;
            $scope.$apply();
            break;
            default:
            $scope.prevDataOk.bttn = false;
            $scope.$apply();
        }
    };

    $scope.alertDisplay = function(nb, type) {
        $scope.prevDataOk.bttn = true;
        $scope.newClass.excel = 'pathOut text-center';
        $('.pathOut').tooltip('enable');
        $scope.$apply();
        switch (type) {
            case 0:
            switch (nb) {
                case 1:
                console.log('Error');
                $scope.alertExcel = $scope.alertAlts.alt1;
                $scope.$apply();
                console.log($scope.alertExcel);
                $('.pathOut').tooltip('show');
                $('.pathOut').attr('title', $scope.alertExcel).tooltip('fixTitle');
                break;
                case 2:
                console.log('Error');
                $scope.alertExcel = $scope.alertAlts.alt2;
                $scope.$apply();
                $('.pathOut').tooltip('show');
                $('.pathOut').attr('title', $scope.alertExcel).tooltip('fixTitle');
                break;
                default:
                console.log('Error');
                $scope.alertExcel = $scope.alertAlts.alt3;
                $scope.$apply();
                $('.pathOut').tooltip('show');
                $('.pathOut').attr('title', $scope.alertExcel).tooltip('fixTitle');
            }
            break;
            default:
            switch (nb) {
                case 1:
                console.log('Error');
                $scope.alertVideo = $scope.alertAlts.alt1;
                $scope.$apply();
                $('.pathOut').tooltip('show');
                $('.pathOut').attr('title', $scope.alertVideo).tooltip('fixTitle');
                break;
                case 2:
                console.log('Error');
                $scope.alertVideo = $scope.alertAlts.alt2;
                $scope.$apply();
                $('.pathOut').tooltip('show');
                $('.pathOut').attr('title', $scope.alertVideo).tooltip('fixTitle');
                break;
                default:
                console.log('Error');
                $scope.alertVideo = $scope.alertAlts.alt3;
                $scope.$apply();
                $('.pathOut').tooltip('show');
                $('.pathOut').attr('title', $scope.alertVideo).tooltip('fixTitle');
            }
        }
    };

    $scope.checkInputs = function(input) {
        var count = 0;
        var count1 = 0;
        var count2 = 0;
        if (input.excelFile != '') {
            var ext = input.excelFile.substring(input.excelFile.lastIndexOf("."));
            var bool = false;
            for (var i = 0; i < $scope.excelExt.length; i++) {
                if ($scope.excelExt[i] == ext) {
                    bool = true;
                    break;
                }
            }
            if (!bool) {
                count1++;
            }
            var name = $scope.teamName.toLowerCase().replace(/[èéêë]/g,"e").replace(/[ç]/g,"c").replace(/[àâä]/g,"a").replace(/[ïî]/g,"i").replace(/[ûùü]/g,"u").replace(/[ôöó]/g,"o");
            name += '-';
            name += $scope.buName.toLowerCase().replace(/[èéêë]/g,"e").replace(/[ç]/g,"c").replace(/[àâä]/g,"a").replace(/[ïî]/g,"i").replace(/[ûùü]/g,"u").replace(/[ôöó]/g,"o");
            if (name != input.excelFile.substring(0, $scope.excelName.lastIndexOf("."))) {
                count1 += 2;
            }
            if (count1 != 0) {
                $scope.alertDisplay(count1, 0);
            } else {
                $('.pathOut').tooltip('hide');
            }
            count += count1;
        }
        if (input.videoFile != '') {
            var ext = input.videoFile.substring(input.videoFile.lastIndexOf("."));
            var bool = false;
            for (var i = 0; i < $scope.videoExt.length; i++) {
                if ($scope.videoExt[i] == ext) {
                    bool = true;
                    break;
                }
            }
            if (!bool) {
                count2++;
            }
            var name = $scope.teamName.toLowerCase().replace(/[èéêë]/g,"e").replace(/[ç]/g,"c").replace(/[àâä]/g,"a").replace(/[ïî]/g,"i").replace(/[ûùü]/g,"u").replace(/[ôöó]/g,"o");
            name += '-';
            name += $scope.buName.toLowerCase().replace(/[èéêë]/g,"e").replace(/[ç]/g,"c").replace(/[àâä]/g,"a").replace(/[ïî]/g,"i").replace(/[ûùü]/g,"u").replace(/[ôöó]/g,"o");
            if (name != input.videoFile.substring(0, $scope.videoName.lastIndexOf("."))) {
                count2 += 2;
            }
            if (count2 != 0) {
                $scope.alertDisplay(count2, 1);
            } else {
                $('.pathOut').tooltip('hide');
            }
            count += count2;
            return count;
        }
    };

    $scope.upload = function() {
        var bucket = new AWS.S3({params: {Bucket: 'prixrigaud-videos'}});
        var fileChooser1 = document.getElementById('file-chooser1');
        var fileChooser2 = document.getElementById('file-chooser2');
        var file1 = fileChooser1.files[0];
        var file2 = fileChooser2.files[0];
        var params1 = {Key: file1.name, ContentType: file1.type, Body: file1};
        var params2 = {Key: file2.name, ContentType: file2.type, Body: file2};

        bucket.upload(params1, function (err, data) {
            console.log('Uploaded Excel file');
        });
        bucket.upload(params2, function (err, data) {
            console.log('Uploaded Video file');
        });
        setTimeout(function() {
            //    window.location = "/congrats.html";
        }, 500);
    };

}]);
