import * as S from '../post/PostStyle';

import ClipBoardCopyMessage from 'components/clipBoardCopyMessage';
import QuestionModal from 'components/questionModal';
import FeedCard from 'components/answerFeedCard/FeedCard.js';
import { getSubjectsOnQuestions } from '../../api/api.subjects.js';
import { useState, useEffect } from 'react';

import ShareIcon from 'assets/images/ShareIcon.svg';
import KAKAO from 'assets/images/ShareIcon_KAKAO.svg';
import FACEBOOK from 'assets/images/ShareIcon_FACEBOOK.svg';

const FEED_COUNT_TEMPORAL = 0;

export default function Answer() {
  const [questionList, setQusetionList] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);
  const handleRenderSubjectsOnQ = async (id) => {
    try {
      const { results } = await getSubjectsOnQuestions(id);

      setQusetionList(results);
    } catch (error) {
      console.log(error);
    }
  };
  const isEmpty = FEED_COUNT_TEMPORAL === 0;

  const handleClickButton = () => {
    setOpenModal(!isOpenModal);
  };
  useEffect(() => {
    handleRenderSubjectsOnQ(81);
  }, []);

  return (
    <>
      {isOpenModal && <QuestionModal onClick={handleClickButton} />}
      <S.Wrapper>
        <S.Title>아초는 고양이</S.Title>
        <S.LinkContainer>
          <S.LinkIcon src={ShareIcon} alt="링크공유_아이콘"></S.LinkIcon>
          <S.LinkIcon src={KAKAO} alt="카카오링크_아이콘"></S.LinkIcon>
          <S.LinkIcon src={FACEBOOK} alt="페이스북링크_아이콘"></S.LinkIcon>
        </S.LinkContainer>
        <S.FeedContainer isEmpty={isEmpty}>
          <S.Info>
            <S.IconMessage />
            <S.QuestionCount>
              {!FEED_COUNT_TEMPORAL
                ? `${FEED_COUNT_TEMPORAL}개의 질문이 있습니다`
                : `아직 질문이 없습니다`}
            </S.QuestionCount>
          </S.Info>
          {!FEED_COUNT_TEMPORAL === 0 ? (
            <S.EmptyBoxImg />
          ) : (
            <>
              {questionList.map((question) => {
                return <FeedCard key={question.id} {...question} />;
              })}
            </>
          )}
        </S.FeedContainer>
        <S.CreateQuestionButton onClick={handleClickButton}>질문 작성하기</S.CreateQuestionButton>
        <ClipBoardCopyMessage />
      </S.Wrapper>
    </>
  );
}
