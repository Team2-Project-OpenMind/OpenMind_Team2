import { useState } from 'react';
import * as S from './PostStyle';
import ClipBoardCopyMessage from 'components/clipBoardCopyMessage';
import QuestionModal from 'components/questionModal';

const FEED_COUNT_TEMPORAL = 0;

export default function Post() {
  const [modal, setModal] = useState(false);

  const handleClickButton = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal && <QuestionModal onClick={handleClickButton} />}
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
            {<S.QuestionCount>{FEED_COUNT_TEMPORAL}개의 질문이 있습니다</S.QuestionCount>}
          </S.Info>
          {FEED_COUNT_TEMPORAL === 0 ? <S.EmptyBoxImg /> : <div>카드 컴포넌트</div>}
        </S.FeedContainer>
        <S.CreateQuestionButton onClick={handleClickButton}>질문 작성하기</S.CreateQuestionButton>
        <ClipBoardCopyMessage />
      </S.Wrapper>
    </>
  );
}
