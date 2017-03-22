import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {signOut} from '../actions/session_actions';

  const mapStateToProps = state => ({
    currentUser: state.session.currentUser
  });

  const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut())
  });

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.props.signOut.bind(this);
  }

  render() {
    return (
      <div className='navbar'>
        <p>Welcome {this.props.currentUser.username}</p>
        <button onClick={this.signOut}>Log Out</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
