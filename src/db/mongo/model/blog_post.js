import mongoose from "mongoose";

const DBSchema = mongoose.Schema;

const schema = new DBSchema({
  title: String,
  date: String,
  slug: String,
  html: String,
});

export const BlogPostModel = mongoose.model("BlogPost", schema);
