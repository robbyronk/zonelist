import React from 'react';
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {isPlainObject} from 'lodash'
import {closeImportModal, setItems} from '../actions'


function mapStateToProps(state) {
  return {
    isImporting: state.is.importing
  }
}

const mapDispatchToProps = {
  close: closeImportModal,
  set: setItems,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ImportModal extends React.Component {
  state = {
    isInvalid: true,
    importData: '',
  }

  _onChange = ({target: {value: importData}}) => this.setState({importData})

  _isInvalid = () => {
    try {
      const items = JSON.parse(this.state.importData)
      return !isPlainObject(items)
    } catch (e) {
      return true
    }
  }

  _submit = () => {
    this.props.set(JSON.parse(this.state.importData))
  }

  render() {
    return (
      <Modal isOpen={this.props.isImporting} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Import Your Zone</ModalHeader>
        <ModalBody>
          <textarea
            className="form-control"
            name="items"
            id="items"
            rows="10"
            value={this.state.importData}
            onChange={this._onChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="warning"
            disabled={this._isInvalid()}
            onClick={this._submit}>
            Load this Zone
          </Button>{' '}
          <Button color="secondary" onClick={this.props.close}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
