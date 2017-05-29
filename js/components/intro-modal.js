import React from 'react';
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {hideIntro} from '../actions'


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
        <ModalHeader toggle={this.props.close}>Welcome to ZoneList!</ModalHeader>
        <ModalBody>
          <p>This is the introduction to ZoneList</p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.props.close}>Get Started</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
