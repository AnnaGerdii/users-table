import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { TABLE_HEADERS } from '../const/const';

const User = ({ user }) => (
  <tr className="table__row">
    {Object.keys(TABLE_HEADERS).map(header => (
      <td
        className={cn({
          table__cell: true,
          table__cell_desc: header === 'desc',
        })}
        key={header}
      >
        {user[header]}
      </td>
    ))}
  </tr>
);

export default User;

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};
