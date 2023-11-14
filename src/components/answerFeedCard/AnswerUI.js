import { AnswerInput, AnswerButton } from './FeedCardStyled';

import { useState } from 'react';

export default function AnswerUI({ onCreate, question }) {
  const [reply, setReply] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmitReply = (questionId, answerData) => {
    onCreate(questionId, answerData);
  };

  const handleChangeAnswer = (e) => {
    setReply(e.target.value);
    reply ? setIsCompleted(true) : setIsCompleted(false);
    if (e.target.value === '') {
      setIsCompleted(false);
    }
  };
  return (
    <>
      <AnswerInput
        name="answer"
        value={reply}
        placeholder="답변을 입력해주세요"
        onChange={(e) => handleChangeAnswer(e)}
        $isCompleted={isCompleted}
      >
        {reply}
      </AnswerInput>
      <AnswerButton
        onClick={() => handleSubmitReply(question.id, { content: reply, isRejected: false })}
        $isCompleted={isCompleted}
      >
        답변 완료
      </AnswerButton>
    </>
  );
}
