const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function updateAllContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(result);
  } catch (error) {
    console.log(error.me);
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);

    return result || null;
  } catch (error) {
    console.log(error);
  }
};

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateAllContacts(contacts);
    return result;
  } catch (error) {
    console.log("error: ", error);
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await updateAllContacts(contacts);

  return newContact;
}

const updateContact = async (contactId, data) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...data };
  await updateAllContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
