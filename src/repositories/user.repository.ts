import UserModel from '../model/userModel.js';


export const userRepository = {

    create: async (name: string, email: string, password: string) => {
        const newUser = new UserModel({ name, email, password });
        return await newUser.save();
    },

    findByEmail: async (email: string) => {
        return await UserModel.findOne({ email });
    },

    findById: async (id: string) => {
        return await UserModel.findById(id);
    },

    update: async (id: string, updates: Partial<{ name: string; email: string; password: string; role: string }>) => {
        return await UserModel.findByIdAndUpdate(id, updates, { returnDocument: 'after' });
    },

    softDelete: async (id: string) => {
        return await UserModel.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() }, { returnDocument: 'after' });
    },
    
    list: async () => {
        return await UserModel.find({});
    },
}