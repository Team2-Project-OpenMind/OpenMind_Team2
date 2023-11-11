import styled from 'styled-components';

export const ListCard = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 187px;
  padding: 20px;
  border: 1px solid var(--gray40);
  border-radius: 16px;
  background-color: ${(props) => props.theme.elemBackgroundColor};
`;

export const ProfileCard = styled.div``;

export const ProfileCardImg = styled.img`
  width: 60px;
  margin-bottom: 1.2rem;
  border-radius: 50%;
`;

export const ProfileCardName = styled.h4`
  color: #000;
  font-family: Actor;
  font-size: 2rem;
  font-weight: 400;
  line-height: 25px;
`;

export const CardText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--gray40);
  font-family: Pretendard;
  font-size: 1.6rem;
  font-weight: 400;
`;

export const CardMessageWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const CardMessageIcon = styled.img`
  width: 18px;
  margin-right: 4px;
`;
