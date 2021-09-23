import { connect } from 'react-redux';
import { deleteListItem } from '../../store/actions/list.actions.js';
import PropTypes from 'prop-types';

const ListItem = ({ item, listId, itemIndex, deleteListItem }) => {
  return (
    <div className="list-item">
      <i
        className="fas fa-times mx2 delete-list-item"
        onClick={() => deleteListItem(listId, itemIndex)}
      />
      {item}
    </div>
  );
};

ListItem.propTypes = {
  deleteListItem: PropTypes.func.isRequired
};

export default connect(null, { deleteListItem })(ListItem);
