import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './PostStyle';

import { getSubjectsOnQuestions } from 'api/api.subjects';

import ClipBoardCopyMessage from 'components/ClipBoardCopyMessage';
import ModalPortal from 'components/ModalPortal';
import QuestionModal from 'components/modal/QuestionModal';
import FeedCardList from 'components/feed/FeedCardList';
import SNSshare from 'components/SNSshare';
import { pathState } from 'components/common/pathState';
import { PagePath } from 'context/PathContext';

export default function Post() {
  const { id } = useParams();
  const [questionCount, setQuestionCount] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { setIsPath, setSelectUserId, userTitleData } = useContext(PagePath);

  const isEmptyQuestions = questionCount === 0;

  const handleLoaded = async () => {
    try {
      const res = await getSubjectsOnQuestions(id);
      console.log(res);
      setQuestionCount(res.count);
      setQuestionData(res.results);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(questionData);
  //특정 버튼을 누를 때마다 모달의 개폐 상태가 바뀌게하는 함수
  const handleModalShow = () => {
    setOpenModal(!isOpenModal);
  };

  useEffect(() => {
    setSelectUserId(id);
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
        <S.Title>{userTitleData?.title}</S.Title>
        <SNSshare OnClickSNSshare={setIsCopied}></SNSshare>
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
        {isCopied && <ClipBoardCopyMessage />}
      </S.Wrapper>
    </>
  );
}
