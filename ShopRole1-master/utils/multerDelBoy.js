const multer=require("multer");
const path= './uploads';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Going to store data in disk")
    cb(null, "./uploads/deliveryBoy/")
  },
  filename: function (req, file, cb) {
    console.log("file name is ",file.originalname);
    cb(null, Date.now() +file.originalname)
  }
})
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000}
  }).single("file");
  module.exports=upload;