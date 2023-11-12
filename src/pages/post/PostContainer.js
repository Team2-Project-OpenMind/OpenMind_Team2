import { useEffect, useRef, useState } from 'react';
import * as S from './PostStyle';

import { getSubjectsOnQuestions } from 'api/api.subjects';

import ClipBoardCopyMessage from 'components/ClipBoardCopyMessage';
import ModalPortal from 'components/ModalPortal';
import QuestionModal from 'components/modal/QuestionModal';
import FeedCardList from 'components/feed/FeedCardList';
import ShareIcon from 'assets/images/ShareIcon.svg';
import KAKAO from 'assets/images/ShareIcon_KAKAO.svg';
import FACEBOOK from 'assets/images/ShareIcon_FACEBOOK.svg';
import { useParams } from 'react-router-dom';

const options = {
  root: null,
  rootMain: '0px',
  threshold: 1, // 단계별 콜백함수 호출
};

const DEFAULT_LIMIT = 4;
const DEFAULT_OFFSET = 0;

export default function Post() {
  const { id } = useParams();
  const target = useRef(null);

  const [questionCount, setQuestionCount] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);

  const [pageLimit, setPageLimit] = useState(DEFAULT_LIMIT);
  const [pageOffset, setPageOffset] = useState(DEFAULT_OFFSET);
  const [hasNext, setHasNext] = useState(false);
  // const [hasPrevious, setHasPrevious] = useState(true);

  const isEmptyQuestions = questionCount === 0;

  useEffect(() => {
    if (!target.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNext) {
        console.log('옵져버 실행중', hasNext); // 삭제예정
        handleIntersection(entries[0]);
      }
    }, options);

    if (target.current) {
      observer.observe(target.current);
    }

    // clean up
    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [target, pageLimit, pageOffset, hasNext]);

  const handleIntersection = async (entry) => {
    if (!target.current) return;

    try {
      const res = await getSubjectsOnQuestions(id, pageLimit, pageOffset);
      const { next, previous, results } = res;

      if (previous === null) {
        return; // 초기 렌더링 콜백함수 호출될때 중복으로 데이터 불러오지 않기
      }

      setQuestionData((prev) => [...prev, ...results]);

      if (next === null) {
        setHasNext(false);
        return;
      }

      /**
       * next가 null이 아닐때만 수행하기
       * next 값이 있을때는 next를 기준으로 offset이 결정되지만,
       * 더이상 받을 데이터가 없을때는 (=next가 null일때) offset을 마지막 offset으로 유지(업데이트x)
       * 다시 post 진입하면 처음 상태(offset = 0)
       */

      const nextSearchParams = new URLSearchParams(new URL(next).search);
      const nextOffset = nextSearchParams.get('offset');

      setPageOffset(nextOffset);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoaded = async () => {
    try {
      const res = await getSubjectsOnQuestions(id, pageLimit, pageOffset);
      const { count, next, results } = res;

      const nextSearchParams = new URLSearchParams(new URL(next).search);

      if (next !== null) {
        setHasNext(true);
      }

      const nextLimit = nextSearchParams.get('limit');
      const nextOffset = nextSearchParams.get('offset');

      setPageLimit(nextLimit);
      setPageOffset(nextOffset);

      setQuestionCount(count);
      setQuestionData(results);
    } catch (error) {
      console.log(error);
    }
  };

  //특정 버튼을 누를 때마다 모달의 개폐 상태가 바뀌게하는 함수
  const handleModalShow = () => {
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
            <QuestionModal onClose={handleModalShow} id={id} />
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
        <S.CreateQuestionButton onClick={handleModalShow}>질문 작성하기</S.CreateQuestionButton>
        <ClipBoardCopyMessage />
      </S.Wrapper>
      <S.Target ref={target}></S.Target>
    </>
  );
}
