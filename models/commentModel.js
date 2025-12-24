import { model, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
  },
  { timestamps: true }
);

export const Comment = new model("comment", commentSchema);
