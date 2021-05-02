import path from "path"
import multer from "multer"
import { Vegetable } from "../../../modal/vegetable";
import { User, IUser} from "../../../modal/user"

export const saveVegetableToDatabase = (name: string, price: number, organic: boolean, img: string, owner: IUser) => {
	const newVegetable = new Vegetable({
		name,
		price,
		organic,
		img,
		owner
	})
	User.findById({ _id: owner._id }).then((user) => {
		if(user !== null){
			user.vegetables.push(newVegetable)
			user.save()
		}
	}).catch(err => console.log(err))
	newVegetable.save()
}

const stroage = multer.diskStorage({
	destination: "./public/upload/",
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	},
});

const checkFileType = (
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	const fileTypes = /jpeg|png|jpg/;
	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);

	if (mimeType && extname) {
		return cb(null, true);
	} else {
		cb({ message: "file is not an image", name: "Error" });
	}
};

export const upload = multer({
	storage: stroage,
	limits: { fileSize: 100000 },
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	},
}).single("vegetableImage");
