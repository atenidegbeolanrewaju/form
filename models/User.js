const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    first_name: {
        type: String,
        required: true
    },
    last_name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    slack: {
        type: String,
        required: true
    },
    suggestion: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);