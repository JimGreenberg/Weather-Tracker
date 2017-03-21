import React from 'react';
import {connect} from 'react-redux';
import LoginContainer from './login_container';
import MainViewContainer from './mainview_container';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({

});

class EntryContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  isSignedIn() {
    return !!this.props.currentUser;
  }

  render() {
    return this.isSignedIn() ? <MainViewContainer /> : <LoginContainer />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryContainer);
