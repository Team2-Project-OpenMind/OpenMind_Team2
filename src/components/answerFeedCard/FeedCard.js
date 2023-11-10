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

export default function Feedcard({ question, answerer }) {
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

  //답변 생성하고 post 이후 되돌아온 값을 setter 에 넣어 input 태그의 밸류 값인 answer를 변경
  const CreateAnswerForSubmit = async (questionId, answerData) => {
    try {
      const result = await createAnswer(questionId, answerData);
      setAnswer(result.content);
    } catch (error) {
      console.log(error);
    }
  };

  // 답변 수정 이후  수정 결과를 setter에 넣어 제출된 답변 상태 변경
  const PatchAnswerForSubmitEditAnswer = async (answerId, answerData) => {
    try {
      const result = await updateAnswersPartial(answerId, answerData);
      setAnswer(result.content);
    } catch (error) {
      console.log(error);
    }
  };
  // input 태그에서 답변 입력을 하지 않거나 수정할 때 수정내용이 비었을 시 완료버튼 활성화 토글
  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value);
    answer ? setIsCompleted(true) : setIsCompleted(false);
    if (e.target.value === '') return setIsCompleted(false);
  };
  // 답변 제출 버튼  온클릭시
  const handleSubmitAnswer = (questionId, text, boolean) => {
    if (text) {
      setIsSubmited(true);
      CreateAnswerForSubmit(questionId, { content: text, isRejected: boolean });
    }
  };

  // 제출된 답변을 답변 수정 상황으로 바꾸는 함수
  const handleUpdateAnswer = () => {
    setUpdate(!isUpdate);
    setAnswer(question?.answer?.content);
  };

  // 한 번 이상 답변 수정 이후  또 다시 수정 상황으로 돌아가는 함수
  const handelUpdateEditAnswer = () => setEditAnswer(false);

  // 수정완료 버튼! 이미 답변이 있는 질문이면 question 안에 answer.id가 있기 때문에 바로 사용 가능하지만,
  // 아직 답변이 달리지 않은 질문에 답변하고 바로 수정할 경우에는 이미 렌더링 된 question엔 아직 답변이 null 값이기에 해당 질문을 가져와서 답변 아이디 이용
  const handleSubmitEditAnswer = async (questionId, text, boolean) => {
    if (!question.answer?.id) {
      const { answer } = await getQuestions(questionId);
      setEditAnswer(true);
      PatchAnswerForSubmitEditAnswer(answer.id, { content: text, isRejected: boolean });
    } else {
      setEditAnswer(true);
      PatchAnswerForSubmitEditAnswer(question.answer.id, { content: text, isRejected: boolean });
    }
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
    // isUpdate로 조건부 스타일링 안하면 SubmitedAnswer 컴포넌트와 FcAnswerInput 컴포넌트가 중첩됨
    // question?.answer는 이미 답변이 있는 피드카드를 답변완료상태로 렌더링 하기 위해서 사용
    // isSubmit은 아직 답변이 달리지 않은 피드카드를 답변작성완료 했을 때, 답변완료상태로 렌더링하기 위해서 사용

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
          <S.FcProfile $url={answerer.imageSource} alt="프로필" />
        </S.FcProfileWrapper>
        <S.FcAnswerWrapper>
          <S.FcAnswerer>
            {answerer?.name}
            {question?.answer && isSubmit ? (
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
