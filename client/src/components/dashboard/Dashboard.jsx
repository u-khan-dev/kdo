import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { getLists } from '../../store/actions/list.actions';
import List from './List';
import AddListForm from './AddListForm';

const override = css`
  display: block;
  margin: 400px auto;
`;

const Dashboard = ({ auth: { user }, list, getLists }) => {
  useEffect(() => {
    getLists();
  }, [getLists]);

  const [displayAddListForm, toggleAddListForm] = useState(false);

  const handleAddListCLick = e => {
    e.preventDefault();
    toggleAddListForm(!displayAddListForm);
  };

  return list.loading && user === null ? (
    <ScaleLoader loading={list.loading} css={override} color="green" />
  ) : (
    <>
      <h1 className="landing-heading">{user && `Hello, ${user.name}.`}</h1>
      <button className="btn btn-primary my2" onClick={handleAddListCLick}>
        Create New List{' '}
        {displayAddListForm ? (
          <i class="fas fa-caret-up" />
        ) : (
          <i class="fas fa-caret-down" />
        )}
      </button>
      {displayAddListForm && (
        <AddListForm
          toggleForm={toggleAddListForm}
          displayForm={displayAddListForm}
        />
      )}
      <p className="landing-subheading my2">Your lists...</p>
      {list.lists &&
        list.lists.map(list => <List key={list._id} list={list} />)}
    </>
  );
};

Dashboard.propTypes = {
  getLists: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  list: state.list
});

export default connect(mapStateToProps, { getLists })(Dashboard);
