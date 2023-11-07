import styled from 'styled-components';
import arrowUp from '../../assets/images/arrow-up.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import { breakPoints } from '../../components/common/media';

export const ListContainerBox = styled.div`
  background: var(--gray20);
  width: 100%;
  height: 100vh;
`;

export const ListWrap = styled.div`
  width: 100%;
  max-width: 1004px;
  margin: 0 auto;
  padding: 137px 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (${breakPoints.mobile}) {
    max-width: 500px;
    padding: 137px 24px 0;
  }
`;

export const ListUpper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (${breakPoints.mobile}) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 18px;
  }
`;
export const ListTitle = styled.h2`
  color: var(--gray60);
  text-align: center;
  font-size: 40px;
  margin-bottom: 12px;
  @media screen and (${breakPoints.mobile}) {
    font-size: 24px;
    margin-bottom: 0px;
  }
`;

export const ListSelect = styled.select`
  color: var(--gray40);
  border: 1px solid var(--gray40);
  outline: 0;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 30px;
  width: 79px;
  appearance: none;
  background: url(${arrowDown}) no-repeat right 8px center;
  @media screen and (${breakPoints.mobile}) {
    margin-bottom: 0px;
  }
`;

export const ListOption = styled.option`
  color: var(--gray50);
  font-size: 14px;
  font-weight: 500;
  padding: 6px 16px;
`;

export const ListPagination = styled.ul`
  margin-top: 40px;
  display: flex;
`;

export const ListPaginationNumber = styled.li`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
