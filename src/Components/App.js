import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoading, getUsersCount, getLoadingError } from '../store/store';
import { loadUsers } from '../store/actions';
import UsersTable from './UsersTable';
import Pagination from './Pagination';
import '../styles/App.scss';

class App extends React.Component {
  componentDidMount() {
    const { fetchUsers } = this.props;

    fetchUsers();
  }

  componentDidUpdate(prevProps) {
    const { history, location } = this.props;

    if (location.pathname.length !== 2
      || !/[1-4]/.test(location.pathname.slice(-1))) {
      history.push({ pathname: '/1' });
    }
  }

  render() {
    const { isLoading, loadingError, usersCount } = this.props;

    if (isLoading) {
      return (
        <Loader className="spinner" type="ThreeDots" color="#324960" />
      );
    }

    if (loadingError) {
      return (
        <p className="error-message">Sorry, something went wrong.</p>
      );
    }

    return (
      <div className="App">
        {usersCount && (
          <>
            <h1>Users Table</h1>
            <UsersTable />
            <Pagination />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  loadingError: getLoadingError(state),
  usersCount: getUsersCount(state),
});

export default connect(
  mapStateToProps,
  { fetchUsers: loadUsers }
)(withRouter(App));

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadingError: PropTypes.bool.isRequired,
  usersCount: PropTypes.number.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
