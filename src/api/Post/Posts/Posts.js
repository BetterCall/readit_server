import { Post } from "../../../entities/Post";

export default {
  Query: {
    Posts: async () => {
      try {
        return Post.find();
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
