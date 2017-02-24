/**
 * Created by bhanu.mokkala on 1/5/2017.
 */

var http = require('http');
var https = require('https');
var request = require('request');
var querystring = require('querystring');
var fs = require('fs');


exports.getcompulist = function(req, res) {

    var clientos = require('pkgcloud').compute.createClient({
        provider: 'openstack',
        useServiceCatalog: true,
        useInternal: false,
        keystoneAuthVersion: 'v2',
        authUrl: 'http://110.110.110.5:5000',
        tenantId: '99e1e2d5093446f1b5ae11939272c2df',    //projectId from credentials
        //   domainId: 'db873a6fd7e049fe9bc635f9e96541b4',
        username: 'omkar',
        password: 'omkar',
        region: 'regionOne'   //dallas or london region
        // basePath: 'v2.0/tokens'
    });
    clientos.getServers(function (err, servers) {
        res.send(servers);
       // console.log(containers);
       // console.log(err);
    })

};

exports.generateaccesskey=function(req1,res1){
    var options1 = { method: 'POST',
        url: 'http://110.110.110.5:5000/v2.0/tokens',
        headers:
            {   'cache-control': 'no-cache',
                'content-type': 'application/json' },
        body:
            { auth:
                { tenantName: 'HPE',
                    passwordCredentials: { username: 'satish', password: 'sathishkumar@123' } } },
        json: true };

    request(options1, function (error, response, body) {
        if (error) throw new Error(error);

        //console.log(body.access.token.id);
        accesstoken = body.access.token.id;
        res1.send(body.access.token.id);
    });
};

exports.createserver = function(req1, res1) {
console.log(req1.query.image);
    console.log(req1.query.flavor);
    console.log(req1.query.name);
    var clientos = require('pkgcloud').compute.createClient({
        provider: 'openstack',
        useServiceCatalog: true,
        useInternal: false,
        keystoneAuthVersion: 'v2',
        authUrl: 'http://110.110.110.5:5000',
        tenantId: '99e1e2d5093446f1b5ae11939272c2df',    //projectId from credentials
        //   domainId: 'db873a6fd7e049fe9bc635f9e96541b4',
        username: 'omkar',
        password: 'omkar',
        region: 'regionOne'   //dallas or london region
        // basePath: 'v2.0/tokens'
    });

    var serverid="";
    var accesstoken="";
    var floatip="";

    var options = {
        flavor: req1.query.flavor,
        image: req1.query.image,
        name: req1.query.name,
        networks: [{uuid: '4db1f31c-215d-45cc-83d3-92aac11d7ebf'}]
    };

    clientos.createServer(options, function (err, server) {
        res1.send(server);
        //console.log(server.openstack.id);
        serverid = server.openstack.id;
        getaccesstoken(serverid);
        //console.log(err);
    });



};

function getaccesstoken(serverid){
    var options1 = { method: 'POST',
        url: 'http://110.110.110.5:5000/v2.0/tokens',
        headers:
            {   'cache-control': 'no-cache',
                'content-type': 'application/json' },
        body:
            { auth:
                { tenantName: 'HPE',
                    passwordCredentials: { username: 'satish', password: 'sathishkumar@123' } } },
        json: true };

    request(options1, function (error, response, body) {
        if (error) throw new Error(error);

        //console.log(body.access.token.id);
        accesstoken = body.access.token.id;
        generatefloatingip(serverid, accesstoken);
    });
}

function generatefloatingip(serverid, accesskey){
    var options2 = { method: 'POST',
        url: 'http://controller:8774/v2/99e1e2d5093446f1b5ae11939272c2df/os-floating-ips',
        headers:
            { 'postman-token': 'd6dfe732-4fcf-c2b7-b331-2d601669148e',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'x-auth-token': accesskey },
        body: { pool: 'ext-net' },
        json: true };

    request(options2, function (error, response, body) {
        if (error) throw new Error(error);

        //console.log(body.floating_ip.ip);
        floatip = body.floating_ip.ip;
        assignfloatingip(serverid, accesskey, floatip);
    });
}

function assignfloatingip(serverid, accesstoken, floatip){
    setTimeout(function(){
        //console.log(serverid + accesstoken + floatip);
        //console.log('http://110.110.110.5:8774/v2/99e1e2d5093446f1b5ae11939272c2df/servers/'+ serverid +'/action');
        //var bodystr = "addFloatingIp: { address: " + floatip +"}";
        var options3 = { method: 'POST',
            url: 'http://110.110.110.5:8774/v2/99e1e2d5093446f1b5ae11939272c2df/servers/'+ serverid +'/action',
            headers:
                { 'postman-token': '9da649d4-42e4-b63a-4b67-8e386a03d784',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json',
                    'x-auth-token': accesstoken },
            body: { addFloatingIp: { address: floatip } },
            json: true };

        request(options3, function (error, response, body) {
            if (error) throw new Error(error);

            //console.log(body);
        });
    }, 4000);
}
exports.getflavors = function(req, res) {

    var clientos = require('pkgcloud').compute.createClient({
        provider: 'openstack',
        useServiceCatalog: true,
        useInternal: false,
        keystoneAuthVersion: 'v2',
        authUrl: 'http://110.110.110.5:5000',
        tenantId: '99e1e2d5093446f1b5ae11939272c2df',    //projectId from credentials
        //   domainId: 'db873a6fd7e049fe9bc635f9e96541b4',
        username: 'omkar',
        password: 'omkar',
        region: 'regionOne'   //dallas or london region
        // basePath: 'v2.0/tokens'
    });

    clientos.getFlavors(function (err, flavors) {
        //console.log(flavors);
        //var jsonObj = JSON.parse(flavors);
       //finalarray.push({"flavors": flavors});
       //finalarray[0]=flavors;
       // console.log(finalarray);
        res.send(flavors);
    });
};

exports.getimages = function(req, res) {

    var clientos = require('pkgcloud').compute.createClient({
        provider: 'openstack',
        useServiceCatalog: true,
        useInternal: false,
        keystoneAuthVersion: 'v2',
        authUrl: 'http://110.110.110.5:5000',
        tenantId: '99e1e2d5093446f1b5ae11939272c2df',    //projectId from credentials
        //   domainId: 'db873a6fd7e049fe9bc635f9e96541b4',
        username: 'omkar',
        password: 'omkar',
        region: 'regionOne'   //dallas or london region
        // basePath: 'v2.0/tokens'
    });

    clientos.getImages(function (err, images) {
        //console.log(images);
        //var jsonObj = JSON.parse(images);
        //finalarray.push({"images": images});
        //console.log(finalarray);
        res.send(images);
    });

};

exports.getstoragelist = function(req, res) {

    var clientos = require('pkgcloud').blockstorage.createClient({
        provider: 'openstack',
        useServiceCatalog: true,
        useInternal: false,
        keystoneAuthVersion: 'v2',
        authUrl: 'http://110.110.110.5:5000',
        tenantId: '99e1e2d5093446f1b5ae11939272c2df',    //projectId from credentials
        //   domainId: 'db873a6fd7e049fe9bc635f9e96541b4',
        username: 'satish',
        password: 'satish',
        region: 'regionOne'   //dallas or london region
        // basePath: 'v2.0/tokens'
    });
    clientos.getContainers(function (err, containers) {
        //console.log(clientos);
        //res.send(containers);
        // console.log(containers);
        console.log(containers);
    })

};

exports.getfloatingip = function(req, res) {
    //var util = require('util');
    var exec = require('child_process').exec;

    var command = 'curl -g -i -X POST http://controller:8774/v2/99e1e2d5093446f1b5ae11939272c2df/os-floating-ips -H "User-Agent: python-novaclient" -H "Content-Type: application/json" -H "Accept: application/json" -H "X-Auth-Token: {SHA1}8c4207463cc1d0aabf5a8f58bcb9c7bf298ba081" -d ';

    child = exec(command, function(error, stdout, stderr){

        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if(error !== null)
        {
            console.log('exec error: ' + error);
        }

    });
};