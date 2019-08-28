import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin = (stream) => {
        const currentUserId = this.props.currentUserId;

        if (stream.userId === currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            )
        }
    };
    
    renderList = () => {
        const streams = this.props.streams;

        return streams.map(stream => {
            return (
              <div className="item" key={stream.id}>
                {this.renderAdmin(stream)}
                <i className="large middle aligned icon camera" />
                <div className="content">
                  <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
                  <div className="description">{stream.description}</div>
                </div>
              </div>
            );
        })
    };

    renderCreate = () => {
        const signedInUser = this.props.isSignedIn;

        if (signedInUser) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link 
                        to="/streams/new" 
                        className="ui button primary"
                        >Create Stream
                    </Link>
                </div>
            )
        }
    };

    render() {
        return (
          <div>
            <h2>Streams</h2>
            <div className="ui celled list">
                {this.renderList()}
            </div>
            {this.renderCreate()}
          </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    }
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);


