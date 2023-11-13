import * as S from './FeedCardStyled';

import { useState } from 'react';
import down from '../../assets/images/down.svg';
import up from '../../assets/images/thumbs-up.svg';

import clickedUp from '../../assets/images/clicked_up.svg';
import clickedDown from '../../assets/images/clicked_down.svg';
import { timeForToday } from '../../date';

export function QuestionInfo({ question }) {
  return (
    <S.FcQuestionWrapper>
      <S.QuestionDate>
        질문
        <S.DisplayTime>{timeForToday(question.createdAt)}</S.DisplayTime>
      </S.QuestionDate>
      <S.QuestionContent>{question.content}</S.QuestionContent>
    </S.FcQuestionWrapper>
  );
}

export function AnswererImage({ answerer }) {
  return (
    <S.FcProfileWrapper>
      <S.FcProfile $url={answerer.imageSource} alt="프로필" />
    </S.FcProfileWrapper>
  );
}

export function AnswererInfo({ answerer, question }) {
  return (
    <S.FcAnswerer>
      {answerer?.name}
      {question?.answer ? (
        <S.DisplayTime>{timeForToday(question.answer?.createdAt)}</S.DisplayTime>
      ) : null}
    </S.FcAnswerer>
  );
}

export function FeedCardFooter({ question }) {
  const [likeCount, setLikeCount] = useState(question?.like);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(question?.dislike);

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
    <S.FcFooter>
      <S.FcFooterLine />
      <S.FcReactionMarkWrapper>
        <S.Reaction onClick={handletoggleLike} $liked={liked}>
          {liked ? <img src={clickedUp} alt="활성화 된 좋아요" /> : <img src={up} alt="좋아요" />}
          <span>좋아요 {question?.like !== 0 && question?.like}</span>
        </S.Reaction>

        <S.Reaction onClick={handletoggleDislike} $disliked={disliked}>
          {disliked ? (
            <img src={clickedDown} alt="활성화 된 싫어요" />
          ) : (
            <img src={down} alt="싫어요" />
          )}
          <span>싫어요 {question?.dislike !== 0 && question?.dislike} </span>
        </S.Reaction>
      </S.FcReactionMarkWrapper>
    </S.FcFooter>
  );
}
