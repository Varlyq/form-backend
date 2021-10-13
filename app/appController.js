'use strict';

const util = require('util');
var fs = require('fs');
var nodemailer = require('nodemailer');
var sql = require('./db');
var dateTime = require('node-datetime');
var async = require("async");
const multer = require('multer');
const path = require('path');
var fs = require('fs');



exports.demo = function (req, res) {
	res.status(200).send({ success: true, message: 'This is demo!' });
};




exports.realEstate = function (req, res) {
	try {
		console.log(req.file)
		console.log(req.body)
		// var query = "INSERT INTO project_reg (name, address) VALUES ('Company Inc', 'Highway 37')";
    // sql.query(query, function (err, result) {
    //   if (err) throw err;
    //   console.log("1 record inserted");
    // });
    //     res.json({
    //         message : "success"
    //     });
	} catch (err) {
		console.log("err", err);
		// return Promise.reject(err);
	}
}