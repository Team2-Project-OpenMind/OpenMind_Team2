import * as S from './PostStyle';
import { useState } from 'react';

import FeedCard from 'components/answerFeedCard/FeedCard';
import ClipBoardCopyMessage from 'components/clipBoardCopyMessage';
import QuestionModal from 'components/modal/questionModal';
import ShareIcon from 'assets/images/ShareIcon.svg';
import KAKAO from 'assets/images/ShareIcon_KAKAO.svg';
import FACEBOOK from 'assets/images/ShareIcon_FACEBOOK.svg';
import Card from 'components/feed/Card';
import ModalPortal from 'components/ModalPortal';

const FEED_COUNT_TEMPORAL = 11;

export default function Post() {
  const [isOpenModal, setOpenModal] = useState(false);

  const isEmpty = FEED_COUNT_TEMPORAL === 0;

  //특정 버튼을 누를 때마다 모달의 개폐 상태가 바뀌게하는 함수
  const handleClickButton = () => {
    setOpenModal(!isOpenModal);
  };

  return (
    <>
      <S.Wrapper>
        {isOpenModal && (
          <ModalPortal>
            <QuestionModal onClick={handleClickButton} />
          </ModalPortal>
        )}
        <S.Title>아초는 고양이</S.Title>
        <S.LinkContainer>
          <S.LinkIcon src={ShareIcon} alt="링크공유_아이콘"></S.LinkIcon>
          <S.LinkIcon src={KAKAO} alt="카카오링크_아이콘"></S.LinkIcon>
          <S.LinkIcon src={FACEBOOK} alt="페이스북링크_아이콘"></S.LinkIcon>
        </S.LinkContainer>
        <S.FeedContainer $isEmpty={isEmpty}>
          <S.Info>
            <S.IconMessage />
            <S.QuestionCount>
              {FEED_COUNT_TEMPORAL
                ? `${FEED_COUNT_TEMPORAL}개의 질문이 있습니다`
                : `아직 질문이 없습니다`}
            </S.QuestionCount>
          </S.Info>
          {isEmpty ? <S.EmptyBoxImg /> : <FeedCard />}
          {/* <Card /> */}
        </S.FeedContainer>
        <S.CreateQuestionButton onClick={handleClickButton}>질문 작성하기</S.CreateQuestionButton>
        <ClipBoardCopyMessage />
      </S.Wrapper>
    </>
  );
}
