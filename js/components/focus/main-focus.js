import React from 'react'

function Focus(props) {
  return (
    <div className="container">
      <div className="alert alert-success text-center" role="alert">
        <h3><i className="fa fa-crosshairs"/> Main Focus</h3>
      </div>
      <div className="row mb-1">
        <div className="col-12">
          <div className="top-level"><span>Big Project</span>
            <div className="tree"><h5>Task Two</h5>
              <div className="tree"><h4>Smaller Task</h4></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 flex-sm-last mb-1">
          <button className="btn btn-block btn-success"><i className="fa fa-check"/> Finished!</button>
        </div>
        <div className="col-sm-3 mb-1">
          <button className="btn btn-block btn-warning"><i className="fa fa-clock-o"/> Snooze</button>
        </div>
        <div className="col-sm-3 flex-sm-first mb-1">
          <button className="btn btn-block"><i className="fa fa-undo"/> Un-focus</button>
        </div>
      </div>
    </div>
  )
}

export default Focus
// export default connect(null, {actions})(Focus)
