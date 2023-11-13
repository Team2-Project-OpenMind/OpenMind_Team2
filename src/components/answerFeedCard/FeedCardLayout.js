import { useState } from 'react';
import * as s from '../feed/FeedCardStyle';
import * as S from './FeedCardStyled';

import { createReaction, getQuestions } from 'api/api.questions';
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
  const [reactionCount, setReactionCount] = useState({
    like: question.like,
    dislike: question.dislike,
  });
  const [reaction, setReaction] = useState({
    like: false,
    dislike: false,
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
        const result = await createReaction(question.id, name);
        const data = await getQuestions(question.id);
        setReactionCount({
          ...reactionCount,
          ['reactionCount.like']: data.like,
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
          <s.IconLike $isActive={reaction.like} />
          <s.LikeText $isActive={reaction.like}>
            좋아요 {reactionCount.like === 0 ? '' : reactionCount.like}
          </s.LikeText>
        </S.Reaction>

        <S.Reaction
          onClick={handleReactionToggle}
          name="dislike"
          value={reaction.dislike}
          disabled={reaction.like}
        >
          <s.IconDisLike $isActive={reaction.dislike} />
          <s.DislikeText $isActive={reaction.dislike}>
            싫어요 {reactionCount.dislike === 0 ? '' : reactionCount.dislike}
          </s.DislikeText>
        </S.Reaction>
      </S.FcReactionMarkWrapper>
    </S.FcFooter>
  );
}
