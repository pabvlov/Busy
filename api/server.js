const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors())
const port = 3000;
const authRouter = require("./app/routes/auth.routes");
const reactionRouter = require("./app/routes/reaction.routes");
const userRouter = require("./app/routes/user.routes");
const workRouter = require("./app/routes/work.routes");
const serviceRouter = require("./app/routes/service.routes");


app.use(express.json());
app.use(express.static('app/images'));
app.use(express.static('app/images/profiles'));
app.use(express.static('app/images/app'));
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
/* routes */
// auth
app.post("/auth/register", authRouter);
app.post("/auth/login", authRouter);
app.post("/auth/renew", authRouter);
app.post("/auth/regenerate", authRouter);

// users
app.get("/users", userRouter);
app.get("/user/:rut/:dv", userRouter);
app.get("/user/profile/:rut/:dv", userRouter);
app.post("/user/upload", userRouter);
app.post("/user/add", userRouter);
app.put("/user/edit", userRouter);


// work
app.post("/work/uploadImage", workRouter);
app.post("/work/add", workRouter);
app.post("/work/evidence", workRouter);
app.get("/works", workRouter);
app.get("/work/:id", workRouter);
app.post("/work/apply", workRouter);
app.delete("/work/delete/:id", workRouter);
app.put("/work/choose", workRouter);

// services
app.post("/service/uploadImage", serviceRouter);
app.post("/service/add", serviceRouter);
app.get("/services", serviceRouter);
app.get("/service/:id", serviceRouter);
app.post("/service/apply", serviceRouter);

// reactions
app.get("/reactions", reactionRouter);
app.get("/reaction/:id", reactionRouter);
app.get("/topic/reactions/:id", reactionRouter);
app.post("/add/reaction", reactionRouter);
app.post("/topic/add/reaction", reactionRouter);
app.post("/topic/add/reaction", reactionRouter);


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});



app.listen(port, () => {
  console.log(`Servidor API Busy abierto en -> http://localhost:${port}`);
});