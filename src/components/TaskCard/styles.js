import styled from 'styled-components';
import { media } from '../Media';

export const TaskCardsContainer = styled.div`
	margin: -10px auto 10px;
	width: 100%;
	min-height: 330px;
	display: flex;
	flex-flow: wrap;
`;

export const TitleWrap = styled.div`
	display: flex;
`;

export const TaskTitle = styled.h2`
	color: linear-gradient(114.64deg, #13137E 12.3%, #1584A4 36.83%);
	text-transform: uppercase;
	margin-left: 35px;
	background: -webkit-linear-gradient(76deg, #13137E, #1584A4);
  	-webkit-background-clip: text;
  	-webkit-text-fill-color: transparent;
	margin-top: 40px;
	margin-bottom: unset;
	font-size: 28px;
	height: 60px;
	display: inline-block;

	${media.tablet`
		font-size: 32px;
	`}
`;

export const CreateTask = styled.div`
	font-size: 0;
	position: fixed;
	bottom: 30px;
	right: 20px;
	svg {
		color: #1584A4;
		width: 45px;
		height: 45px;
		margin: 0 5px 0 0;
		border: 2px solid #1584A4;
		border-radius: 100%;
		background: #1584A4;
		padding: 5px;

		path {
			color: #fff;
		}
	}

	${media.phone`
		position: absolute;
		color: #fff;
		background: #1584A4;
		right: 0px;
		bottom: unset;
		margin-right: 35px;
		margin-top: 33px;
		border-radius: 10px;
		height: 50px;
		display: flex;
		align-items: center;
		font-size: 16px; 
		font-weight: 700;
		padding: 0 20px;
		text-align: center;
		box-shadow: 0px 3px 7px rgba(0,0,0,0.1);
		cursor: pointer;

		svg {
			color: #fff;
			width: 25px;
			height: 25px;
			margin: 0 5px 0 0;
			border: 2px solid #fff;
			border-radius: 100%;
			background: unset;
			padding: 3px;
		}
	`}
`;

export const TaskCrd = styled.div`
	width: 253px;
	height: 220px;
	border-radius: 0 0 20px 20px;
	border-top: ${(props) => getBorder(props.type, props.expired)};
	margin: 20px;
	box-shadow: 0px 3px 7px rgba(0,0,0,0.2);
	color: #484b4e;
	padding: 10px 20px;
	cursor: pointer;
	background: ${(props) => getBackground(props.expired)};
`;

function getBorder(type, expired) {
	if(type === 'not_initiated' && expired === false) {
      return '4px solid #f4272e';
  	} else if (type === 'in_progress' && expired === false) {
    	return '4px solid #1584A4';
	} else if(type === 'completed' && expired === false) {
      	return '4px solid #44ad15';
	} else if(expired === true){
		return '4px solid #484b4e';
	}
}

function getBackground(expired) {
	if(expired === true) {
		return '#f0f0f5';
	} else {
		return '#fff';
	}
}

export const TaskName = styled.div`
	font-size: 24px;
	font-weight: 800;
	margin: 10px 0;
	color: #1584A4;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

export const TaskDesc = styled.div`
	font-size: 16px;
	font-weight: 700;
	opacity: 0.8;
	margin: 20px 0;
	line-height: 26px;
	height: 78px;
	overflow: hidden;
`;

export const StatusTag = styled.div`
	font-size: 12px;
	margin: 10px 0;
	opacity: 0.7;
	font-weight: 600;
	text-transform: capitalize;
`;

export const ExpiryTag = styled.div`
	font-size: 14px;
	margin-top: 40px;
`;

export const ActionWrapper = styled.div`
	right: 0px;
	margin-top: 12px;
	width: 50px;
	height: 30px;
	display: flex;
	float: right;
	right: 10px;

	svg {
		width:25px;
		height: 25px;
		color: #1584A4;
		margin: 0 2px;
		cursor: pointer;
	}
`;

