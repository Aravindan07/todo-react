import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ReactSVG } from 'react-svg';
import { useInjectSaga } from '../../../utils/injectSaga';
import User from '../../../assets/images/user.svg';
import {
	SignupInput,
	UserIcon,
	SigninButton,
	ButtonWrap
} from '../../../containers/SignIn/styles';
import {
	signUp,
} from '../../../containers/SignIn/actions';
import saga from '../../../containers/SignIn/saga';

const key = 'signin';

function SignUp({
	signUp,
}) {
	const [ username, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ password, setPassword ] = useState('');
	const changeUsername = ((event) => {setName(event.target.value)});
	const changeEmail = ((event) => {setEmail(event.target.value)});
	const changePhone = ((event) => {setPhone(event.target.value)});
	const changePassword = ((event) => {setPassword(event.target.value)});
	useInjectSaga({ key, saga });	
	const signUpUser = () => {
		signUp(username, email, phone, password);
	}
	return (
		<React.Fragment>
			<UserIcon>
				<ReactSVG src={User} />
			</UserIcon>
			<SignupInput onChange={ changeUsername } value={username} placeholder='Username' />
			<SignupInput onChange={ changeEmail } value={email} placeholder='E-mail' />
			<SignupInput onChange={ changePhone } value={phone} placeholder='Phone' />
			<SignupInput onChange={ changePassword } type='password' value={password} placeholder='Password' />
			<ButtonWrap>
				<SigninButton onClick={signUpUser}>JOIN</SigninButton>
			</ButtonWrap>
		</React.Fragment>
	);
}


SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    signUp: (username, email, phone, password) => dispatch(signUp(username, email, phone, password)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
withConnect,
memo,
)(SignUp);