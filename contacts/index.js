const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./contacts.js");

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

module.exports = { contacts };
