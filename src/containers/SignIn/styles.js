import styled from 'styled-components';
import { media } from '../../components/Media';

export const SigninBackground = styled.section`
	position: fixed;
	width: 100%;
	height: 100%;
	margin: 0;
	background: linear-gradient(168.25deg, #1584A4 4.22%, #13137E 79.26%);
`;

export const SignInContainer = styled.div`
	margin: 0 auto;
	display: flex;
	align-items: center;
	width: 350px;
	height: 100%;

	${media.tablet`
		width: 800px;
	`}
`;

export const SignupWrap = styled.div`
	display: block;
	width: 350px;
	height: 100px;
	background: #fff;
	border-radius: 50px;
	position: absolute;
	bottom: 20px;

	${media.tablet`
		display: block;
		width: 650px;
		height: 480px;
		margin: auto 0;
		border-radius: 400px;
		z-index: 1;
		top: 50%;
		transform: translate(0, -50%);
		bottom: unset;
	`}
`;

export const SignUpContentWrap = styled.div`
	${media.tablet`
		width: 250px;
		margin: 70px 150px;	
	`}
`;

export const SignUpContent = styled.div`
	display: none;

	${media.tablet`
		display: block;
		line-height: 30px;
		font-size: 18px;
		font-weight: 700;
		opacity: 0.8;
		margin: 25px 0;
	`}
`;

export const SigninWrap = styled.div`
	width: 350px;
	height: 350px;
	border-radius: 50px;
	background: #fff;
	z-index: 2;
	margin: 0 auto;
	transorm: translate(50%, 50%);
	position: absolute;
	box-shadow: 0px 7px 28px rgba(95, 86, 204, 0.5);

	${media.tablet`
		top: 50%;
		margin: unset;
		transform: translate(128%, -50%);
	`}
`;

export const UserIcon = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 100%;
	margin: 30px auto 0;
	background: #0a749f;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	svg {
		padding: 11px 13px;
	}
`;

export const InputBox = styled.input`
	width: 300px;
	height: 40px;
	display: block;
	padding: 0 10px;
	margin: 20px auto;
	border: unset;
	background: unset;
	border-bottom: 2px solid #C9BEBE;
	outline: none;
	font-size: 16px;
`;

export const SignupInput = styled(InputBox)`
	width: 90%;
`;

export const SigninButton = styled.div`
	width: 100px;
	height: 40px;
	margin: 30px auto;
	background: #0a749f;
	color: #fff;
	text-align: center;
	font-size: 18px;
	font-weight: 700;
	text-transform: uppercase;
	line-height: 40px;
	letter-spacing: 2px;
	border-radius: 10px;
	cursor: pointer;
`;

export const SignupButton = styled(SigninButton)`
	${media.tablet`
		margin: unset;
	`}
`;

export const ForgetPassword = styled.div`
	text-decoration: underline;
	color: #30B7CF;
	font-size: 14px;
	margin: 0px 20px;
	font-weight: 700;
`;

export const ButtonWrap = styled.div`
	margin-top: 70px;
`;

export const MessageArea = styled.textarea`
	width: 90%;
	height: 40px;
	font-family: 'Red Hat Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
	display: block;
	padding: 0 10px;
	margin: 20px auto;
	border: unset;
	background: unset;
	border-bottom: 2px solid #C9BEBE;
	outline: none;
	font-size: 16px;
	height: 150px;
	resize: none;

	&::placeholder {
		vertical-align: center;
	}
`;