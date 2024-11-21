import { StudentsCollection } from '../db/models/student.js';

export const getContacts = async () => {
  return await StudentsCollection.find();
};

export const getContactsById = async (id) => {
    return await StudentsCollection.findById(id);
  };