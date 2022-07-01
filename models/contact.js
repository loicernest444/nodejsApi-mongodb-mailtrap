const mongoose = require('mongoose');
var Shema = mongoose.Schema;

const ContactShema = new Shema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, { timestamps: true });

var Contact = mongoose.model('Contact', ContactShema);
module.exports = Contact;