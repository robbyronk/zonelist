import React from 'react';
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {closeExportModal} from '../actions'


function mapStateToProps(state) {
  return {
    isExporting: state.is.exporting,
    items: state.items,
  }
}

const mapDispatchToProps = {
  close: closeExportModal
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ExportModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isExporting} toggle={this.props.close} className={this.props.className}>
        <ModalHeader toggle={this.props.close}>Export Your Zone</ModalHeader>
        <ModalBody>
          <textarea className="form-control" name="items" id="items" rows="10">
            {JSON.stringify(this.props.items, null, 2)}
          </textarea>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.close}>Done</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
