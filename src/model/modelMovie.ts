import mongoose, { Query } from "mongoose";

/*
{
    "title": "Batman: Batmam Liga da Justiça 07 ",
    "description": "Quando a ameaça conhecida como o Coringa surge de seu passado, ele causa estragos e caos no povo de Gotham.",
    "year": 2015,
    "genres": "Action, Crime, Drama",
    "image": "https://tmdb.org",
    "video": "https://youtube.com"
}
    */

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    titleNormalized: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    genres: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
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
movieSchema.pre(/^find/, function(this: Query<any, any>) {
    this.where({ isDeleted: false });
});



export default mongoose.model('Movie', movieSchema);