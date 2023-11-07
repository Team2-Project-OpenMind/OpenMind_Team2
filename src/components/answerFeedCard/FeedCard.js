import { useState } from 'react';
import { createAnswer } from '../../api/api.questions';
import { updateAnswersPartial } from '../../api/api.answers';
import * as S from './FeedCardStyled';
import kebab from '../../assets/images/More.svg';
import profile from '../../assets/images/Ellipse 1.svg';
import down from '../../assets/images/down.svg';
import up from '../../assets/images/thumbs-up.svg';
import editor from '../../assets/images/Edit.svg';
import clickedUp from '../../assets/images/clicked_up.svg';
import clickedDown from '../../assets/images/clicked_down.svg';

export default function Feedcard(question) {
  const [answer, setAnswer] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmit, setIsSubmited] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [editAnswer, setEditAnswer] = useState(false);
  const [likeCount, setLikeCount] = useState(question.like);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(question.dislike);
  const [qAndAId, setQAndAId] = useState({});

  const handleCreateAnswer = async (questionId, answerData) => {
    try {
      const result = await createAnswer(questionId, answerData);
      setAnswer(result.content);
      setQAndAId({ ...qAndAId, [questionId]: result.id });
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
    answer.length >= 8 ? setIsCompleted(true) : setIsCompleted(false);
    if (e.target.value === '') return setIsCompleted(false);
  };

  const handleSubmitAnswer = (questionId, text, boolean) => {
    if (text) {
      setIsSubmited(true);
      handleCreateAnswer(questionId, { content: text, isRejected: boolean });
    }
  };
  const handleUpdateAnswer = () => setUpdate(!isUpdate);

  const handelUpdateEditAnswer = () => setEditAnswer(false);

  const handleSubmitEditAnswer = (answerId, text, boolean) => {
    setEditAnswer(true);
    handlePatchAnswer(answerId, { content: text, isRejected: boolean });
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

  return (
    <S.FcContainer>
      <S.FcHeader>
        {!isSubmit ? (
          <S.UnansweredMark>미답변</S.UnansweredMark>
        ) : (
          <S.AnswerMark>답변 완료</S.AnswerMark>
        )}
        <img src={kebab} alt="케밥버튼" />
      </S.FcHeader>
      <S.FcQuestionWrapper>
        <S.QuestionDate>질문 {question.createdAt}</S.QuestionDate>
        <S.QuestionContent>{question.content}</S.QuestionContent>
      </S.FcQuestionWrapper>
      <S.FcAnswerContainer>
        <S.FcProfile src={profile} alt="프로필" />
        <S.FcAnswerWrapper>
          <S.FcAnswerer></S.FcAnswerer>
          <S.FcAnswerContent>
            {!isSubmit ? (
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
                <S.SubmitedAnswer $isUpdate={isUpdate}>{answer}</S.SubmitedAnswer>
                <S.EditorButton
                  onClick={() => handleUpdateAnswer()}
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
                  onClick={() => handleSubmitEditAnswer(qAndAId[question.id], answer, false)}
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
