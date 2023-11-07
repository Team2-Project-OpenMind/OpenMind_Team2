import styled from 'styled-components';

export const ListCard = styled.li`
  height: 187px;
  padding: 20px;
  border: 1px solid var(--gray40);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProfileCard = styled.div``;

export const ProfileCardImg = styled.img`
  width: 60px;
  margin-bottom: 12px;
`;

export const ProfileCardName = styled.h4`
  color: #000;
  font-family: Actor;
  font-size: 20px;
  font-weight: 400;
`;

export const CardText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--gray40);
  font-family: Pretendard;
  font-size: 16px;
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
