import React, {PropTypes} from 'react'
import classNames from 'classnames'

function StatusIcon({status, className, style}) {
  const statusToIcon = {
    toDo: 'list-alt',
    inProgress: 'star text-warning',
    waiting: 'clock-o',
    done: 'check'
  }
  const icon = statusToIcon[status || 'toDo']
  return (
    <i className={classNames('fa', 'fa-lg', `fa-${icon}`, className)} style={style} aria-hidden="true"/>
  )
}

StatusIcon.propTypes = {
  status: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default StatusIcon
