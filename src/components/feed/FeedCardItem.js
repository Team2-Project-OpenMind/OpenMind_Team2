import * as S from './FeedCardStyle';

import AnswerStateTag from 'components/AnswerStateTag';
import { deleteAnswers } from 'api/api.answers';

export default function FeedCardItem({ questionData }) {
  const { content, createdAt, like, dislike, answer } = questionData;

  const isAnswerCompleted = answer !== null;
  const isAnswerRejected = isAnswerCompleted && answer.isRejected;
  
  const handleDeleteAnswer = async () => {
    const id= questionData.answer.id
    try {
      const result = await deleteAnswers(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

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
            <button onClick={handleDeleteAnswer}>답변삭제</button>
            <S.ContentDescription $state={isAnswerRejected}>
              {isAnswerRejected ? '답변 거절' : answer.content}
            </S.ContentDescription>
          </S.Content>
        </S.Contents>
      )}
      <S.Reaction>
        <S.Option>
          <S.IconLike />
          <S.Text>좋아요 {like === 0 ? '' : like}</S.Text>
        </S.Option>
        <S.Option>
          <S.IconDisLike />
          <S.Text>싫어요 {dislike === 0 ? '' : dislike}</S.Text>
        </S.Option>
      </S.Reaction>
    </S.Wrapper>
  );
}
