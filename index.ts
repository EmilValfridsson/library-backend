import express from "express";
import articles from "./routes/articles";
import categories from "./routes/categories";
import users from "./routes/users";
import auth from "./routes/auth";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/articles", articles);
app.use("/api/categories", categories);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(5588, () => console.log("listening to port 5588..."));
