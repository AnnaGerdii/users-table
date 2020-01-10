import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';
import { getUsersCount } from '../store/store';
import { ITEMS_PER_PAGE } from '../const/const';

const Pagination = ({ usersCount, location }) => {
  const activePage = +location.pathname.split('/')[1];
  const pageNumber = Math.ceil(usersCount / ITEMS_PER_PAGE);
  const firstItemShown = ITEMS_PER_PAGE * activePage - (ITEMS_PER_PAGE - 1);
  const lastItemShown = ITEMS_PER_PAGE * activePage > usersCount
    ? usersCount
    : ITEMS_PER_PAGE * activePage;

  return (
    <footer className="footer">
      <p>
        {`Showing ${firstItemShown} to
        ${lastItemShown} of ${usersCount} entries`}
      </p>
      <ul className="pagination">
        <NavLink
          to={`${activePage - 1}`}
          replace
          className={cn({
            'pagination__button pagination__button_prev': true,
            pagination__button_disabled: activePage === 1,
          })}
          onClick={(event) => {
            if (activePage === 1) {
              event.preventDefault();
            }
          }}
        >
          Previous
        </NavLink>
        {[...Array(pageNumber).keys()].map(page => (
          <li key={page}>
            <NavLink
              to={`${page + 1}`}
              replace
              className="pagination__button"
              activeClassName="pagination__button_active"
            >
              {page + 1}
            </NavLink>
          </li>
        ))}
        <NavLink
          to={`${activePage + 1}`}
          replace
          className={cn({
            pagination__button: true,
            pagination__button_disabled: activePage === pageNumber,
          })}
          onClick={(event) => {
            if (activePage === pageNumber) {
              event.preventDefault();
            }
          }}
        >
          Next
        </NavLink>
      </ul>
    </footer>
  );
};

const mapStateToProps = state => ({
  usersCount: getUsersCount(state),
});

export default connect(mapStateToProps, null)(withRouter(Pagination));

Pagination.propTypes = {
  usersCount: PropTypes.number.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
