import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends Component {

    componentDidMount() {
        const streamId = this.props.match.params.id;
        this.props.fetchStream(streamId);
    }
    
    onSubmit = formValues => {
        const streamId = this.props.match.params.id;
        this.props.editStream(streamId, formValues);
    }
    
    render() {
        const currentStream = this.props.stream;
        if (!currentStream) {
          return <div>Loading...</div>;
        }
        return (
          <div>
            <h3>Edit Stream</h3>
            <StreamForm
              onSubmit={this.onSubmit}
              initialValues={_.pick(currentStream, "title", "description")}
            />
          </div>
        );
    };
};

const mapStateToProps = (state, ownProps) => {
    const streamId = ownProps.match.params.id;
    return {
      stream: state.streams[streamId],
    };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);


