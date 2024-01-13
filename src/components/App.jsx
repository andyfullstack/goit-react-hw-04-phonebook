import ContactsForm from './ContactsForm/ContactsForm.jsx';
import ContactsList from './ContactsList/ContactsList.jsx';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import { useEffect, useState } from 'react';

const App = () => {
  // state = {
  //   contacts: [],
  //   filter: '',
  // };

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromStorage = localStorage.getItem('contacts');
    if (contactsFromStorage) {
      setContacts(JSON.parse(contactsFromStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isExist = contacts.some(contact => contact.name === name);

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prevState => [...prevState, contact]);
    // console.log(contacts);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const handleInputChange = e => {
    setFilter(e.target.value);
  };

  const normalizedFilter = filter.toLocaleLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <>
      <h1 style={{ marginLeft: [' 800px '] }}>Phonebook</h1>
      <ContactsForm onFormSubmit={addContact} />
      <h1 style={{ marginLeft: '800px' }}>Contacts</h1>
      <Filter onInputChange={handleInputChange} />
      <ContactsList
        visibleContacts={visibleContacts}
        onDeleteContact={deleteContact}
      />
    </>
  );
};

export default App;
