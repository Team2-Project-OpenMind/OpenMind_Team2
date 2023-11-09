import styled from 'styled-components';

import { deleteAnswers } from 'api/api.answers';
import { updateAnswersPartial } from 'api/api.answers';
import { deleteQuestion } from 'api/api.questions';
import { createAnswer } from 'api/api.questions';

export default function PopOverMenu({ id, answerId }) {
  // console.log(id);
  console.log(answerId);
  const handleDeleteAnswer = async () => {
    console.log(answerId);
    try {
      const result = await deleteAnswers(answerId);
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
    if (answerId) {
      const DATA = {
        isRejected: 'true',
      };
      try {
        const res = await updateAnswersPartial(answerId, DATA);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      return;
    }

    const content = prompt('거절사유입력');
    const POST_DATA = {
      content,
      isRejected: 'true',
    };
    console.log(content);
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
