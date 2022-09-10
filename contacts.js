const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    const contactsList = JSON.parse(contacts);
    return contactsList;
  } catch (error) {
    return console.error(error);
  }
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactToFind = allContacts.find(contact => contact.id === contactId.toString());
  return contactToFind;
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    const newContactsList = JSON.stringify([...allContacts, newContact]);
    fs.writeFile(contactsPath, newContactsList);
    return newContact;
  } catch (error) {
    return console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const contactToRemove = allContacts.find(contact => contact.id === contactId.toString());

    const newContactsList = JSON.stringify(
      allContacts.filter(contact => contact.id !== contactId.toString())
    );
    fs.writeFile(contactsPath, newContactsList);
    return contactToRemove;
  } catch (error) {
    return console.error(error);
  }
}

module.exports = { listContacts, getContactById, addContact, removeContact };
