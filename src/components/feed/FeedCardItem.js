import * as S from './FeedCardStyle';

export default function FeedCardItem({ questionData }) {
  const { content, createdAt, like, dislike, answer } = questionData;
  console.log(answer === null);

  return (
    <S.Wrapper>
      <S.Tag>답변 완료</S.Tag>
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
            <S.ContentDescription>{answer.content}</S.ContentDescription>
          </S.Content>
        </S.Contents>
      )}
      <S.Reaction>
        <S.Option>
          <S.IconLike />
          <S.Text>좋아요 {like}</S.Text>
        </S.Option>
        <S.Option>
          <S.IconDisLike />
          <S.Text>싫어요 {dislike}</S.Text>
        </S.Option>
      </S.Reaction>
    </S.Wrapper>
  );
}
