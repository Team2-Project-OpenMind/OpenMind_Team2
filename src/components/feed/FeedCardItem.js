import { useState } from 'react';
import * as S from './FeedCardStyle';
import { createReaction } from 'api/api.questions';

import AnswerStateTag from 'components/AnswerStateTag';

export default function FeedCardItem({ questionData }) {
  const { content, createdAt, like, dislike, answer } = questionData;
  const [reaction, setReaction] = useState({
    like: false,
    dislike: false,
  });

  const handleReactionChange = async (e) => {
    const name = e.currentTarget.getAttribute('name');
    const value = JSON.parse(e.currentTarget.getAttribute('value'));
    if (value === false) {
      try {
        const result = await createReaction(questionData.id, name);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
    setReaction((preValues) => ({
      ...preValues,
      [name]: !value,
    }));
  };

  const isAnswerCompleted = answer !== null;
  const isAnswerRejected = isAnswerCompleted && answer.isRejected;

  return (
    <S.Wrapper>
      <AnswerStateTag state={isAnswerCompleted} />
      <S.Description>
        <S.Info>
          <span>질문 · {createdAt}</span>
        </S.Info>
        <S.Title>{content}</S.Title>
      </S.Description>
      {answer && (
        <S.Contents>
          <S.Profile />
          <S.Content>
            <S.ContentInfo>
              <S.InfoTitle>아초는고양이</S.InfoTitle>
              <S.InfoTimeDiff>2주전</S.InfoTimeDiff>
            </S.ContentInfo>
            <S.ContentDescription $state={isAnswerRejected}>
              {isAnswerRejected ? '답변 거절' : answer.content}
            </S.ContentDescription>
          </S.Content>
        </S.Contents>
      )}
      <S.Reaction>
        <S.Option onClick={handleReactionChange} name="like" value={reaction.like}>
          <S.IconLike $isActive={reaction.like} />
          <S.Text $isActive={reaction.like}>좋아요 {like === 0 ? '' : like}</S.Text>
        </S.Option>
        <S.Option onClick={handleReactionChange} name="dislike" value={reaction.dislike}>
          <S.IconDisLike $isActive={reaction.dislike} />
          <S.Text $isActive={reaction.dislike}>싫어요 {dislike === 0 ? '' : dislike}</S.Text>
        </S.Option>
      </S.Reaction>
    </S.Wrapper>
  );
}
