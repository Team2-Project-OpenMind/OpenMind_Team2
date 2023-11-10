import { breakPoints } from 'components/common/Media';
import styled from 'styled-components';

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

export const ListPaginationHellip = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: var(--gray40);
  font-size: 2rem;
  font-family: Actor;
  font-weight: 400;
`;
