import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    status: { type: String, default: 'active' },
    register_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
