const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   // eslint-disable-next-line no-undef
  //   // console.log(req.body.gst_no)
  //   // var dir = "./public/real_estate/"+req.body.gst_no;
  //   // if (!fs.existsSync(dir)) {
  //   //   fs.mkdirSync(dir);
  //   // }
  //   cb(null);
  // },

  filename: function (req, file, cb) {
      // console.log(file)
    cb(null, `${file.fieldname}-${uuidv4()}${path.extname(file.originalname)}`);
  },
});

var upload = multer({
  storage: storage
});

module.exports = upload;
