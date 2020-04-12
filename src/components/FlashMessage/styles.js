import styled from 'styled-components';

export const OverallWrapper = styled.div`
  position: fixed;
  top: ${(props) => props.messageLength > 0 ? '0px' : '-100px'};
  z-index: 5;
  width: 100%;
  transition: .4s all;
`;

export const Wrapper = styled.div`
  position: relative;
  margin: auto;
  min-height: 40px;
  padding: 20px 50px;
  line-height: 36px;
  font-weight: 500;
  background: ${(props) => colorSelector(props.type)};
  opacity: 0.8;
  color: #fff;
  margin-bottom: 2px;
  font-size: 16px;
  letter-spacing: 1px;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 18px;
  right: 15px;
  cursor: pointer;
  i {
    color: #fff;
  }
  svg {
    width: 18px;
    height: 18px;
  }
  svg path {
    fill: #fff;
  }
`;

function colorSelector(type) {
  let color;
  switch (type) {
    case 'error':
      color = '#f4272e';
      break;
    case 'warning':
      color = '#e2ac09';
      break;
    default:
      color = '#44ad15';
      break;
  }
  return color;
}
