import express from 'express';

import {
  getContactController,
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactController));

router.post('/contacts', jsonParser, ctrlWrapper(createContactController));

router.patch(
  '/contacts/:contactId',
  jsonParser,
  ctrlWrapper(updateContactController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
