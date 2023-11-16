import styled from 'styled-components';

export const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.8rem;
  width: 100px;
  height: 35px;
  border-radius: 200px;
  background: var(--brown40);
  box-shadow: var(--shadow2pt);
  color: var(--gray10);
  font-family: Actor;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  cursor: pointer;
  margin-left: auto;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 71.6rem;
  flex-direction: space-between;
`;

export const PreviousButton = styled(DeleteButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 208px;
  height: 54px;
  padding: 12px 24px;
  border: none;
  border-radius: 200px;
  background: var(--brown40);
  box-shadow: var(--shadow2pt);
  color: var(--gray10);
  font-family: Actor;
  font-size: 2rem;
  font-weight: 400;
  line-height: 25px;
  cursor: pointer;
  z-index: 50;
`;

export const EmptyWindow = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
`;
