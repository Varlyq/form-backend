const express = require('express');
fileupload = require("express-fileupload"),
  app = express();
require('dotenv').config({ path: __dirname + '/.env' });
const fs = require('fs');
const http = require('http');
const upload = require("./multer");
var async = require("async");
const multer = require('multer');
var sql = require('./config/db');
const path = require('path');




app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/public', express.static(path.join(__dirname, 'public')));

app.post('/api/realEstateform',
  upload.fields([{ name: 'labour_camp_img', maxCount: 10 }, { name: 'logistics_plan_site', maxCount: 10 }])
  , (req, res) => {
    try {
      const fileUrl = `${req.protocol}://${req.get("host")}/public/` + `${req.body.gst_no}/`;

      let labour_camp = req.files.labour_camp_img;
      let newarrlabour = []
      for (let index = 0; index < labour_camp.length; index++) {
        const element = labour_camp[index];
        newarrlabour.push(fileUrl+element.filename)
      }

     let logistics_plan_site = req.files.logistics_plan_site;
      let newarrlogistic = []
      for (let index = 0; index < logistics_plan_site.length; index++) {
        const element = labour_camp[index];
        newarrlogistic.push(fileUrl+element.filename)
      }

      // var query = `INSERT INTO customers (name,address) VALUES('aawez','[${newarrlabour}]')`;
      
      var query = `INSERT INTO project_reg (company_name,company_entity,reg_address,pan_no,gst_no,specialization,kharchi_credit_period,ra_bill_credit_period,project_name,project_type,project_address,site_no_storeys,project_current_status,level_completed,labour_camp_img,logistics_plan_site,additional_info,project_incharge_name,project_inch_mobile,project_inch_email)
       VALUES ('${req.body.company_name}','${req.body.company_entity}','${req.body.reg_address}','${req.body.pan_no}','${req.body.gst_no}','${req.body.specialization}','${req.body.kharchi_credit_period}','${req.body.ra_bill_credit_period}','${req.body.project_name}','${req.body.project_type}','${req.body.project_address}',${req.body.site_no_storeys},'${req.body.project_current_status}','${req.body.level_completed}','[${newarrlabour}]','[${newarrlogistic}]','${req.body.additional_info}','${req.body.project_incharge_name}','${req.body.project_inch_mobile}','${req.body.project_inch_email}')`;
      sql.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.status(200).json({
          statusCode : 200,
          message : "success",
          data : result
        });
      });
          
    } catch (err) {
      console.log("err", err);
      return Promise.reject(err);
    }
  });

  




port = process.env.PORT || 4000;
http.createServer(app).listen(port)

console.log("port", process.env.PORT);
console.log('API server started on: ' + port);