import "./env";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import bodyParser from "body-parser";

import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";

import { Post } from "./entities/Post";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

server.express.use(logger("dev"));
server.express.use(bodyParser.json()); // support json encoded bodies
server.express.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

server.express.post("/api/post", async (req, res, next) => {
  console.log(req.body);
  const { postUrl, price } = req.body;
  console.log("post url ", postUrl);
  if (!postUrl || !price) {
    res.send("error");
  }

  const post = await Post.create({ postUrl, price }).save();
  console.log("post ", post);
});

console.log("connexion launch");
createConnection(connectionOptions)
  .then(() =>
    server.start({ port: PORT }, () =>
      console.log(`Server running on  http://localhost:${PORT}`)
    )
  )
  .catch(error => console.log(error));
