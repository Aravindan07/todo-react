import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { media } from '../../components/Media';

export const AppWrapper = styled.div`
	width: 100%;

	.appElem {
		font-size: 36px;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-top: 80px;
	}
`;

export const FixedBackground = styled.section`
	background: ${getBackground};
	position: fixed;
	width: 100%;
	height: 100%;
`;

function getBackground() {
	let location = useLocation();
	if(location.pathname.indexOf('/analytics') >= 0) {
		return 'linear-gradient(116.42deg, #CC2B5E 13.85%, #753A88 34.64%)';
	} else {
		return 'linear-gradient(126.64deg, #13137E 1.3%, #1584A4 36.83%)';
	}
}

export const MainWrap = styled.section`
	width: calc(100% - 100px);
	left: 100px;
	position: absolute;
	z-index: 0;
`;

export const ContentBackground = styled.section`
	background: #fff;
	width: calc(100% - 100px);
	left: 100px;
	height: calc(100% - 40px);
	top: 40px;
	position: fixed;

	${media.tablet`
		border-radius: 75px 0 0 75px;
	`}
`;

export const ContentWrapper = styled.article`
	margin: 60px auto;
	height: auto;
	position: absolute;
	display: flex;
	flex-direction: column;
	width: 100%;

	${media.tablet`
		left: 75px;
		width: calc(100% - 150px);
	`}
`;