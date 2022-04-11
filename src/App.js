import './App.css';
import data from "./mock-data.json";
import { useState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';

function App() {
  
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0,10);

  const [emails, setEmails] = useState(data);
  const [addFormData, setAddFormData] = useState({
    title: '',
    content: '',
    adate: date
  });

  const [editFormData, setEditFormData] = useState({
    title: '',
    content: '',
    adate: ''
  });

  const [editEmailId, setEditEmailId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData}
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newEmail = {
      id: nanoid(),
      title: addFormData.title,
      content: addFormData.content,
      adate: addFormData.adate
    }

    const newEmails = [...emails, newEmail];
    setEmails(newEmails);
  };

    const handleEditFormSubmit = (event) => {
      event.preventDefault();
  
      const editedEmail = {
        id: editEmailId,
        title: editFormData.title,
        content: editFormData.content,
        adate: editFormData.adate,
      };
  
      const newEmails = [...emails];
  
      const index = emails.findIndex((email) => email.id === editEmailId);
  
      newEmails[index] = editedEmail;
  
      setEmails(newEmails);
      setEditEmailId(null);
    };

    const handleEditClick = (event, email) => {
      event.preventDefault();
      setEditEmailId(email.id);
  
      const formValues = {
        title: email.title,
        content: email.content,
        adate: email.adate,
      };
  
      setEditFormData(formValues);
    };
  
    const handleCancelClick = () => {
      setEditEmailId(null);
    };
  
    const handleDeleteClick = (emailId) => {
      const newEmails = [...emails];
  
      const index = emails.findIndex((email) => email.id === emailId);
  
      newEmails.splice(index, 1);
  
      setEmails(newEmails);
    };

  return (
    <div className="App">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Treść</th>
              <th>Data dodania</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email)=>(
              <Fragment>
              {editEmailId === email.id ? (
                <EditableRow
                  editFormData={editFormData}
                  handleEditFormChange={handleEditFormChange}
                  handleCancelClick={handleCancelClick}
                />
              ) : (
                <ReadOnlyRow
                  email={email}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              )}
            </Fragment>
            ))} 
          </tbody>
        </table>
      </form>
      <h2>Dodaj email</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="title"
          required="required"
          placeholder="Wprowadź tytuł"
          minlength="3"
          maxlength="250"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="content"
          required="required"
          placeholder="Wprowadź treść"
          onChange={handleAddFormChange}
        />
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
}

export default App;
