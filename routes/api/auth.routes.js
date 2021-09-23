import express from 'express';
import { check, validationResult } from 'express-validator';
import protect from '../../middleware/auth.js';
import User from '../../models/User.js';
import sendToken from '../../utils/sendToken.js';

const router = express.Router();

// @route   POST /api/auth
// @desc    Login user & get token
// @access  Public

const userValidation = [
  check('email', 'please enter a valid email').isEmail(),
  check('password', 'password required').exists()
];

router.post('/', userValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ errors: [{ message: 'invalid credentials' }] });

    let isMatch = await user.matchPasswords(password);

    if (!isMatch)
      return res
        .status(400)
        .json({ errors: [{ message: 'invalid credentials' }] });

    sendToken(user, 201, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   GET /api/auth
// @desc    Get current user
// @access  Private

router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

export default router;
