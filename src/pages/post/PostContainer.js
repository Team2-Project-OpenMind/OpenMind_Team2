import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './PostStyle';

import { getSubjectsOnQuestions } from 'api/api.subjects';
import useIntersect from 'hooks/useIntersect';

import ClipBoardCopyMessage from 'components/ClipBoardCopyMessage';
import ModalPortal from 'components/ModalPortal';
import QuestionModal from 'components/modal/QuestionModal';
import FeedCardList from 'components/feed/FeedCardList';
import SNSshare from 'components/SNSshare';

import { pathState } from 'components/common/pathState';
import { PagePath } from 'context/PathContext';

const DEFAULT_LIMIT = 0;
const DEFAULT_OFFSET = 0;

export default function Post() {
  const { id } = useParams();

  const [questionCount, setQuestionCount] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { setIsPath } = useContext(PagePath);

  const [pageLimit, setPageLimit] = useState(DEFAULT_LIMIT);
  const [pageOffset, setPageOffset] = useState(DEFAULT_OFFSET);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const target = useIntersect(handleIntersection, hasNext);

  const isEmptyQuestions = questionCount === 0;

  // useIntersect로 전달할 callback 함수
  async function handleIntersection(entry) {
    if (!target.current || isLoading) return;

    try {
      setIsLoading(true);
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
      setPageOffset(nextSearchParams.get('offset'));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLoaded = async () => {
    try {
      const res = await getSubjectsOnQuestions(id, pageLimit, pageOffset);
      const { count, next, results } = res;

      setQuestionCount(count);
      setQuestionData(results);

      if (!next) return;

      // 처음 보여지는 page 외 추가 page가 있는 경우 실행
      const nextSearchParams = new URLSearchParams(new URL(next).search);

      setHasNext(true);
      setPageLimit(nextSearchParams.get('limit'));
      setPageOffset(nextSearchParams.get('offset'));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //특정 버튼을 누를 때마다 모달의 개폐 상태가 바뀌게하는 함수
  const handleModalShow = () => {
    setOpenModal(!isOpenModal);
  };


  useEffect(() => {
    handleLoaded();
    if (pathState()) {
      setIsPath(true);
    } else {
      setIsPath(false);
    }
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
        <SNSshare OnClickSNSshare={setIsCopied}></SNSshare>
        <S.FeedContainer $isEmpty={isEmptyQuestions}>
          <S.Info>
            <S.IconMessage />
            <S.QuestionCount>
              {isEmptyQuestions ? '아직 질문이 없습니다' : `${questionCount}개의 질문이 있습니다`}
            </S.QuestionCount>
          </S.Info>
          {isEmptyQuestions ? <S.EmptyBoxImg /> : <FeedCardList questionData={questionData}/>}
          {isLoading && <div>스켈레톤</div>}
        </S.FeedContainer>
        <S.CreateQuestionButton onClick={handleModalShow}>질문 작성하기</S.CreateQuestionButton>
        {isCopied && <ClipBoardCopyMessage />}
      </S.Wrapper>
      <S.Target ref={target}></S.Target>
    </>
  );
}
