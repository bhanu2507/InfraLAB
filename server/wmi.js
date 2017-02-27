/**
 * Created by bhanu.mokkala on 2/27/2017.
 */
var http = require('http');
var https = require('https');
var request = require('request');
var querystring = require('querystring');
var fs = require('fs');


exports.getcompulist = function(req, res) {

    var WmiClient = require('wmi-client');

    var wmi = new WmiClient({
        username: 'Administrator',
        password: 'atmecs@1234',
        host: '110.110.110.110'
    });

    wmi.query('SELECT * FROM Win32_OperatingSystem', function (err, result) {
        console.log(result);

        /*
         RESULT:
         [{
         Caption: 'Microsoft Windows Server 2008 R2 Enterprise',
         Version: '6.1.7601'
         }]
         */
    });
};