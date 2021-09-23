import express from 'express';
import { check, validationResult } from 'express-validator';
import protect from '../../middleware/auth.js';
import User from '../../models/User.js';
import List from '../../models/List.js';

const router = express.Router();

// @route   POST /api/lists
// @desc    Create a list
// @access  Private

const listValidation = [check('name', 'name is required').not().isEmpty()];

router.post('/', [protect, listValidation], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name } = req.body;

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newList = new List({ name, user: user.id });

    const list = await newList.save();

    return res.json(list);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @route   GET /api/lists
// @desc    Get all lists of logged-in user
// @access  Private

router.get('/', protect, async (req, res) => {
  try {
    const lists = await List.find({ user: req.user.id });
    return res.json(lists);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @route   GET /api/lists/:id
// @desc    Get a single list
// @access  Private

router.get('/:id', protect, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list) {
      return res
        .status(404)
        .json({ status: 'failure', message: 'list not found' });
    }

    return res.json(list);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId')
      return res
        .status(404)
        .json({ status: 'failure', message: 'list not found' });

    return res.status(500).send('server error');
  }
});

// @route   POST /api/lists/:listId
// @desc    Add list item to list
// @access  Private

const listItemValidation = [check('text', 'text is required').not().isEmpty()];

router.post('/:listId', [protect, listItemValidation], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const list = await List.findById(req.params.listId);

    list.listItems.push(req.body.text);

    await list.save();

    return res.json(list.listItems);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @route   DELETE /api/lists/:listId/:itemIndex
// @desc    Remove list item from list
// @access  Private

router.delete('/items/:listId/:itemIndex', protect, async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);

    list.listItems.splice(req.params.itemIndex, 1);

    await list.save();

    return res.json(list);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @route   DELETE /api/lists/:id
// @desc    Delete a single list
// @access  Private

router.delete('/:id', protect, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list)
      return res
        .status(404)
        .json({ status: 'failure', message: 'list not found' });

    if (list.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ status: 'failure', message: 'user not authorized' });

    await list.remove();

    return res.json({ status: 'success', message: 'list deleted' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId')
      return res
        .status(404)
        .json({ status: 'failure', message: 'list not found' });

    return res.status(500).send('server error');
  }
});

export default router;
