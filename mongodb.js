require('dotenv').config()

const mongoose = require('mongoose');



function connectToDB() {
    mongoose.connect(
        "mongodb://localhost:27017/reviewDB",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
};



const reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);


module.exports = {
    connectToDB, reviewSchema, Review
}

