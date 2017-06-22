import React from 'react'
import {connect} from 'react-redux'

function Footer(props) {
  return (
    <footer className="footer mt-4 bg-faded">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-auto">
            <span>Outline Mode <i className="fa fa-toggle-off fa-lg"/> Footer Mode</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
// export default connect(null, {actions})(Footer)
