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

const DEFAULT_LIMIT = 3;
const DEFAULT_OFFSET = 0;

export default function Post() {
  const { id } = useParams();
  const target = useRef(null);

  const [questionCount, setQuestionCount] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);

  const [pageLimit, setPageLimit] = useState(DEFAULT_LIMIT);
  const [pageOffset, setPageOffset] = useState(DEFAULT_OFFSET);

  const isEmptyQuestions = questionCount === 0;

  useEffect(() => {
    if (!target.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('옵져버 실행중'); // 삭제예정
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
  }, [target, pageLimit, pageOffset]);

  const handleIntersection = async (entry) => {
    console.log(entry); // 삭제예정
    if (!target.current) return;

    const res = await getSubjectsOnQuestions(id, pageLimit, pageOffset);
    const { next, previous, results } = res;

    if (!next) return;

    try {
      const nextSearchParams = new URLSearchParams(new URL(next).search);

      const nextLimit = nextSearchParams.get('limit');
      const nextOffset = nextSearchParams.get('offset');

      console.log('Limit:', nextLimit); // 삭제예정
      console.log('Offset:', nextOffset); // 삭제예정

      setPageLimit(nextLimit);
      setPageOffset(nextOffset);
    } catch (error) {
      console.log(error);
    }
    setQuestionData((prev) => {
      console.log(prev); // 삭제예정
      console.log(...results); // 삭제예정
      return [...prev, ...results];
    });
  };

  const handleLoaded = async () => {
    try {
      const res = await getSubjectsOnQuestions(id, pageLimit, pageOffset); // limit, offset(몇개 건너뛸건 지)
      const { count, next, previous, results } = res;

      if (!next) return;
      const nextSearchParams = new URLSearchParams(new URL(next).search);

      const nextLimit = nextSearchParams.get('limit');
      const nextOffset = nextSearchParams.get('offset');

      console.log('Limit:', nextLimit); // 삭제예정
      console.log('Offset:', nextOffset); // 삭제예정

      setPageLimit(nextLimit);
      setPageOffset(nextOffset);

      setQuestionCount(count);
      setQuestionData(results);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('렌더링'); // 삭제예정
  console.log(questionData); // 삭제예정

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
      <div style={{ height: '1px' }} ref={target}>
        관찰
      </div>
    </>
  );
}
