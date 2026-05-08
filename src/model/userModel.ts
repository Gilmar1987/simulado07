import { Query, Schema, model, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

userSchema.pre(/^find/, function(this: Query<any, any>) {
    this.where({ isDeleted: false });
});

const UserModel = model('User', userSchema);
export type UserType = InferSchemaType<typeof userSchema>;
export default UserModel;