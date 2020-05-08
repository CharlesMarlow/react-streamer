import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchExperiment } from '../../../shared/actions';
import { capitalize } from '../../../utils/commonFunctions';

class ExperiemntDetails extends Component {
  componentDidMount() {
    const experimentId = this.props.match.params.id;
    this.props.fetchExperiment(experimentId);
  }

  render() {
    const { experiment } = this.props;
    if (_.isEmpty(experiment)) {
      return <div>Loading...</div>;
    }

    const { id, name, mode, type, total, status, userId } = experiment;
    return (
      <div className="ui main text container">
        <div className="ui header">
          <div>Experiemnt Name: {name}</div>
          <div>ID: {id}</div>
          <div>Mode: {capitalize(mode)}</div>
          <div>Type: {capitalize(type.toLowerCase())}</div>
          <div>Staus: {capitalize(status.toLowerCase())}</div>
          <div>Total: {total}</div>
          <div>User ID: {userId}</div>
          <div className="ui divider"></div>
          <p>For further info, please contact Arctop LTD.</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    experiment: state.experiments.detailedExperiment,
  };
};

export default connect(mapStateToProps, { fetchExperiment })(ExperiemntDetails);
