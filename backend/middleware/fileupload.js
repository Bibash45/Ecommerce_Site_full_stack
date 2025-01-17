const multer = require("multer");

const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fileDestination = "public/uploads";
    // check if the directory exists
    if (!fs.existsSync(fileDestination)) {
      fs.mkdirSync(fileDestination, { recursive: true });
      cb(null, fileDestination);
    } else {
      cb(null, fileDestination);
    }
  },
  filename: (req, file, cb) => {
    let filename = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );

    let ext = path.extname(file.originalname);
    // .jpg

    cb(null, filename + "_" + Date.now() + ext);
  },
});

let imageFilter = (req, file, cb) => {
  console.log("Requested file: ", file);
  if (
    !file.originalname.match(
      /\.(jpg|png|svg|jpeg|jfif|gif|JPG|JPEG|PNG|SVG|GIF|JFIF)$/
    )
  ) {
    return cb(new Error("You can upload image file only"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

module.exports = upload;
