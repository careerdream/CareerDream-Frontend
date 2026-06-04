import express from 'express';
import { PrismaClient } from '@prisma/client';
import { sendThankYouEmail } from '../services/emailService.js';

const router = express.Router();
const prisma = new PrismaClient();

// @route   POST /api/subscribe
// @desc    Subscribe a user to the mailing list
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ msg: 'Invalid email' });
    }

    // Check if subscriber already exists
    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ msg: 'Already subscribed' });
    }

    // Create subscriber
    const newSubscriber = await prisma.subscriber.create({
      data: { email },
    });

    // Send thank you email (don't await so the response is fast)
    sendThankYouEmail(email);

    res.json({ msg: 'Thank you for subscribing!', subscriber: newSubscriber });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   GET /api/subscribe/unsubscribe
// @desc    Unsubscribe a user from the mailing list
router.get('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).send('Email is required');
    }

    // Delete the subscriber
    await prisma.subscriber.deleteMany({
      where: { email },
    });

    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
