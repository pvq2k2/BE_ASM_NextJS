import mongoose, { Schema }  from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        type: String,
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        index: true
    }
}, { timestamps: true })
export default mongoose.model("Category", categorySchema);
