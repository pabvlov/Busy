const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors())
const port = 3000;
const authRouter = require("./app/routes/auth.routes");
const reactionRouter = require("./app/routes/reaction.routes");
app.use(express.json());
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

// users


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