import { useState } from 'react';
import { FcEditInput, FcEditButton } from './FeedCardStyled';

export default function ReplyEditor({ onPatch, question, onClose }) {
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
      <FcEditInput
        name="answer"
        value={editedReply}
        onChange={(e) => handleChangeEditReply(e)}
        placeholder="답변을 입력해주세요"
        $isCompletedEdited={isCompletedEdited}
      >
        {editedReply}
      </FcEditInput>
      <FcEditButton
        $isCompletedEdited={isCompletedEdited}
        onClick={() =>
          handleSubmitEditedReply(question?.answer?.id, { content: editedReply, isRejected: false })
        }
      >
        수정 완료
      </FcEditButton>
    </>
  );
}
