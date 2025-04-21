// backend/controllers/authController.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminUser = {
    username: 'admin',
    password: '$2b$10$WM6rXRw8c41gxVXBBHQZEuEOmvI/P/d2mj0rbNFJNv5ZviYOZ6tKC', // hashed 'admin123'
  };
  

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (username !== adminUser.username) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, adminUser.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: adminUser.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
};
