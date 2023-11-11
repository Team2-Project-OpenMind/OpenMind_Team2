import { useState } from 'react';

import { timeForToday } from '../../date';

import * as S from './FeedCardStyled';
import UpdateReply from './UpdateReply';
import { Reply, SubmittedReply } from './Reply';
import EditReply from './EditReply';
import down from '../../assets/images/down.svg';
import up from '../../assets/images/thumbs-up.svg';

import clickedUp from '../../assets/images/clicked_up.svg';
import clickedDown from '../../assets/images/clicked_down.svg';
import PopOverMenu from 'components/modal/PopOverMenu';

export default function Feedcard({ question, answerer, onCreate, onPatch, onChange }) {
  const [isOpenedEditorUI, setIsOpenedEditorUI] = useState(false);
  const [likeCount, setLikeCount] = useState(question.like);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(question.dislike);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleDisplayEditorUI = () => setIsOpenedEditorUI((prev) => !prev);

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
      {isMenuOpen && (
        <PopOverMenu
          id={question?.id}
          answerId={question?.answer?.id}
          onChange={onChange}
          onClose={handleMenuToggle}
        />
      )}

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
            {question?.answer ? (
              <S.DisplayTime>{timeForToday(question.answer?.createdAt)}</S.DisplayTime>
            ) : null}
          </S.FcAnswerer>
          <S.FcAnswerContent>
            <S.KebabButton alt="케밥버튼" onClick={handleMenuToggle} />
            <UpdateReply onOpen={handleDisplayEditorUI} />

            {question?.answer ? (
              <>
                <S.AnswerMark>답변 완료</S.AnswerMark>
                <SubmittedReply>{question.answer.content}</SubmittedReply>
              </>
            ) : (
              <>
                <S.UnansweredMark>미답변</S.UnansweredMark>
                <Reply onCreate={onCreate} question={question} />
              </>
            )}
            {question?.answer && isOpenedEditorUI ? (
              <EditReply question={question} onPatch={onPatch} onClose={handleDisplayEditorUI} />
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
