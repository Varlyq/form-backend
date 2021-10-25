const express = require('express');
const app = express();
require('dotenv').config({ path: __dirname + '/.env' });
const upload = require("./multer");
const morgan = require('morgan');
var sql = require('./config/db');
var cors = require("cors");
const CreateError = require('http-errors');
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.use(cors());

//CORS SETTING
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});




app.post('/api/realEstateform',
  upload.fields([{ name: 'labour_camp_img', maxCount: 10 }, { name: 'logistics_plan_site', maxCount: 10 }])
  , async (req, res, next) => {
    try {
      if (!req.body) {
        return res.status(500).json({
          error: {
            message: "Body is missing"
          }
        })
      }
      if (!req.files.labour_camp_img) {
        return res.status(404).json({
          error: {
            message: "Labour Camp Image not Found"
          }
        })
      }
      else if (!req.files.logistics_plan_site) {
        return res.status(404).json({
          error: {
            message: "Logistic Image not Found"
          }
        })
      } else if (!req.files) {
        return res.status(404).json({
          error: {
            message: "Logistic Image not Found"
          }
        })
      }
      //labour_camp
      let labour = req.files.labour_camp_img;
      let multiplePicturePromise = labour.map((picture) =>
        cloudinary.uploader.upload(
          picture.path,
          { public_id: `real_estate/${req.body.pan_no}-${req.body.gst_no}/labour_camp/${picture.filename}`, tags: `real_estate` }, // directory and tags are optional
        )
      );
      let imageResponsesLabour = await Promise.all(multiplePicturePromise);
      console.log(imageResponsesLabour)
      let newarrlabour = []
      for (let index = 0; index < imageResponsesLabour.length; index++) {
        const element = imageResponsesLabour[index];
        newarrlabour.push(element.secure_url.toString())
      }
      console.log(newarrlabour)
      //logistic_plan
      let logistic = req.files.logistics_plan_site;
      let multiplePicturePromiseLogistic = logistic.map((picture) =>
        cloudinary.uploader.upload(
          picture.path,
          { public_id: `real_estate/${req.body.pan_no}-${req.body.gst_no}/logistic_site/${picture.filename}`, tags: `real_estate` }, // directory and tags are optional
        )
      );
      let imageResponsesLogistic = await Promise.all(multiplePicturePromiseLogistic);
      // console.log(imageResponsesLogistic)
      let newarrlogistic = []
      for (let index = 0; index < imageResponsesLogistic.length; index++) {
        const element = imageResponsesLogistic[index];
        newarrlogistic.push(element.secure_url.toString())
      }
      // console.log(newarrlogistic)
      // console.log(req.body.requirements)
      let arrlabour =  JSON.stringify(newarrlabour);
      console.log(arrlabour)
      let arrlogistic =  JSON.stringify(newarrlogistic);
      console.log(arrlogistic)
      let specialization = JSON.stringify(req.body.specialization);
      let requirements = JSON.stringify(req.body.requirements);
      let current = new Date();
      let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
      let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      let dateTime = cDate + ' ' + cTime;
      console.log(requirements)
      var query = `INSERT INTO real_estate (company_name,company_entity,reg_address,pan_no,gst_no,specialization,kharchi_credit_period,ra_bill_credit_period,project_name,project_type,project_address,site_no_storeys,project_current_status,level_completed,labour_camp_img,logistics_plan_site,additional_info,project_incharge_name,project_inch_mobile,project_inch_email,requirements,utr_no,referral_name,referral_code,payment_amount)
       VALUES ('${req.body.company_name}','${req.body.company_entity}','${req.body.reg_address}','${req.body.pan_no}','${req.body.gst_no}',${specialization},'${req.body.kharchi_credit_period}','${req.body.ra_bill_credit_period}','${req.body.project_name}','${req.body.project_type}','${req.body.project_address}',${req.body.site_no_storeys},'${req.body.project_current_status}','${req.body.level_completed}','${arrlabour}','${arrlogistic}','${req.body.additional_info}','${req.body.project_incharge_name}','${req.body.project_inch_mobile}','${req.body.project_inch_email}',${requirements},'${req.body.utr_no}','${req.body.referral_name}','${req.body.referral_code}','${req.body.payment_amount}')`;
      sql.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.status(200).json({
          statusCode: 200,
          message: "success",
          data: result
        });
      });

    } catch (err) {
      console.log("err", err);
      return res.status(500).json({
        error: err
      })
    }
  });

app.post('/api/roadHighway',
  upload.fields([{ name: 'labour_camp_img', maxCount: 10 }, { name: 'logistics_plan_site', maxCount: 10 }])
  , async (req, res) => {
    try {
      if (!req.body) {
        return res.status(500).json({
          error: {
            message: "Body is missing"
          }
        })
      }
      if (!req.files.labour_camp_img) {
        return res.status(404).json({
          error: {
            message: "Labour Camp Image not Found"
          }
        })
      }
      else if (!req.files.logistics_plan_site) {
        return res.status(404).json({
          error: {
            message: "Logistic Image not Found"
          }
        })
      }
      else if (!req.files) {
        return res.status(404).json({
          error: {
            message: "Image not Found"
          }
        })
      }
      let labour = req.files.labour_camp_img;
      let multiplePicturePromise = labour.map((picture) =>
        cloudinary.uploader.upload(
          picture.path,
          { public_id: `road_highways/${req.body.pan_no}-${req.body.gst_no}/labour_camp/${picture.filename}`, tags: `road_highways` }, // directory and tags are optional
        )
      );
      let imageResponsesLabour = await Promise.all(multiplePicturePromise);
      // console.log(imageResponsesLabour)
      let newarrlabour = []
      for (let index = 0; index < imageResponsesLabour.length; index++) {
        const element = imageResponsesLabour[index];
        newarrlabour.push(element.secure_url.toString())
      }
      let logistic = req.files.logistics_plan_site;
      let multiplePicturePromiseLogistic = logistic.map((picture) =>
        cloudinary.uploader.upload(
          picture.path,
          { public_id: `road_highways/${req.body.pan_no}-${req.body.gst_no}/logistic_site/${picture.filename}`, tags: `road_highways` }, // directory and tags are optional
        )
      );
      let imageResponsesLogistic = await Promise.all(multiplePicturePromiseLogistic);
      // console.log(imageResponsesLogistic)
      let newarrlogistic = []
      for (let index = 0; index < imageResponsesLogistic.length; index++) {
        const element = imageResponsesLogistic[index];
        newarrlogistic.push(element.secure_url.toString())
      }
      console.log(newarrlogistic)
      let arrlabour =  JSON.stringify(newarrlabour);
      console.log(arrlabour)
      let arrlogistic =  JSON.stringify(newarrlogistic);
      console.log(arrlogistic)
      let current = new Date();
      let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
      let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      console.log(cTime)
      let dateTime = cDate + ' ' + cTime;

      let requirements = JSON.stringify(req.body.requirements);
      var query = `INSERT INTO road_highways (company_name,company_entity,reg_address,pan_no,gst_no,kharchi_credit_period,ra_bill_credit_period,project_name,project_type,project_start_address,project_end_address,road_function,road_type,road_length,road_width,road_depth,complete_road_length,labour_camp_img,logistics_plan_site,additional_info,project_incharge_name,project_inch_mobile,project_inch_email,requirements,utr_no,referral_name,referral_code,payment_amount)
       VALUES ('${req.body.company_name}','${req.body.company_entity}','${req.body.reg_address}','${req.body.pan_no}','${req.body.gst_no}','${req.body.kharchi_credit_period}','${req.body.ra_bill_credit_period}','${req.body.project_name}','${req.body.project_type}','${req.body.project_start_address}','${req.body.project_end_address}','${req.body.road_function}','${req.body.road_type}',${req.body.road_length},${req.body.road_width},${req.body.road_depth},${req.body.complete_road_length},'${arrlabour}','${arrlogistic}','${req.body.additional_info}','${req.body.project_incharge_name}','${req.body.project_inch_mobile}','${req.body.project_inch_email}',${requirements},'${req.body.utr_no}','${req.body.referral_name}','${req.body.referral_code}','${req.body.payment_amount}')`;
      sql.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.status(200).json({
          statusCode: 200,
          message: "success",
          data: result
        });
      });

    } catch (err) {
      console.log("err", err);
      return res.status(500).json({
        error: err
      })
    }
  });


app.get('/api/real_estate/csv',(req,res,next)=>{
 try {
  var query = `SELECT * from real_estate`
  sql.query(query, function (err, result) {
  let element
    if (err) throw err;
    for (let index = 0; index < result.length; index++) {
       element = result[index];
    }
    
      //  element.logistics_plan_site.join(', ');
    // console.log("1 record inserted");
    let real_estate = result.map(results => {
     
      return {
        id : results.id,
        company_name : results.company_name,
        company_entity : results.company_entity,
        reg_address : results.reg_address,
        pan_no : results.pan_no,
        gst_no : results.gst_no,
        specialization : JSON.parse(results.specialization),
        kharchi_credit_period : results.kharchi_credit_period,
        ra_bill_credit_period : results.ra_bill_credit_period,
        project_name : results.project_name,
        project_type : results.project_type,
        project_address : results.project_address,
        site_no_storeys : results.site_no_storeys,
        project_current_status : results.project_current_status,
        level_completed : results.level_completed,
        labour_camp_img : JSON.parse(results.labour_camp_img),
        logistics_plan_site : JSON.parse(results.logistics_plan_site),
        additional_info : results.additional_info,
        project_incharge_name : results.project_incharge_name,
        project_inch_mobile : results.project_inch_mobile,
        project_inch_email : results.project_inch_email,
        requirements : JSON.parse(results.requirements),
        utr_no : results.utr_no,
        referral_name : results.referral_name,
        referral_code : results.referral_code,
        payment_amount : results.payment_amount,
        created_At : results.created_At
      }
    })
    console.log(real_estate)
    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: real_estate
    });
  });
 } catch (error) {
   next(error)
 }
});

app.get('/hello', (req, res) => {
  res.json({
    message: "OK"
  })
})

module.exports = app;
