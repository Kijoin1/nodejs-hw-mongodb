import { ContactsCollection } from '../db/models/contact.js';

export const getContacts = async () => {
  return await ContactsCollection.find();
};

export const getContactsById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};

export const createContact = async (contact) => {
  return await ContactsCollection.create(contact);
};

export const updateContact = async (contactId, contact) => {
  return await ContactsCollection.findByIdAndUpdate(contactId, contact, {
    new: true,
  });
};

export function deleteContact(contactId) {
  return ContactsCollection.findByIdAndDelete(contactId);
}
