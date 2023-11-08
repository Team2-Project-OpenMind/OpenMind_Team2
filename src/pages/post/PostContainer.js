import { useEffect, useState } from 'react';
import * as S from './PostStyle';

import { getSubjectsOnQuestions } from 'api/api.subjects';

import ClipBoardCopyMessage from 'components/clipBoardCopyMessage';
import ModalPortal from 'components/ModalPortal';
import QuestionModal from 'components/modal/questionModal';
import FeedCardList from 'components/feed/FeedCardList';
import ShareIcon from 'assets/images/ShareIcon.svg';
import KAKAO from 'assets/images/ShareIcon_KAKAO.svg';
import FACEBOOK from 'assets/images/ShareIcon_FACEBOOK.svg';
import { useParams } from 'react-router-dom';

export default function Post() {
  const { id } = useParams();
  const [questionCount, setQuestionCount] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);

  const isEmptyQuestions = questionCount === 0;

  const handleLoaded = async () => {
    try {
      const res = await getSubjectsOnQuestions(id);
      setQuestionCount(res.count);
      setQuestionData(res.results);
    } catch (error) {
      console.log(error);
    }
  };

  //특정 버튼을 누를 때마다 모달의 개폐 상태가 바뀌게하는 함수
  const handleClickButton = () => {
    setOpenModal(!isOpenModal);
  };

  useEffect(() => {
    handleLoaded();
  }, []);

  return (
    <>
      <S.Wrapper>
        {isOpenModal && (
          <ModalPortal>
            <QuestionModal onClick={handleClickButton} id={id} />
          </ModalPortal>
        )}
        <S.Title>아초는 고양이</S.Title>
        <S.LinkContainer>
          <S.LinkIcon src={ShareIcon} alt="링크공유_아이콘"></S.LinkIcon>
          <S.LinkIcon src={KAKAO} alt="카카오링크_아이콘"></S.LinkIcon>
          <S.LinkIcon src={FACEBOOK} alt="페이스북링크_아이콘"></S.LinkIcon>
        </S.LinkContainer>
        <S.FeedContainer $isEmpty={isEmptyQuestions}>
          <S.Info>
            <S.IconMessage />
            <S.QuestionCount>
              {isEmptyQuestions ? '아직 질문이 없습니다' : `${questionCount}개의 질문이 있습니다`}
            </S.QuestionCount>
          </S.Info>
          {isEmptyQuestions ? <S.EmptyBoxImg /> : <FeedCardList questionData={questionData} />}
        </S.FeedContainer>
        <S.CreateQuestionButton onClick={handleClickButton}>질문 작성하기</S.CreateQuestionButton>
        <ClipBoardCopyMessage />
      </S.Wrapper>
    </>
  );
}
