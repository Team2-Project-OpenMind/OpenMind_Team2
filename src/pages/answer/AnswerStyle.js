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
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 71.6rem;
  flex-direction: row-reverse;
`;
