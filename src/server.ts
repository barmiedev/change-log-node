import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "hello from express" });
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post(
  "/signin",
  body("username").exists(),
  body("password").exists(),
  handleInputErrors,
  signIn
);

app.use((err, req, res, next) => {
  if (err.type === "input") {
    res.status(400).json({ message: "Invalid input" });
  } else if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    res.status(500).json({ message: `Something went wrong: ${err.message}` });
  }
});

export default app;
