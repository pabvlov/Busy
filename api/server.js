const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors())
const port = 3000;
const usersRouter = require("./app/routes/user.routes");
const categoriesRouter = require("./app/routes/category.routes");
const forumsRouter = require("./app/routes/forum.routes");
const topicsRouter = require("./app/routes/topic.routes");
const threadRouter = require("./app/routes/thread.routes");
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
// users
app.get("/users", usersRouter);
app.get("/user/:id", usersRouter);
// categories
app.get("/categories", categoriesRouter);
app.get("/categorie/:id/forums", categoriesRouter);
// forums
app.get("/forums", forumsRouter);
app.get("/forum/:id", forumsRouter);
app.post("/forum/borrar", forumsRouter);
app.post("/forum/editar", forumsRouter);
app.post("/forum/crear", forumsRouter);
// topics
app.get("/topics/", topicsRouter);
app.get("/topics/:id", topicsRouter);
app.get("/topic/:id", topicsRouter);
app.get("/user/:id/topics", topicsRouter);
app.post("/post", topicsRouter);
app.post("/post/edit", topicsRouter);
app.post("/post/hide", topicsRouter);
app.post("/post/show", topicsRouter);
// threads 
app.get("/threads/:id", threadRouter);
app.post("/post/thread", threadRouter);
// auth
app.post("/auth/login", authRouter);
app.post("/auth/register", authRouter);
app.post("/auth/renew", authRouter);
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
  console.log(`Servidor API Prorums abierto en -> http://localhost:${port}`);
});