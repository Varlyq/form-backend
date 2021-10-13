const express = require('express');
const ngrok = require('ngrok')
fileupload = require("express-fileupload"),
  app = express(),
  bodyParser = require('body-parser');
require('dotenv').config({ path: __dirname + '/.env' });
const fs = require('fs');
const http = require('http');
const upload = require("./multer");
var async = require("async");
const multer = require('multer');
var sql = require('./app/db');
const path = require('path');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.post('/api/realEstateform',
  upload.fields([{ name: 'labour_camp_img', maxCount: 10 }, { name: 'logistics_plan_site', maxCount: 10 }])
  , (req, res, next) => {
    try {
      const fileUrl = `${req.protocol}://${req.get("host")}/public/` + `${req.body.gst_no}/`;
      console.log(fileUrl)

      let labour_camp = req.files.labour_camp_img;
      let newarrlabour = []
      console.log(labour_camp)
      for (let index = 0; index < labour_camp.length; index++) {
        const element = labour_camp[index];
        console.log(element.path)
        newarrlabour.push(fileUrl+element.filename)
       console.log(newarrlabour)
      }

     let logistics_plan_site = req.files.logistics_plan_site;
      let newarrlogistic = []
      console.log(logistics_plan_site)
      for (let index = 0; index < logistics_plan_site.length; index++) {
        const element = labour_camp[index];
        console.log(element.path)
        newarrlogistic.push(fileUrl+element.filename)
       console.log(newarrlogistic)
      }

      // var query = `INSERT INTO customers (name,address) VALUES('aawez','[${newarrlabour}]')`;
      
      var query = `INSERT INTO project_reg (company_name,company_entity,reg_address,pan_no,gst_no,specialization,kharchi_credit_period,ra_bill_credit_period,project_name,project_type,project_address,site_no_storeys,project_current_status,level_completed,labour_camp_img,logistics_plan_site,additional_info,project_incharge_name,project_inch_mobile,project_inch_email)
       VALUES ('${req.body.company_name}','${req.body.company_entity}','${req.body.reg_address}','${req.body.pan_no}','${req.body.gst_no}','${req.body.specialization}','${req.body.kharchi_credit_period}','${req.body.ra_bill_credit_period}','${req.body.project_name}','${req.body.project_type}','${req.body.project_address}',${req.body.site_no_storeys},'${req.body.project_current_status}','${req.body.level_completed}','[${newarrlabour}]','[${newarrlogistic}]','${req.body.additional_info}','${req.body.project_incharge_name}','${req.body.project_inch_mobile}','${req.body.project_inch_email}')`;
      sql.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
          res.json({
              message : "success"
          });
    } catch (err) {
      console.log("err", err);
      return Promise.reject(err);
    }
  });

   app.use('/public', express.static(path.join(__dirname, './public')));
   app.use(express.static(path.resolve('./public')));

port = process.env.PORT || 4000;
// (async function() {
//   const url = await ngrok.connect(port);
//   console.log(url);
// })();
// app.listen(port);

// https.createServer(tls,app).listen(port)
http.createServer(app).listen(port)

console.log("port", process.env.PORT);
// const path = require('path');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

console.log('API server started on: ' + port);