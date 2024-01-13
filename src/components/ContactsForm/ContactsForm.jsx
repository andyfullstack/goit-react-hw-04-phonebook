import { useState } from 'react';
import { Form, Input, Button } from './ContactsForm.styled';

const ContactsForm = props => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const onInputChange = e => {
    const { name, value } = e.target;

    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = e => {
    e.preventDefault();
    props.onFormSubmit(state);
    e.target.reset();
  };

  return (
    <Form onSubmit={onFormSubmit} style={{ margin: 'auto' }}>
      <label htmlFor="name">Name</label>
      <Input
        type="text"
        name="name"
        onChange={onInputChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        required
      />
      <label htmlFor="number">Contact Number</label>
      <Input
        type="tel"
        name="number"
        onChange={onInputChange}
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        required
      />
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

export default ContactsForm;
