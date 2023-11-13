import { useState } from 'react';
import * as S from './FeedCardStyled';

import { createReaction } from 'api/api.questions';
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
  if (!answerer) return;
  const { imageSource } = answerer;
  return (
    <S.FcProfileWrapper>
      <S.FcProfile $url={imageSource} alt="프로필" />
    </S.FcProfileWrapper>
  );
}

export function AnswererInfo({ answerer, question }) {
  if (!answerer) return;
  const { title } = answerer;

  return (
    <S.FcAnswerer>
      {title}
      {question?.answer ? (
        <S.DisplayTime>{timeForToday(question.answer?.createdAt)}</S.DisplayTime>
      ) : null}
    </S.FcAnswerer>
  );
}

export function FeedCardFooter({ question }) {
  const [reaction, setReaction] = useState({
    like: false,
    dislike: false,
    likeCount: question.like,
    dislikeCount: question.dislike,
  });

  const handleReactionChange = (name, value) => {
    setReaction((preValues) => ({
      ...preValues,
      [name]: !value,
    }));
  };

  const handleReactionToggle = async (e) => {
    const name = e.currentTarget.getAttribute('name');
    const value = JSON.parse(e.currentTarget.getAttribute('value'));
    if (value === false) {
      try {
        const data = await createReaction(question.id, name);
        name === `like`
          ? setReaction({
              ...reaction,
              likeCount: data.like,
            })
          : setReaction({
              ...reaction,
              dislikeCount: data.dislike,
            });
      } catch (error) {
        console.log(error);
      }
    }
    handleReactionChange(name, value);
  };

  return (
    <S.FcFooter>
      <S.FcFooterLine />
      <S.FcReactionMarkWrapper>
        <S.Reaction
          onClick={handleReactionToggle}
          name="like"
          value={reaction.like}
          disabled={reaction.dislike}
        >
          <S.IconLike $isActive={reaction.like} />
          <S.LikeText $isActive={reaction.like}>
            좋아요 {reaction.likeCount === 0 ? '' : reaction.likeCount}
          </S.LikeText>
        </S.Reaction>

        <S.Reaction
          onClick={handleReactionToggle}
          name="dislike"
          value={reaction.dislike}
          disabled={reaction.like}
        >
          <S.IconDisLike $isActive={reaction.dislike} />
          <S.DislikeText $isActive={reaction.dislike}>
            싫어요 {reaction.dislikeCount === 0 ? '' : reaction.dislikeCount}
          </S.DislikeText>
        </S.Reaction>
      </S.FcReactionMarkWrapper>
    </S.FcFooter>
  );
}
