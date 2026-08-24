import mongoose from "mongoose";

const { Schema } = mongoose;

const blacklistSchema = new Schema(
  {
    token: {
      type: String,
      required: [true, "Token not available"],
    },
  },
  {
    timestamps: true,
  },
);

const BlacklistToken = mongoose.model("BlacklistToken", blacklistSchema);

export default BlacklistToken;
