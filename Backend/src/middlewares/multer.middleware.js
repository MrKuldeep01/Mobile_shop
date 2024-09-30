import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/uploadedFiles')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Math.round((Math.random() * 1000) + 100)
      cb(null, file.fieldname + '_' + uniqueSuffix)
    }
  })
  
  export const upload = multer({ storage: storage })