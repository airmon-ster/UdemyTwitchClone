import React from 'react'
import Modal from '../Modal'
import history from '../../history'
import { connect } from 'react-redux'
import { fetchStream, deleteStream } from '../../actions'
import { Link } from 'react-router-dom'

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.stream_id)
    }

    renderActions() {
        const { stream_id } = this.props.match.params
        return (
            <React.Fragment>
                <button onClick={() => { this.props.deleteStream(stream_id)}} className="ui button negative">Delete</button>
                <Link to='/' className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure that you want to delete this stream?'
        }
        return `Are you sure you want to delete: ${this.props.stream.title}`
    }

    render() {
        return (
            <Modal 
                onDismiss={() => history.push('/')}
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.stream_id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)