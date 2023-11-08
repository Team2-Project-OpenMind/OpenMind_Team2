import styled from 'styled-components';

import { deleteAnswers } from 'api/api.answers';
import { updateAnswers } from 'api/api.answers';
import { deleteQuestion } from 'api/api.questions';
import { createAnswer } from 'api/api.questions';

export default function PopOverMenu({ id }) {
  // console.log(id);
  const handleDeleteAnswer = async () => {
    try {
      const result = await deleteAnswers(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      await deleteQuestion(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectAnswer = async () => {
    const POST_DATA = {
      content: '답변을 거절하겠습니다~~',
      isRejected: 'true',
    };
    try {
      const answer = await createAnswer(id, POST_DATA);
      console.log(answer);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <MenuItem onClick={handleDeleteAnswer}>답변 삭제</MenuItem>
      <MenuItem onClick={handleDeleteQuestion}>질문 삭제</MenuItem>
      <MenuItem onClick={handleRejectAnswer}>답변 거절</MenuItem>
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
