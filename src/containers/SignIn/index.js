import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ReactSVG } from 'react-svg';
import User from '../../assets/images/user.svg';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import {
	SigninBackground,
	SignupButton,
	SignInContainer,
	SignupWrap,
	SignUpContentWrap,
	SignUpContent,
	SigninWrap,
	UserIcon,
	InputBox,
	SigninButton,
	ForgetPassword,
} from './styles';
import { openModal } from '../../components/Modals/AllModals/actions';
import {
	signIn,
} from './actions';


const key = 'signin';

function SignIn ({
	openSignupModal,
	signIn,
}) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const changeEmail = ((event) => {setEmail(event.target.value)});
	const changePassword = ((event) => {setPassword(event.target.value)});
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });
	const signInUser = () => {
		signIn(email, password);
	}
	return (
		<SigninBackground>
			<SignInContainer>
				<SignupWrap>
					<SignUpContentWrap>
						<SignUpContent>
							Make your work Agile Effective! Manage your Task effectively to acheive your vision
						</SignUpContent>
						<SignUpContent>
							Colloborating with your Colleagues made easy now
						</SignUpContent>
						<SignUpContent>
							Make your Team with us Now
						</SignUpContent>
						<SignupButton onClick={openSignupModal}>SignUp</SignupButton>
					</SignUpContentWrap>
				</SignupWrap>
				<SigninWrap>
					<UserIcon>
						<ReactSVG src={User} />
					</UserIcon>
					<InputBox type='email' onChange={changeEmail} value={email} placeholder='E-mail'/>
					<InputBox type='password' onChange={changePassword} value={password} type='password' placeholder='Password'/>
					<ForgetPassword>Forget Password</ForgetPassword>
					<SigninButton onClick={signInUser}>SignIn</SigninButton>
				</SigninWrap>
			</SignInContainer>
		</SigninBackground>
	);
}


SignIn.propTypes = {
  openSignupModal: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    openSignupModal: (modalType, data) => dispatch(openModal('signUp', data)),
    signIn: (email, password) => dispatch(signIn(email, password)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
withConnect,
memo,
)(SignIn);