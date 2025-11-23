import multer from "multer";
import fs from "fs";

const createKYCUploadHandle = ({ destination = "uploads/", maxSize = 5 * 1024 * 1024, fields }) => {

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination);
        },
        filename: (req, file, cb) => {
            cb(null, `${req.user?.username || "guest"}-${file.originalname}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only jpeg, png, or pdf files are allowed"), false);
        }
        cb(null, true);
    };

    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize,
        }
    });

    return (req, res, next) => {
        upload.fields(fields)(req, res, (err) => {
            if (err) {
                if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
                    console.log(err)
                    return res.status(400).json(
                        {
                            fieldname: err.field,
                            error: `File too large. Max limit is ${maxSize / 1024 / 1024}MB`
                        }
                    );
                }
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    };
};

export default createKYCUploadHandle;
