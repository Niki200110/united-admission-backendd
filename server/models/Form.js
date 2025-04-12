const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: String,
  phone: String,
  branch: String,
  year: String,
  dob: String,
  documents: [String],
  status: {
    type: String,
    default: 'Pending', // Admin will change it later
  },
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
