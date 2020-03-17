import { Post } from "../../../entities/Post";

export default {
  Query: {
    Total: async () => {
      try {
        const posts = await Post.find();
        const total = posts.length;
        const amount = posts.map(s => s.price).reduce((a, b) => a + b, 0);

        return {
          total,
          amount
        };
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
