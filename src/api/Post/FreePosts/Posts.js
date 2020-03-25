import { Post } from "../../../entities/Post";

export default {
  Mutation: {
    FreePosts: async () => {
      try {
        const posts = await Post.find();

        Promise.all(
          posts.map(async post => {
            await post.remove();
          })
        );
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
