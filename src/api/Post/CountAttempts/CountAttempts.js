import { Post } from "../../../entities/Post";
import { createQueryBuilder, getRepository } from "typeorm";

export default {
  Query: {
    CountAttempts: async () => {
      try {
        return await getRepository(Post)
          .createQueryBuilder("post")
          .select("ip")
          .addSelect("COUNT(*) AS count")
          .groupBy("post.ip")
          .getRawMany();
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
