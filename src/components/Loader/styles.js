import styled from 'styled-components';

export const Loader = styled.div`
  position: relative;
  margin: 0 auto;
  width: ${(props) => props.small ? '25px' : '55px'};
  min-height: ${(props) => props.small ? '40px' : '300px'};
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  .loading-spinner__circle-svg {
    animation: loading-spinner-rotate 1.28973s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .loading-spinner__circle-stroke {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: loading-spinner-dash 2s ease-in-out infinite, loading-spinner-color 8s ease-in-out infinite;
    stroke-linecap: round;
    stroke-width: 4px;
  }
  @keyframes loading-spinner-rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes loading-spinner-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }
  @keyframes loading-spinner-color {
    100%,
    0% {
      stroke: #13137E;
    }
    40% {
      stroke: #753A88;
    }
    66% {
      stroke: #1584A4;
    }
    80%,
    90% {
      stroke: #CC2B5E;
    }
  }
`;
