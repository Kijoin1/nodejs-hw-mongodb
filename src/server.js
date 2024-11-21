import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getContacts, getContactsById } from './services/contacts.js';

dotenv.config();
const PORT = process.env.PORT; 

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),  
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await getContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contacts = await getContactsById(contactId);

    if (!contacts) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    } 

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contacts,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}; 
