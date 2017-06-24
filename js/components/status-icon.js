import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class StatusIcon extends Component {
  static propTypes = {
    status: PropTypes.string,
    className: PropTypes.string,
  };

  render() {
    const statusToIcon = {
      toDo: 'list-alt',
      inProgress: 'star text-warning',
      waiting: 'clock-o',
      done: 'check'
    }
    const icon = statusToIcon[this.props.status || 'toDo']
    return (
      <i className={classNames('fa', `fa-${icon}`, this.props.className)} aria-hidden="true"/>
    )
  }
}
