import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const verifyToken = (req, res, next) => {
  try {
    let token = req.cookies?.token;
    if (!token) {
      token = req.header('Authorization')?.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true }
    });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    console.error('Admin Verification Error:', error);
    res.status(500).json({ message: 'Server error checking admin status' });
  }
};
