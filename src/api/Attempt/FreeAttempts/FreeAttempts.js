import { Attempt } from "../../../entities/Attempt";

export default {
  Mutation: {
    FreeAttempts: async () => {
      try {
        const attempts = await Attempt.find();

        Promise.all(
          attempts.map(async attempt => {
            await attempt.remove();
          })
        );
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
