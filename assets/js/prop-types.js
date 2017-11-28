import PropTypes from 'prop-types';

export const TaskPropType = PropTypes.shape(
  {
    title: PropTypes.string,
    status: PropTypes.string,
    root: PropTypes.bool,
    id: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.number)
  }
)
