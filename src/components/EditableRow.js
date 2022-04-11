import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input 
            type="text" 
            required="required" 
            name="title" 
            placeholder="Wprowadź tytuł" 
            minlength="3" 
            maxlength="250"
            value={editFormData.title}
            onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input 
            type="text" 
            required="required" 
            name="content" 
            placeholder="Wprowadź treść"
            value={editFormData.content}
            onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input 
            type="date" 
            required="required" 
            name="adate" 
            readOnly="true"
            value={editFormData.adate}
            onChange={handleEditFormChange}
            ></input>
            </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Anuluj
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;