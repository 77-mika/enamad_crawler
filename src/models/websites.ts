import mongoose, { Document, Schema } from "mongoose";

export interface Iwebsite extends Document {
    domain: string;
    name: string;
    province: string;
    city: string;
    stars: number;
    grantDate: string;
    expiryDate: string;
    trustSealUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

const WebsiteSchema = new Schema<Iwebsite>(
    {
        domain: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        province: {
            type: String,
            default: "",
        },
        city: {
            type: String,
            default: "",
        },
        stars: {
            type: Number,
            min: 1,
            max: 5,
            default: 1,
        },
        grantDate: {
            type: String,
            default: "",
        },
        expiryDate: {
            type: String,
            default: "",
        },
        trustSealUrl: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    },
);

WebsiteSchema.index({ stars: 1 });
WebsiteSchema.index({ city: 1 });
WebsiteSchema.index({ expiryDate: 1 });
WebsiteSchema.index({ name: "text" }); // for text search on name

const website = mongoose.model<Iwebsite>("website", WebsiteSchema);

export default website;
