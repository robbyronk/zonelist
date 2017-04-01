import React from 'react';
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {closeExportModal} from '../actions'


function mapStateToProps(state) {
  return {
    isExporting: state.is.exporting
  }
}

const mapDispatchToProps = {
  close: closeExportModal
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ExportModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isExporting} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Export Your Zone</ModalHeader>
        <ModalBody>
          textarea to show state
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.props.close}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
