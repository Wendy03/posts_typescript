import { Document, model, Schema } from 'mongoose';

interface IPost extends Document {
  content: string;
  image?: string;
  createdAt: Date;
  name: string;
  likes: number;
}

const postSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    image: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    name: {
      type: String,
      required: [true, '貼文姓名未填寫'],
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

const Post = model<IPost>('Post', postSchema);

export default Post;
