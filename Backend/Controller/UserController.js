import User from "../Models/User.js";

export const getUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

export const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    const savedUser = await newUser.save();

    res.json({ userId: savedUser._id, username: savedUser.username});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ user});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
