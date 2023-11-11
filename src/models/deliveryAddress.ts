import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    clientName: String,
    country: String,
    city: String,
    address: String,
    postalCode: String,
}, { timestamps: true });

const Address = mongoose.models.Address || mongoose.model("Address", AddressSchema);

export default Address;