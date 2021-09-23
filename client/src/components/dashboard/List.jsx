import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteList, addListItem } from '../../store/actions/list.actions';
import ListItem from './ListItem';

const List = ({ list, deleteList, addListItem }) => {
  const [text, setText] = useState('');

  const handleAddItem = e => {
    e.preventDefault();
    addListItem(list._id, { text });
    setText('');
  };

  return (
    <div className="list">
      <div className="list-title">
        {list.name}
        <i
          className="fas fa-trash delete-list"
          onClick={() => deleteList(list._id)}
        />
      </div>
      {list.listItems &&
        list.listItems.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            listId={list._id}
            itemIndex={index}
          />
        ))}
      <div className="add-list-item">
        <form onSubmit={handleAddItem}>
          <input
            className="add-list-input"
            type="text"
            name="text"
            placeholder="add a to-do item"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <input type="submit" className="btn btn-primary mx2" value="add" />
        </form>
      </div>
    </div>
  );
};

List.propTypes = {
  deleteList: PropTypes.func.isRequired,
  addListItem: PropTypes.func.isRequired
};

export default connect(null, {
  deleteList,
  addListItem
})(List);
