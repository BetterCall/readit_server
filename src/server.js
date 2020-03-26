import "./env";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import bodyParser from "body-parser";
import cors from "cors";

import { createConnection, getRepository } from "typeorm";
import connectionOptions from "./ormConfig";

import { Post } from "./entities/Post";
import { Attempt } from "./entities/Attempt";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

server.express.use(logger("dev"));
server.express.use(bodyParser.json()); // support json encoded bodies
server.express.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
server.express.use(cors());

server.express.get("/", async (req, res, next) => {
  res.send("Bonjour");
});

server.express.post("/api/post", async (req, res, next) => {
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const { postUrl, price } = req.body;
  if (!postUrl || !price) {
    res.send("error");
  }
  try {
    //await Post.create({ postUrl, price, ip }).save();
    const attempt = await Attempt.findOne({ ip });
    if (attempt) {
      attempt.count = attempt.count + 1;
      attempt.save();
    } else {
      const results = await getRepository(Post)
        .createQueryBuilder("post")
        .select("ip")
        .addSelect("COUNT(*) AS count")
        .groupBy("post.ip")
        .getRawMany();

      const found = false;
      Promise.all(
        results.map(async result => {
          if (result.ip == ip) {
            await Attempt.create({ ip, count: parseInt(result.count) }).save();
            found = true;
          }
        })
      );

      if (!found) {
        await Attempt.create({
          ip: result.ip,
          count: 1
        }).save();
      }
    }
  } catch ({ message }) {
    console.log(message);
  }

  res.send("merci :)");
});

console.log("connexion launch");
createConnection(connectionOptions)
  .then(() =>
    server.start({ port: PORT, playground: "/yo" }, () =>
      console.log(`Server running on  http://localhost:${PORT}`)
    )
  )
  .catch(error => console.log(error));
