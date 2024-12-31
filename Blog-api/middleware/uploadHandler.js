import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Math.random(1000) + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileType = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileType.includes(file.memetype)) {
    cb(null, true);
  } else {
    cb(null, true);
  }
};

export const uploadMiddleware = multer({ storage: storage });
