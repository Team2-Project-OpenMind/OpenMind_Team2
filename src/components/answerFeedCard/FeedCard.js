import { useState } from 'react';
import { createAnswer, getQuestions } from '../../api/api.questions';
import { updateAnswersPartial } from '../../api/api.answers';
import { timeForToday } from '../../date';

import * as S from './FeedCardStyled';

import down from '../../assets/images/down.svg';
import up from '../../assets/images/thumbs-up.svg';
import editor from '../../assets/images/Edit.svg';
import clickedUp from '../../assets/images/clicked_up.svg';
import clickedDown from '../../assets/images/clicked_down.svg';
import PopOverMenu from 'components/modal/PopOverMenu';

export default function Feedcard(question) {
  console.log(question);
  const [answer, setAnswer] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmit, setIsSubmited] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [editAnswer, setEditAnswer] = useState(false);
  const [likeCount, setLikeCount] = useState(question.like);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(question.dislike);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleCreateAnswer = async (questionId, answerData) => {
    try {
      const result = await createAnswer(questionId, answerData);
      setAnswer(result.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePatchAnswer = async (answerId, answerData) => {
    try {
      const result = await updateAnswersPartial(answerId, answerData);
      setAnswer(result.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value);
    answer ? setIsCompleted(true) : setIsCompleted(false);
    if (e.target.value === '') return setIsCompleted(false);
  };

  const handleSubmitAnswer = (questionId, text, boolean) => {
    if (text) {
      setIsSubmited(true);
      handleCreateAnswer(questionId, { content: text, isRejected: boolean });
    }
  };
  const handleUpdateAnswer = () => {
    setUpdate(!isUpdate);
    setAnswer(question?.answer?.content);
  };
  const handelUpdateEditAnswer = () => setEditAnswer(false);

  const handleSubmitEditAnswer = async (questionId, text, boolean) => {
    const { answer } = await getQuestions(questionId);
    setEditAnswer(true);
    handlePatchAnswer(answer.id, { content: text, isRejected: boolean });
  };
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

  const handleMenuToggle = () => {
    setMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  return (

    <S.FcContainer>
      {isMenuOpen && <PopOverMenu id={question?.id} answerId={question?.answer?.id} />}

      <S.FcHeader>
        {!question?.answer && !isSubmit ? (
          <S.UnansweredMark>미답변</S.UnansweredMark>
        ) : (
          <S.AnswerMark>답변 완료</S.AnswerMark>
        )}
        <S.KebabButton alt="케밥버튼" onClick={handleMenuToggle} />
      </S.FcHeader>
      <S.FcQuestionWrapper>
        <S.QuestionDate>
          질문
          <S.DisplayTime>{timeForToday(question.createdAt)}</S.DisplayTime>
        </S.QuestionDate>
        <S.QuestionContent>{question.content}</S.QuestionContent>
      </S.FcQuestionWrapper>
      <S.FcAnswerContainer>
        <S.FcProfileWrapper>
          <S.FcProfile $url={question.imageSource} alt="프로필" />
        </S.FcProfileWrapper>
        <S.FcAnswerWrapper>
          <S.FcAnswerer>
            {question?.name}
            {question?.answer ? (
              <S.DisplayTime>{timeForToday(question.answer?.createdAt)}</S.DisplayTime>
            ) : null}
          </S.FcAnswerer>
          <S.FcAnswerContent>
            {!question?.answer && !isSubmit ? (
              <>
                <S.FcAnswerInput
                  name="answer"
                  value={answer}
                  placeholder="답변을 입력해주세요"
                  onChange={(e) => handleChangeAnswer(e)}
                ></S.FcAnswerInput>
                <S.FcAnswerButton
                  onClick={() => handleSubmitAnswer(question.id, answer, false)}
                  $isCompleted={isCompleted}
                >
                  답변 완료
                </S.FcAnswerButton>
              </>
            ) : (
              <>
                <S.SubmitedAnswer $isUpdate={isUpdate}>
                  {question?.answer?.content || answer}
                </S.SubmitedAnswer>
                <S.EditorButton
                  onClick={() => handleUpdateAnswer(question?.answer?.content)}
                  $editAnswer={editAnswer}
                  $isUpdate={isUpdate}
                >
                  <img src={editor} alt="수정하기" />
                  수정하기
                </S.EditorButton>
              </>
            )}
            {isUpdate ? (
              <>
                <S.FcAnswerInput
                  name="answer"
                  value={answer}
                  onChange={(e) => handleChangeAnswer(e)}
                  placeholder="답변을 입력해주세요"
                  $isCompleted={isCompleted}
                  $editAnswer={editAnswer}
                ></S.FcAnswerInput>
                <S.FcAnswerButton
                  onClick={() => handleSubmitEditAnswer(question.id, answer, false)}
                  $isCompleted={isCompleted}
                  $editAnswer={editAnswer}
                >
                  수정 완료
                </S.FcAnswerButton>
              </>
            ) : null}

            {editAnswer ? (
              <>
                <S.SubmitedAnswer>{answer}</S.SubmitedAnswer>
                <S.EditorButton
                  onClick={handelUpdateEditAnswer}
                  $editAnswer={editAnswer}
                  $isUpdate={isUpdate}
                >
                  <img src={editor} alt="수정하기" />
                  수정하기
                </S.EditorButton>
              </>
            ) : null}
          </S.FcAnswerContent>
        </S.FcAnswerWrapper>
      </S.FcAnswerContainer>
      <S.FcFooter>
        <S.FcFooterLine />
        <S.FcReactionMarkWrapper>
          <S.Reaction onClick={handletoggleLike} $liked={liked}>
            {liked ? <img src={clickedUp} alt="활성화 된 좋아요" /> : <img src={up} alt="좋아요" />}
            <span>좋아요 {likeCount}</span>
          </S.Reaction>

          <S.Reaction onClick={handletoggleDislike} $disliked={disliked}>
            {disliked ? (
              <img src={clickedDown} alt="활성화 된 싫어요" />
            ) : (
              <img src={down} alt="싫어요" />
            )}
            <span>싫어요 {dislikeCount} </span>
          </S.Reaction>
        </S.FcReactionMarkWrapper>
      </S.FcFooter>
    </S.FcContainer>
  );
}
