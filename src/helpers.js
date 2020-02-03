export const filterContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

export const findContact = (contacts, contact) =>
  contacts.find(item => item.name.toLowerCase() === contact.name.toLowerCase());
