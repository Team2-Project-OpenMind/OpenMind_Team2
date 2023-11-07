import styled from 'styled-components';
import { breakPoints } from 'components/common/media';

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

export const ListPagination = styled.ul`
  display: flex;
  margin-top: 4rem;
  @media screen and (${breakPoints.mobile}) {
    margin-top: 3rem;
  }
`;

export const ListPaginationNumber = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: var(--gray40);
  font-size: 2rem;
  font-family: Actor;
  font-weight: 400;
  cursor: pointer;
`;
