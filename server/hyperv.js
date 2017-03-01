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
                'content-type': 'application/json' },
        };

    request(options1, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
    });
};