import { multer , path } from '../utils/imports.js'
const fileUploadMiddleware = (req, res, next) => {
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'supportfiles/'); 
    },
    filename: (req, file, cb) => {
        const origninalName = file.originalname.split(".")[0]
      cb(null,  Date.now() +origninalName+ path.extname(file.originalname)); 
    }
  });
  const upload = multer({ storage: storage });
  return upload
  };
export default fileUploadMiddleware
