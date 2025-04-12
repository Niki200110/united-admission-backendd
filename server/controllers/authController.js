const jwt = require('jsonwebtoken');

const googleLogin = async (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const isAdmin = email === process.env.ADMIN_EMAIL;

  const token = jwt.sign(
    { email, name, role: isAdmin ? 'admin' : 'student' },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  });

  res.status(200).json({
    message: 'Login successful',
    role: isAdmin ? 'admin' : 'student',
    token,
  });
};

module.exports = { googleLogin };
