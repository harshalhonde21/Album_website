import Admin from '../Models/Admin.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ username, password });

    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
