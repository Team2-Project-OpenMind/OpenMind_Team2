import * as S from './PostStyle';

export default function Post() {
  return (
    <S.Wrapper>
      <S.Title>아초는 고양이</S.Title>
      <S.LinkContainer>
        <span>링크공유</span>
        <span>카카오링크</span>
        <span>페이스북링크</span>
      </S.LinkContainer>
      <S.FeedContainer>
        <S.Info>
          <S.IconMessage />
          <span>개의 질문이 있습니다</span>
        </S.Info>
        <div>카드 컴포넌트</div>
      </S.FeedContainer>
    </S.Wrapper>
  );
}
