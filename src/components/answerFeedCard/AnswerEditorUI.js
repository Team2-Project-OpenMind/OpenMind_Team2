import { useState } from 'react';
import { EditInput, EditButton } from './FeedCardStyled';

export default function AnswerEditorUI({ onPatch, question, onClose }) {
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
      setIsCompletedEdited(false);
    }
  };
  return (
    <>
      <EditInput
        name="answer"
        value={editedReply}
        onChange={(e) => handleChangeEditReply(e)}
        placeholder="답변을 입력해주세요"
        $isCompletedEdited={isCompletedEdited}
      >
        {editedReply}
      </EditInput>
      <EditButton
        $isCompletedEdited={isCompletedEdited}
        onClick={() =>
          handleSubmitEditedReply(question?.answer?.id, { content: editedReply, isRejected: false })
        }
      >
        수정 완료
      </EditButton>
    </>
  );
}
