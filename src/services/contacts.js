import { ContactsCollection } from '../db/models/contact.js';

export const getContacts = async ({ page, perPage, sortBy, sortOrder}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const contactsQuery = ContactsCollection.find();

  const [total, data] = await Promise.all([
    ContactsCollection.countDocuments(contactsQuery),
    contactsQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
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
