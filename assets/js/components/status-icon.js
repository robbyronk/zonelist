import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function StatusIcon({status, className, style}) {
  const statusToIcon = {
    toDo: 'star',
    inProgress: 'star text-warning',
    waiting: 'moon-o',
    done: 'star text-success'
  }
  const icon = statusToIcon[status || 'toDo']
  return (
    <i className={classNames('fa', `fa-${icon}`, className)} style={style} aria-hidden="true"/>
  )
}

StatusIcon.propTypes = {
  status: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default StatusIcon
