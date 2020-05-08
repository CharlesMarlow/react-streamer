import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { toggleModal } from '../../../shared/actions';
import ExperimentForm from '../ExperimentForm/ExperimentForm';
import _ from 'lodash';

import './ExperimentEdit.css';

class ExperimentEdit extends Component {

  render() {
    const { experiment, isModalDisplayed, toggleModal } = this.props;
    return (
      <Modal
        size={'tiny'}
        open={isModalDisplayed}
        onClose={() => toggleModal(false)}
        className="edit-container"
      >
        <h3 className="title">Edit Experiment</h3>
        <ExperimentForm onSubmit={this.onSubmit} experiment={experiment} />
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isModalDisplayed: state.modal.isModalDisplayed,
  };
};

export default connect(mapStateToProps, { toggleModal })(ExperimentEdit);
