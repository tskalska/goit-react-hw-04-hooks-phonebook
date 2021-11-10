import {useState, useEffect} from 'react';
import './App.css'; 
import Form from './components/form/Form'
import Filter from './components/filter/Filter';
import ContactList from './components/contactList/ContactList';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('items')) ?? ''
  );
  const [filterForm, setFilter] = useState('');

  const formSubmitHandler = data => {
    const normalizedFilter = data.newName.toLowerCase();
    
    if (contacts.some(contact => contact.name.toLowerCase()===normalizedFilter)){
      alert(`The name ${data.newName} already exists.`)
      return;
    }

    setContacts ([...contacts, {
      name: data.newName,
      number: data.newNumber,
    }])
  }

  const handleFilterChange = (event) => {
    setFilter (event.currentTarget.value) 
  }

  useEffect(()=> {
    localStorage.setItem('items', JSON.stringify(contacts));
  }, [contacts])

  const deleteButtonHandler = name => {
    const newContacts = contacts.filter(contact => contact.name !== name);
    setContacts (newContacts)
  } 

  return (
    <div>
      <h1>Phonebook</h1><br/>
      <Form
        onSubmit={ formSubmitHandler }
      />

      <Filter
        handleFilterChange={handleFilterChange}
      />
      
      <ContactList
        contacts={contacts}
        filterX={filterForm}
        deleteButtonHandler={deleteButtonHandler}
      />
    </div>
  );
}

