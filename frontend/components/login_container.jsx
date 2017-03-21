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
      this.props.receiveErrors({wowowowowowowowow: "Your re-entered password must match"});
    } else {
      this.props.signUp(this.state.signUp).then(() => this.props.router.push('/'));
    }
  }

  handleSignin(e) {
    e.preventDefault();
    this.props.signIn(this.state.signIn).then(() => this.props.router.push('/'));
  }

  render() {
    return(
      <div>
        <div className='topbar'>
          <img src='#'/>
          <div className='signin-wrapper'>
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
              <input
                type="submit"
                value="Sign In" />
            </form>
          </div>
        </div>

        <div className='signup-wrapper'>
          <form id='signUp' onSubmit={this.handleSignup}>
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
            <input
              type="submit"
              value="Sign Up" />
          </form>
        </div>
        <p>{this.props.errors.session}</p>

      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
