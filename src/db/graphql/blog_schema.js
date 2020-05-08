const graphql = require("graphql");
const _ = require("lodash");
import { CommentModel } from "../mongo/model/comment";
import { BlogPostModel } from "../mongo/model/blog_post";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    post: {
      type: BlogPostType,
      resolve(parent, args) {
        return BlogPostModel.findById(parent.postId);
      },
    },
  }),
});

const BlogPostType = new GraphQLObjectType({
  name: "BlogPost",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
    date: { type: GraphQLString },
    html: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return CommentModel.find({ postId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return CommentModel.findById(args.id);
      },
    },
    blogPost: {
      type: BlogPostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return BlogPostModel.findById(args.id);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return CommentModel.find({});
      },
    },
    blogPosts: {
      type: new GraphQLList(BlogPostType),
      resolve(parent, args) {
        return BlogPostModel.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBlogPost: {
      type: BlogPostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLString },
        slug: { type: GraphQLString },
        html: { type: GraphQLString },
      },
      resolve(parent, args) {
        let blogPost = new BlogPostModel({
          title: args.title,
          date: args.date,
          slug: args.slug,
          html: args.html,
        });
        return blogPost.save();
      },
    },
    addComment: {
      type: CommentType,
      args: {
        date: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: GraphQLString },
        postId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let comment = new CommentModel({
          date: args.date1,
          text: args.text,
          postId: args.postId,
        });
        return comment.save();
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
