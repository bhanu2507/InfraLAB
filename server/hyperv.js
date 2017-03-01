/**
 * Created by bhanu.mokkala on 1/5/2017.
 */

var http = require('http');
var https = require('https');
var request = require('request');
var querystring = require('querystring');
var fs = require('fs');


exports.gethypervvm = function(req, res) {
        var options1 = { method: 'GET',
        url: 'http://110.110.110.29:5000/getvmlist',
        headers:
            {   'cache-control': 'no-cache',
                'content-type': 'application/json' }
        };

    request(options1, function (error, response, body) {
        if (error) throw new Error(error);
        var str = body.split(" ").filter(function(i){return i});
        //console.log(body);
        var hyperv = [];
        for(var j=12; j<str.length;j=j+8){
            if (str[j+1] != undefined) {
                var item = {
                    'Name': str[j].split("\n").pop(-1),
                    'State': str[j + 1],
                    'CPUUsage': str[j + 2],
                    'Memory': str[j + 3],
                    'Uptime': str[j + 4],
                    'Status': str[j + 5] + " " + str[j + 6],
                    'Version': str[j + 7]
                };
                hyperv.push(item);
            }
        }
    //console.log(hyperv);
        res.send(hyperv);
    });
};