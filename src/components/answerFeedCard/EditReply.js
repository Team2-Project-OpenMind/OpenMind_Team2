import { useState } from 'react';
import { FcAnswerInput, FcAnswerButton } from './FeedCardStyled';

export default function EditReply({ onPatch, question, onClose }) {
  const [editedReply, setEditedReply] = useState(question?.answer?.content);
  const [isCompletedEdited, setIsCompletedEdited] = useState(false);
  const handleSubmitEditedReply = (answerId, answerData) => {
    onPatch(answerId, answerData);
    onClose();
  };

  const handleChangeEditReply = (e) => {
    setEditedReply(e.target.value);

    editedReply ? setIsCompletedEdited(true) : setIsCompletedEdited(false);
    if (e.target.value === '') {
      isCompletedEdited = false;
    }
  };
  return (
    <>
      <FcAnswerInput
        name="answer"
        value={editedReply}
        onChange={(e) => handleChangeEditReply(e)}
        placeholder="답변을 입력해주세요"
        $isCompletedEdited={isCompletedEdited}
      >
        {editedReply}
      </FcAnswerInput>
      <FcAnswerButton
        $isCompletedEdited={isCompletedEdited}
        onClick={() =>
          handleSubmitEditedReply(question?.answer?.id, { content: editedReply, isRejected: false })
        }
      >
        수정 완료
      </FcAnswerButton>
    </>
  );
}
