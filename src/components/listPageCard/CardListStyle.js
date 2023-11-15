import styled from 'styled-components';
import { breakPoints } from 'components/common/Media';

export const ListCards = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(186px, 220px));
  gap: 2rem;
  @media screen and (max-width: 865px) {
    grid-template-columns: repeat(3, minmax(186px, 220px));
  }
  @media screen and (${breakPoints.mobile}) {
    grid-template-columns: repeat(2, minmax(155px, 220px));
    gap: 1.6rem;
  }
`;
