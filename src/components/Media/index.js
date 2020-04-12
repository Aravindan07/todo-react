import { css } from 'styled-components';

const sizes = {
  giant: 1199,
  desktop: 991,
  tablet: 818,
  phone: 575
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return accumulator;
}, {});
