const Form = require('../models/Form');

// Submit student form
const createForm = async (req, res) => {
  try {
    const files = req.files.map(file => file.filename);
    const newForm = new Form({
      ...req.body,
      documents: files,
    });

    await newForm.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Form submission failed', details: error.message });
  }
};

// Get student form by email
const getStudentForm = async (req, res) => {
  try {
    const { email } = req.params;
    const form = await Form.findOne({ email });
    if (!form) return res.status(404).json({ message: 'No form found' });
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get all forms (for admin), with optional filters
const getAllForms = async (req, res) => {
  try {
    const { year, branch } = req.query;
    const query = {};
    if (year) query.year = year;
    if (branch) query.branch = branch;

    const forms = await Form.find(query);
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
};

// Update status of a form (admin)
const updateFormStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Form.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

module.exports = {
  createForm,
  getStudentForm,
  getAllForms,
  updateFormStatus
};
