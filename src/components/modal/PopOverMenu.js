import styled from 'styled-components';

import { deleteAnswers } from 'api/api.answers';

export default function PopOverMenu() {
  return (
    <Container>
      <MenuItem>답변 삭제</MenuItem>
      <MenuItem>질문 삭제</MenuItem>
      <MenuItem>답변 거절</MenuItem>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 32px;
  top: 60px;
  width: 103px;
  padding: 4px 0;
  border-radius: 8px;
  border: 1px solid var(--gray30);
  background: var(--gray10);
  box-shadow: var(--shadow1pt);
`;

const MenuItem = styled.button`
  display: flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: none;
  background-color: var(--gray10);
  color: var(--gray50);
  font-family: Pretendard;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.8rem;
  align-self: stretch;
  cursor: pointer;

  &:hover {
    background: var(--gray20);
    color: var(--blue50);
  }
`;
