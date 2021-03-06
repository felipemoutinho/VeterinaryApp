const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const reportsSchema = new Schema({
    veterinarian: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinarian',
        required: true
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animals',
        required: true
    },
    dateOfService: {
        type: Date,
        required: true
    },
    observation: {
        type: String,
        required: true
    }
},
{timestamps: true}
);
reportsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Reports',reportsSchema);