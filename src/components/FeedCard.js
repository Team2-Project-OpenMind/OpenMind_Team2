import styled from 'styled-components';
import kebab from '../../assets/images/More.svg';
import profile from '../../assets/images/Ellipse 1.svg';
import down from '../../assets/images/down.svg';
import up from '../../assets/images/thumbs-up.svg';
import { useState } from 'react';
import editor from '../../assets/images/Edit.svg';
import clickedUp from '../../assets/images/clicked_up.svg';
import clickedDown from '../../assets/images/clicked_down.svg';

export default function Feedcard() {
  const [answer, setAnswer] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmit, setIsSubmited] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [editAnswer, setEditAnswer] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(0);

  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value);
    answer.length >= 8 ? setIsCompleted(true) : setIsCompleted(false);
  };

  const handleSubmitAnswer = () => setIsSubmited(true);

  const handleUpdateAnswer = () => setUpdate(!isUpdate);

  const handelUpdateEditAnswer = () => setEditAnswer(false);

  const handleSubmitEditAnswer = () => setEditAnswer(true);

  const handletoggleLike = () => {
    if (liked === false) {
      setLiked(!liked);
      setLikeCount((likeCount) => likeCount + 1);
    } else if (liked === true) {
      setLiked(!liked);
      setLikeCount((likeCount) => likeCount - 1);
    }
  };

  const handletoggleDislike = () => {
    if (disliked === false) {
      setDisliked(!disliked);
      setDislikeCount((dislikeCount) => dislikeCount + 1);
    } else if (disliked === true) {
      setDisliked(!disliked);
      setDislikeCount((dislikeCount) => dislikeCount - 1);
    }
  };

  return (
    <FcContainer>
      <FcHeader>
        {!isSubmit ? <UnansweredMark>미답변</UnansweredMark> : <AnswerMark>답변 완료</AnswerMark>}
        <img src={kebab} alt="" />
      </FcHeader>
      <FcQuestionWrapper>
        <QuestionDate>질문 2주전(임시)</QuestionDate>
        <QuestionContent>좋아하는 동물은?(임시)</QuestionContent>
      </FcQuestionWrapper>
      <FcAnswerContainer>
        <FcProfile src={profile} alt="" />
        <FcAnswerWrapper>
          <FcAnswerer>고양이</FcAnswerer>
          <FcAnswerContent>
            {!isSubmit ? (
              <>
                <FcAnswerInput
                  name="answer"
                  value={answer}
                  placeholder="답변을 입력해주세요"
                  onChange={handleChangeAnswer}
                ></FcAnswerInput>
                <FcAnswerButton onClick={handleSubmitAnswer} $isCompleted={isCompleted}>
                  답변 완료
                </FcAnswerButton>
              </>
            ) : (
              <>
                <SubmitedAnswer $isUpdate={isUpdate}>{answer}</SubmitedAnswer>
                <EditorButton
                  onClick={handleUpdateAnswer}
                  $editAnswer={editAnswer}
                  $isUpdate={isUpdate}
                >
                  <img src={editor} />
                  수정하기
                </EditorButton>
              </>
            )}
            {isUpdate ? (
              <>
                <FcAnswerInput
                  name="answer"
                  value={answer}
                  onChange={handleChangeAnswer}
                  placeholder="답변을 입력해주세요"
                  $isCompleted={isCompleted}
                  $editAnswer={editAnswer}
                ></FcAnswerInput>
                <FcAnswerButton
                  onClick={handleSubmitEditAnswer}
                  $isCompleted={isCompleted}
                  $editAnswer={editAnswer}
                >
                  수정 완료
                </FcAnswerButton>
              </>
            ) : null}

            {editAnswer ? (
              <>
                <SubmitedAnswer>{answer}</SubmitedAnswer>
                <EditorButton
                  onClick={handelUpdateEditAnswer}
                  $editAnswer={editAnswer}
                  $isUpdate={isUpdate}
                >
                  <img src={editor} />
                  수정하기
                </EditorButton>
              </>
            ) : null}
          </FcAnswerContent>
        </FcAnswerWrapper>
      </FcAnswerContainer>
      <FcFooter>
        <FcFooterLine />
        <FcReactionMarkWrapper>
          <Reaction onClick={handletoggleLike} $liked={liked}>
            {liked ? <img src={clickedUp} alt="" /> : <img src={up} alt="" />}
            <span>좋아요 {likeCount}</span>
          </Reaction>

          <Reaction onClick={handletoggleDislike} $disliked={disliked}>
            {disliked ? <img src={clickedDown} alt="" /> : <img src={down} alt="" />}
            <span>싫어요 {dislikeCount} </span>
          </Reaction>
        </FcReactionMarkWrapper>
      </FcFooter>
    </FcContainer>
  );
}

const FcContainer = styled.div`
  display: flex;
  position: relative;
  width: 620px;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
  border-radius: 16px;
  background: var(--grayscale-10, #fff);

  box-shadow: 0px 4px 4px 0px rgba(140, 140, 140, 0.25);
`;
const FcHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const AnswerMark = styled.div`
  display: flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid var(--brown-40, #542f1a);
  background: var(--grayscale-10, #fff);
  color: #542f1a;
`;

const UnansweredMark = styled.div`
  display: flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid var(--grayscale-40, #818181);
  background: var(--grayscale-10, #fff);
`;

const FcQuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

const QuestionDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--grayscale-40, #818181);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

const QuestionContent = styled.div`
  color: var(--grayscale-60, #000);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Actor;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  align-self: stretch;
`;

const FcAnswerContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

const FcProfile = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

const FcAnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

const FcAnswerer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FcAnswerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const FcAnswerInput = styled.textarea`
  display: flex;
  height: 186px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--grayscale-20, #f9f9f9);
  color: var(--grayscale-40, #818181);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  border: none;
  &:focus {
    outline: none;
  }
  resize: none;

  border: ${({ $isCompleted }) => (!$isCompleted ? '1px solid var(--brown-40, #542F1A)' : 'none')};

  display: ${({ $editAnswer }) => ($editAnswer ? 'none' : 'flex')};
`;

const FcAnswerButton = styled.button`
  display: flex;
  height: 46px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--brown-30, #c7bbb5);
  color: var(--grayscale-10, #fff);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  border: none;

  background: ${({ $isCompleted }) =>
    $isCompleted ? 'var(--brown-40, #542F1A)' : 'var(--brown-30, #c7bbb5)'};

  display: ${({ $editAnswer }) => ($editAnswer ? 'none' : 'flex')};
`;

const FcFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
`;

const FcFooterLine = styled.div`
  height: 1px;
  align-self: stretch;
  background: var(--grayscale-30, #cfcfcf);
`;

const FcReactionMarkWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
`;

const Reaction = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: ${({ $liked }) => ($liked ? 'var(--blue-50, #1877F2)' : 'var(--grayscale-40, #818181)')};
  color: ${({ $disliked, $liked }) => ($disliked ? 'var(--grayscale-60, #000)' : '')};
`;
const EditorButton = styled.button`
  display: flex;

  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--grayscale-30, #cfcfcf);
  background: var(--grayscale-10, #fff);
  box-shadow: 0px 4px 4px 0px rgba(140, 140, 140, 0.25);
  position: absolute;
  bottom: 28px;
  right: 32px;
  color: var(--grayscale-50, #515151);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  display: ${({ $isUpdate }) => ($isUpdate ? 'none' : 'block')};
  display: ${({ $editAnswer }) => {
    if ($editAnswer === true) {
      return 'block';
    }
  }};
`;
const SubmitedAnswer = styled.div`
  color: var(--grayscale-60, #000);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  display: ${({ $isUpdate }) => ($isUpdate ? 'none' : 'block')};
`;
