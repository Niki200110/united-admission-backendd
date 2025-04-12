const express = require('express');
const multer = require('multer');
const {
  createForm,
  getStudentForm,
  getAllForms,
  updateFormStatus
} = require('../controllers/formController');

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes
router.post('/submit', upload.array('documents'), createForm);
router.get('/myform/:email', getStudentForm);
router.get('/all', getAllForms);
router.put('/status/:id', updateFormStatus);

module.exports = router;
