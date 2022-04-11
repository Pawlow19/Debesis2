import React from "react";

const ReadOnlyRow = ({ email, handleEditClick, handleDeleteClick }) => {

  const regex = /(<([^>]+)>)/ig;

  return (
    <tr>
      <td>{email.title}</td>
      <td>{email.content.replace(regex, '')}</td>
      <td>{email.adate}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, email)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(email.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;