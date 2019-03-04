const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const veterinarianSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    regionalVeterinaryCouncilNumber: {
        type: String,
        required: true
    }
},
{   timestamps: true    }
);

module.exports = mongoose.model('Veterinarian', veterinarianSchema);