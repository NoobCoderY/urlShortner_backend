import mongoose from "mongoose";

export interface url {
  shortId: string
  redirectURL: string
  visitHistory:[number]
}

const urlSchema = new mongoose.Schema<url>(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);


export default mongoose.model("url", urlSchema);
