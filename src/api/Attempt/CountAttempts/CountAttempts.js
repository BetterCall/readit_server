import { Post } from "../../../entities/Post";
import { Attempt } from "../../../entities/Attempt";
import { createQueryBuilder, getRepository } from "typeorm";

export default {
  Query: {
    CountAttempts: async () => {
      try {
        return Attempt.find();
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
// return await getRepository(Post)
// .createQueryBuilder("post")
// .select("ip")
// .addSelect("COUNT(*) AS count")
// .groupBy("post.ip")
// .getRawMany();
