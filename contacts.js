const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  return JSON.parse(fs.readFile(contactsPath, 'utf8'));
  // const contacts = JSON.parse(fs.readFile(contactsPath, 'utf8'));
  // console.table(contacts);
}

function getContactById(contactId) {
  const allContacts = listContacts();
  const contactToFind = allContacts.findIndex(contact => contact.id === contactId.toString());

  if (contactToFind === -1) {
    return `there is no contact with id: ${contactId}`;
  }
  return contactToFind;
}

async function removeContact(contactId) {
  const allContacts = listContacts();
  try {
    const newContactsList = JSON.stringify(
      allContacts.filter(contact => contact.id !== contactId.toString())
    );
    await fs.writeFile(contactsPath, newContactsList);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const allContacts = listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  try {
    const newContactsList = JSON.stringify([...allContacts, newContact]);
    await fs.writeFile(contactsPath, newContactsList);
    return newContactsList;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, addContact, getContactById, removeContact };
