import { useState } from 'react';
import * as S from './FeedCardStyle';
import { createReaction } from 'api/api.questions';
import { timeForToday } from 'date';

import AnswerStateTag from 'components/AnswerStateTag';
import handleExtractVideoId from 'utils/ExtractYoutubeId';
import ReactPlayer from 'react-player';

export default function FeedCardItem({ questionData, userTitleData }) {
  const { content, createdAt, like, dislike, answer } = questionData;

  const [likeCount, setLikeCount] = useState(like);
  const [disLikeCount, setDisLikeCount] = useState(dislike);

  const [reaction, setReaction] = useState({
    like: false,
    dislike: false,
  });

  const YOUTUBE_BASE = 'https://www.youtube.com/watch?v=';
  const key = handleExtractVideoId(answer?.content);
  const youtubeURL = YOUTUBE_BASE + key;

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
        const result = await createReaction(questionData.id, name);
        name === 'like' ? setLikeCount(result.like) : setDisLikeCount(result.dislike);
      } catch (error) {
        console.log(error);
      }
    }
    handleReactionChange(name, value);
  };

  const isAnswerCompleted = answer !== null;
  const isAnswerRejected = isAnswerCompleted && answer.isRejected;

  return (
    <S.Wrapper>
      <AnswerStateTag state={isAnswerCompleted} />
      <S.Description>
        <S.Info>
          <span>질문 · {timeForToday(createdAt)}</span>
        </S.Info>
        <S.Title>{content}</S.Title>
      </S.Description>
      {answer && (
        <S.Contents>
          <S.Profile src={userTitleData?.imageSource} />
          <S.Content>
            <S.ContentInfo>
              <S.InfoTitle>{userTitleData?.title}</S.InfoTitle>
              <S.InfoTimeDiff>{timeForToday(answer.createdAt)}</S.InfoTimeDiff>
            </S.ContentInfo>
            <S.ContentDescription $state={isAnswerRejected}>
              {isAnswerRejected ? '답변 거절' : answer.content}
              {!isAnswerRejected && answer.content.includes(YOUTUBE_BASE) && (
                <ReactPlayer url={youtubeURL} muted controls width={'400px'} height={'240px'} />
              )}
            </S.ContentDescription>
          </S.Content>
        </S.Contents>
      )}
      <S.Reaction>
        <S.Option
          onClick={handleReactionToggle}
          name="like"
          value={reaction.like}
          disabled={reaction.dislike}
        >
          <S.IconLike $isActive={reaction.like} />
          <S.LikeText $isActive={reaction.like}>
            좋아요 {likeCount === 0 ? '' : likeCount}
          </S.LikeText>
        </S.Option>
        <S.Option
          onClick={handleReactionToggle}
          name="dislike"
          value={reaction.dislike}
          disabled={reaction.like}
        >
          <S.IconDisLike $isActive={reaction.dislike} />
          <S.DislikeText $isActive={reaction.dislike}>
            싫어요 {disLikeCount === 0 ? '' : disLikeCount}
          </S.DislikeText>
        </S.Option>
      </S.Reaction>
    </S.Wrapper>
  );
}
