import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsers } from '../store/store';
import { TABLE_HEADERS, ITEMS_PER_PAGE } from '../const/const';
import User from './User';

const UsersTable = ({ users, location }) => {
  const visibleUsers = users
    .filter((user, i) => (Math
      .floor(i / ITEMS_PER_PAGE) + 1 === +location.pathname.split('/')[1]));

  return (
    <table className="table">
      <thead>
        <tr>
          {Object.keys(TABLE_HEADERS).map(header => (
            <td
              key={TABLE_HEADERS[header]}
              className="table__head-cell"
            >
              {TABLE_HEADERS[header]}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {visibleUsers.map(user => (
          <User
            key={user.id}
            user={user}
          />
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  users: getUsers(state),
});

export default connect(mapStateToProps, null)(withRouter(UsersTable));

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
