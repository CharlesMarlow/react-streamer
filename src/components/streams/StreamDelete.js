import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from "../../history";
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends Component {  

  componentDidMount() {
    const streamId = this.props.match.params.id;
    this.props.fetchStream(streamId);
  }
  

  renderActions = () => {
    const streamId = this.props.match.params.id;
    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteStream(streamId)}
        >
          Delete
        </button>
        <Link className="ui button" to="/">
          Cancel
        </Link>
      </React.Fragment>
    );
  } 

  renderContent = () => {
    const stream = this.props.stream;
    if (!stream) {
      return 'Are you sure you want to delete this stream?'
    }

    return `Are you sure you want to delete the stream with title: ${stream.title}`
  };

  render() {
    return (
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
    const streamId = ownProps.match.params.id;
    return {
      stream: state.streams[streamId],
    }
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);


