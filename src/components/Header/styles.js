import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

export const HeaderWrapper = styled.header`
	height: 40px;
	position: fixed;
	z-index: 1;
	width: calc(100% - 100px);
	align-items: center;
	display: flex;
	background: ${getBackground};
`;

function getBackground() {
	if(location.pathname.indexOf('/analytics') >= 0) {
		return 'linear-gradient(116.42deg, #CC2B5E 13.85%, #753A88 34.64%)';
	} else {
		return 'linear-gradient(114.64deg, #13137E 12.3%, #1584A4 36.83%)';
	}
}

export const ElementWrapper = styled.div`
	margin: 0 auto;
	min-width: 150px;
	height: 100%;
	display: flex;
	position: relative;
	text-align: center;
	color: #fff;
	font-weight: 700;
	font-size: 18px;
	z-index: 1;
`;

export const HeaderElement = styled.div`
	margin: 0 20px;
	height: 25px;
	margin-top: 10px;
	
	.SwitchHeaderContent {
	  color: #fff;
	  cursor: pointer;
	  line-height: 30px;
	  padding: 0 10px;
	  text-decoration: none;
	}

	.SwitchHeaderContent:hover {
	  font-weight: 600;
	}

	.activeHeader {
	  border-bottom: 5px solid #fff;
	  font-weight: 900;
	  text-transform: uppercase;
  	}
`;