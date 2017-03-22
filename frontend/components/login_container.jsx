import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {signIn, signUp, receiveErrors} from '../actions/session_actions';
import merge from 'lodash/merge';


const mapStateToProps = state => ({
  errors: state.session.errors
});

const mapDispatchToProps = dispatch => ({
  signIn: user => dispatch(signIn(user)),
  signUp: user => dispatch(signUp(user)),
  receiveErrors: errors => dispatch(receiveErrors(errors))
});

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.state = {
      signUp: {
        username: "",
        password: ""
      },
      signIn: {
        username: "",
        password: ""
      }
    };
  }

  update(field) {
    return e => {
      const target = e.target.form.id === 'signIn' ? this.state.signIn : this.state.signUp;
      const newState = merge({}, target);
      newState.username = e.target.form[0].value;
      newState.password = e.target.form[1].value;
      this.setState({
        [`${e.target.form.id}`]: newState
      });
    };
  }

  handleSignup(e) {
    e.preventDefault();
    if (this.state.signUp.password !== document.getElementById('confirm').value) {
      this.props.receiveErrors({errors: "Your re-entered password must match"});
    } else {
      this.props.signUp(this.state.signUp)
      .then(() => this.props.router.push('/'));
    }
  }

  handleSignin(e) {
    e.preventDefault();
    this.props.signIn(this.state.signIn)
    .then(() => this.props.router.push('/'));
  }

  handleGuest(e) {
    e.preventDefault();
    this.props.signIn({username: 'john_doe', password: 'asdfasdf'})
    .then(() => this.props.router.push('/'));
  }

  render() {
    return(
      <div className='mainview-wrapper'>
        <div className='navbar'>
          <h1>Welcome to the Weather Tracker</h1>

          <form id='signIn' onSubmit={this.handleSignin}>
            <input
              type="username"
              value={this.state.signIn.username}
              placeholder='Username'
              onChange={this.update("username")} />
            <input
              type="password"
              value={this.state.signIn.password}
              placeholder='Password'
              onChange={this.update("password")} />
            <button type="submit" form="signIn">Sign In</button>
            <button type="submit" form="signIn">Sign In</button>
          </form>
        </div>

        <div className='content-wrapper'>
          <form id='signUp' onSubmit={this.handleSignup}>
            <h1>Sign up for the Weather Tracker - it's free!</h1>
            <input
              type="username"
              value={this.state.signUp.username}
              placeholder='Username'
              onChange={this.update("username")} />
            <input
              type="password"
              value={this.state.signUp.password}
              placeholder='Password'
              onChange={this.update("password")} />
            <input
              type="password"
              id='confirm'
              placeholder='Confirm Password'/>
            <button type="submit" form="signUp">Sign Up</button>
          </form>
        </div>
        <p>{this.props.errors.session}</p>

      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
