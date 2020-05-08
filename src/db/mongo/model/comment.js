import mongoose from "mongoose";

const DBSchema = mongoose.Schema;

const schema = new DBSchema({
  date: String,
  text: String,
  postId: String,
});

export const CommentModel = mongoose.model("Comment", schema);
