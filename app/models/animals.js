const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    }
},
{ timestamps: true }

);

module.exports = mongoose.model('Animals', animalsSchema);