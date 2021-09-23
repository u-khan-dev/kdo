import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addList } from '../../store/actions/list.actions.js';

const AddListForm = ({ addList, displayForm, toggleForm }) => {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addList({ name });
    setName('');
    toggleForm(!displayForm);
  };

  return (
    <>
      <form className="add-list-form" onSubmit={handleSubmit}>
        <h1>Create a List</h1>
        <div className="add-list-div">
          <input
            className="add-list-input"
            name="name"
            type="text"
            placeholder="list name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="submit"
            className="btn btn-secondary my2"
            value="submit"
          />
        </div>
      </form>
    </>
  );
};

AddListForm.propTypes = {
  addList: PropTypes.func.isRequired
};

export default connect(null, { addList })(AddListForm);
