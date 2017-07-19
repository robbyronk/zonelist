import React from 'react';
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {hideIntro} from '../actions'
import StatusIcon from './status-icon'


function mapStateToProps(state) {
  return {
    isOpen: !state.is.introduced,
  }
}

const mapDispatchToProps = {
  close: hideIntro,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class IntroModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.close} className={this.props.className}>
        <ModalHeader toggle={this.props.close}>Thanks for testing ZoneList</ModalHeader>
        <ModalBody>
          <p>
            Autosave your Work Brain with 2 ideas:
            <ol>
              <li>Every time you <b>think of something</b> to do, <b>write it down</b> in the Outline Mode.</li>
              <li>Work on <b>one thing at a time</b>, starting with the <b>smallest</b> tasks. Focus Mode will guide you.</li>
            </ol>
          </p>
          <p>
            When you get distracted, your <StatusIcon status={'inProgress'}/> Main Focus and where it fits in will be highlighted when you get back.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.props.close}>Get Started!</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
