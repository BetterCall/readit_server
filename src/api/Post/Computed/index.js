export default {
  PostModel: {
    createdAt: parent => {
      return new Date(parseInt(parent.created_at)).toLocaleDateString();
    }
  }
};
