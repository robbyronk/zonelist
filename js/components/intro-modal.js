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
        <ModalHeader toggle={this.props.close}>Welcome to ZoneList</ModalHeader>
        <ModalBody>
          <p>
            Break your challenge down in to tasks and then break those tasks down into smaller tasks using
            the <b>outline</b>. Then, pick one to be your <b>main focus</b> and finish it. Pick another until you
            finish.
          </p>
          <p>
            When you get distracted, don't fret! Your <b>main focus</b> will be highlighted when you get back.
          </p>
          <p>
            If plans change, no worries. Just go back to the <b>outline</b> and change the plan.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.props.close}>Get Started!</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
