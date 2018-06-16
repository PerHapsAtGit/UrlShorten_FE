import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SERVICE_URL } from '../../constants';
import * as actions from '../../actions';

import './style.scss';

export class App extends React.Component {
  constructor(props) {
    super(props);
        
    this.blockName = 'main-app';
    this.inputRef = React.createRef();
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    this.props.actions.shortenUrl(this.inputRef.current.value);
  }

  renderServiceResponse() {
    const hasError = !!this.props.serviceErrorMsg;
    const hasResult = !!this.props.hash;
    const shortUrl = SERVICE_URL.concat(`/${this.props.hash}`);

    return (hasError || hasResult) &&(
      <div className={`${this.blockName}__service-response`}>
        {this.props.serviceErrorMsg}
        {!hasError && shortUrl}
      </div>
    );
  }

  render() {
    const blockName = this.blockName;

    return (
      <React.Fragment>
        {/* Form for submitting the URL */}
        <form
          className={blockName}
          onSubmit={this.submitForm}
        >
          <h2>URL Shorten</h2>
          <input
            className={`${blockName}__url-input`}
            ref={this.inputRef}
          />
          <button
            className={`${blockName}__button`}
            onClick={this.submitForm}
            disabled={this.props.serviceInUse}
          >
            SHORTEN
          </button>
        </form>
        
        {/* Response Section for displaying server result */}
        {this.renderServiceResponse()}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  serviceInUse: PropTypes.bool.isRequired,
  hash: PropTypes.string,
  serviceErrorMsg: PropTypes.string,
  actions: PropTypes.shape({
    shortenUrl: PropTypes.func.isRequired,
  }).isRequired,
};

App.defaultProps = {
  hash: null,
  serviceErrorMsg: null,
};

function mapStateToProps(state) {
  return {
    ...state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);