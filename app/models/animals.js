const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
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
animalsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Animals', animalsSchema);