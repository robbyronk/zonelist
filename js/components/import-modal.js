import React from 'react';
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {closeImportModal} from '../actions'


function mapStateToProps(state) {
  return {
    isImporting: state.is.importing
  }
}

const mapDispatchToProps = {
  close: closeImportModal
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ImportModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isImporting} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Import Your Zone</ModalHeader>
        <ModalBody>
          textarea to take in state
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.props.close}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
