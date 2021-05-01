import express from "express";
import { resolve} from "path"
import {config} from "dotenv"
import expressLayouts from "express-ejs-layouts"
import {mainRouter} from "./routes/index"

export const app = express();

config({path: resolve(__dirname + "./env")})

app.set("views", "src/views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static(resolve(__dirname.replace("/src", "/public"))));
app.use(express.json());

app.use("/", mainRouter)

app.use((req, res) => {
	res.render("404")
})

app.use(
	(
		err: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.error(err.stack);
		res.status(500).render("error");
        next()
	}
);