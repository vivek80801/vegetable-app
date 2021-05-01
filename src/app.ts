import express from "express";
import { resolve} from "path";
import {config} from "dotenv";
import passport from "passport";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import { myPassport} from "./controller/services/microservices/passport";
import {mainRouter} from "./routes/index";
import { connectDB } from "./controller/services/microservices/db";

export const app = express();

config({path: resolve(__dirname + "./env")});
connectDB();
myPassport(passport);

app.set("views", "src/views");
app.set("view engine", "ejs");
app.use(
	session({
		secret: process.env.SECRET || "my secret",
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60,
			sameSite: true
		}
	})
);
app.use(expressLayouts);
app.use(express.static(resolve(__dirname.replace("/src", "/public"))));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", mainRouter);

app.use((req, res) => {
	res.render("404");
});

app.use(
	(
		err: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.error(err.stack);
		res.status(500).render("error");
        next();
	}
);