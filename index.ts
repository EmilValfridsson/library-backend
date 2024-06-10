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

const PORT = process.env.PORT || 5588;

app.listen(PORT, () => console.log(`listening to port ${PORT}...`));
