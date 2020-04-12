import styled from 'styled-components';

export const Close = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  opacity: 0.3;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export const ModalTheme = styled.div`
	width: 100%;
	height: 100%;
	padding: 30px 50px;
	background: linear-gradient(to right bottom,#fff 50%, rgba(192,219, 246,0.7) 50%);
`;
