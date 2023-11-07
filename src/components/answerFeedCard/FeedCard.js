import { useState } from 'react';
import * as S from './FeedCardStyled';

import kebab from '../../assets/images/More.svg';
import profile from '../../assets/images/Ellipse 1.svg';
import down from '../../assets/images/down.svg';
import up from '../../assets/images/thumbs-up.svg';
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
    if (e.target.value === '') return setIsCompleted(false);
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
        <S.QuestionDate>질문 2주전(임시)</S.QuestionDate>
        <S.QuestionContent>좋아하는 동물은?(임시)</S.QuestionContent>
      </S.FcQuestionWrapper>
      <S.FcAnswerContainer>
        <S.FcProfile src={profile} alt="프로필" />
        <S.FcAnswerWrapper>
          <S.FcAnswerer>고양이</S.FcAnswerer>
          <S.FcAnswerContent>
            {!isSubmit ? (
              <>
                <S.FcAnswerInput
                  name="answer"
                  value={answer}
                  placeholder="답변을 입력해주세요"
                  onChange={handleChangeAnswer}
                ></S.FcAnswerInput>
                <S.FcAnswerButton onClick={handleSubmitAnswer} $isCompleted={isCompleted}>
                  답변 완료
                </S.FcAnswerButton>
              </>
            ) : (
              <>
                <S.SubmitedAnswer $isUpdate={isUpdate}>{answer}</S.SubmitedAnswer>
                <S.EditorButton
                  onClick={handleUpdateAnswer}
                  $editAnswer={editAnswer}
                  $isUpdate={isUpdate}
                >
                  <img src={editor} />
                  수정하기
                </S.EditorButton>
              </>
            )}
            {isUpdate ? (
              <>
                <S.FcAnswerInput
                  name="answer"
                  value={answer}
                  onChange={handleChangeAnswer}
                  placeholder="답변을 입력해주세요"
                  $isCompleted={isCompleted}
                  $editAnswer={editAnswer}
                ></S.FcAnswerInput>
                <S.FcAnswerButton
                  onClick={handleSubmitEditAnswer}
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
                  <img src={editor} />
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
