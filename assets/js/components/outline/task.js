import React from 'react'

import TaskTitle from './task-title'

const Task = ({task}) => (
  <div className="row">
    <div className="col-12">
      <TaskTitle task={task}/>
    </div>
  </div>
)

export default Task
