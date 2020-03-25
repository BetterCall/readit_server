import { Post } from "../../../entities/Post";
import { getRepository } from "typeorm";
import { Attempt } from "../../../entities/Attempt";

export default {
  Mutation: {
    InitAttempts: async () => {
      try {
        const results = await getRepository(Post)
          .createQueryBuilder("post")
          .select("ip")
          .addSelect("COUNT(*) AS count")
          .groupBy("post.ip")
          .getRawMany();

        Promise.all(
          results.map(async result => {
            const attemp = await Attempt.findOne({ ip: result.ip });
            if (!attemp) {
              await Attempt.create({
                ip: result.ip,
                count: parseInt(result.count)
              }).save();
            }
          })
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
