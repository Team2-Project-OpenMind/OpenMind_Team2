import { useState, useEffect, useContext } from 'react';

import ReactPlayer from 'react-player';

import { useNavigate, useParams } from 'react-router-dom';
import useIntersect from 'hooks/useIntersect';
import { getSubjectsOnQuestions, getSubject } from '../../api/api.subjects.js';
import { deleteQuestion, createAnswer } from '../../api/api.questions';
import { updateAnswersPartial } from '../../api/api.answers';
import FeedSkeleton from 'components/feed/FeedSkeleton';
import PopOverMenu from 'components/modal/PopOverMenu';
import * as S from '../post/PostStyle';
import * as Layout from 'components/answerFeedCard/FeedCardLayout';
import * as FC from 'components/answerFeedCard/FeedCardStyled';
import { DeleteButton, ButtonWrapper, PreviousButton } from './AnswerStyle.js';
import AnswerUI from 'components/answerFeedCard/AnswerUI';
import ButtonForEditorUI from 'components/answerFeedCard/ButtonForEditorUI';
import ClipBoardCopyMessage from 'components/ClipBoardCopyMessage.js';
import SNSshare from 'components/SNSshare.js';
import { pathState } from 'components/common/pathState.js';
import { PagePath } from 'context/PathContext.js';
import handleExtractVideoId from 'utils/ExtractYoutubeId.js';

const DEFAULT_LIMIT = 0;
const DEFAULT_OFFSET = 0;
export default function Answer() {
  const [questionCount, setQuestionCount] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [isOn, setIsOn] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuSelected, setMenuSelected] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [pageLimit, setPageLimit] = useState(DEFAULT_LIMIT);
  const [pageOffset, setPageOffset] = useState(DEFAULT_OFFSET);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const LocalId = window.localStorage.getItem('id');

  const YOUTUBE_BASE = 'https://www.youtube.com/watch?v=';

  const target = useIntersect(handleIntersection, hasNext);
  const isEmptyQuestions = questionCount === 0;
  const { setIsPath, setSelectUserId, userTitleData } = useContext(PagePath);

  const navigate = useNavigate();

  async function handleIntersection(entry) {
    if (!target.current || isLoading) return;

    try {
      setIsLoading(true);
      const res = await getSubjectsOnQuestions(LocalId, pageLimit, pageOffset);
      const { next, previous, results } = res;

      if (previous === null) {
        return; // 초기 렌더링 콜백함수 호출될때 중복으로 데이터 불러오지 않기
      }
      console.log(isLoading); // 삭제예정
      setQuestionList((prev) => [...prev, ...results]);

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

  const handleLoaded = async (LocalId) => {
    try {
      const res = await getSubjectsOnQuestions(LocalId, pageLimit, pageOffset);
      const { count, next, results } = res;
      console.log(hasNext);
      setQuestionCount(count);
      setQuestionList(results);

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
  // const handleRenderSubjectsOnQ = async (id) => {
  //   try {
  //     const { results } = await getSubjectsOnQuestions(id);
  //     setQuestionList(results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  console.log(hasNext);
  const handleAllDeleteQuestionList = async (id) => {
    try {
      const { results } = await getSubjectsOnQuestions(id);

      const questionIdForDelete = results.map((result) => result.id);

      questionIdForDelete.map(async (id) => {
        await deleteQuestion(id);
      });

      setQuestionList([]);
      setQuestionCount(0);
    } catch (error) {
      console.log(error);
    }
  };

  const CreateReply = async (questionId, answerData) => {
    try {
      const result = await createAnswer(questionId, answerData);

      const handle = (result) => {
        const addAnswer = questionList.map((item) => ({
          ...item,
          answer: item.id === result.questionId ? result : item.answer,
        }));
        setQuestionList(addAnswer);
      };
      handle(result);
    } catch (error) {
      console.log(error);
    }
  };

  const PatchReply = async (answerId, answerData) => {
    try {
      const result = await updateAnswersPartial(answerId, answerData);
      const handle = (result) => {
        const EditAnswer = questionList.map((item) => ({
          ...item,
          answer: item.id === result.questionId ? result : item.answer,
        }));
        setQuestionList(EditAnswer);
      };
      handle(result);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSubmittedReply = () => setIsOn(!isOn);

  const handleMovePage = () => {
    navigate(`/list`);
  };

  // 이하 팝오버
  const handleUpdateList = async () => {
    try {
      const { results } = await getSubjectsOnQuestions(LocalId);

      setQuestionList(results);
    } catch (error) {
      console.log(error);
    }
    //리프레시 값을 트루 폴스로 관리
  };

  //팝오버 관련 함수들
  const handleMenuToggle = () => {
    setMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  const handleSelectPopOver = (e) => {
    //id값을 받는다.
    const nextItem = e.currentTarget.getAttribute('id');
    console.log(nextItem);
    //id값을 menuSelected에 저장한다.
    setMenuSelected(nextItem);
    console.log(menuSelected);
    const isSame = nextItem === menuSelected;
    if (isSame === true) {
      setMenuSelected(null);
      setMenuOpen(false);
    } else {
      setMenuSelected(nextItem);
      setMenuOpen(true);
    }
  };

  useEffect(() => {
    setSelectUserId(LocalId);
    handleLoaded(LocalId);
    if (pathState()) {
      setIsPath(true);
    } else {
      setIsPath(false);
    }
  }, [LocalId]);

  return (
    <>
      <S.Wrapper>
        <S.Title>{userTitleData.title}</S.Title>
        <SNSshare OnClickSNSshare={setIsCopied}></SNSshare>
        <ButtonWrapper>
          <PreviousButton onClick={() => handleMovePage()}>질문하러가기</PreviousButton>
          <DeleteButton onClick={() => handleAllDeleteQuestionList(LocalId)}>삭제하기</DeleteButton>
        </ButtonWrapper>
        <S.FeedContainer>
          <S.Info>
            <S.IconMessage />
            <S.QuestionCount>
              {questionList ? `${questionCount}개의 질문이 있습니다` : `아직 질문이 없습니다`}
            </S.QuestionCount>
          </S.Info>
          {!isLoading && isEmptyQuestions ? (
            <S.EmptyBoxImg />
          ) : (
            <>
              <>
                {questionList.map((question) => {
                  const isSelected = question?.id == menuSelected;
                  const isRejected = question?.answer?.isRejected === true;

                  const key = handleExtractVideoId(question?.answer?.content);
                  const youtubeURL = YOUTUBE_BASE + key;

                  return (
                    <>
                      <FC.Wrapper key={question.id}>
                        {isMenuOpen && isSelected && (
                          <PopOverMenu
                            id={question?.id}
                            answerId={question?.answer?.id}
                            onChange={handleUpdateList}
                            onClose={handleMenuToggle}
                            onSelect={setMenuSelected}
                            onClick={setMenuOpen}
                          />
                        )}

                        <FC.KebabButton
                          type="button"
                          alt="케밥버튼"
                          id={question?.id}
                          onClick={handleSelectPopOver}
                        />
                        <Layout.QuestionInfo question={question} />
                        <FC.ContainerForAnswer>
                          <Layout.AnswererImage answerer={userTitleData} />
                          <FC.WrapperForAnswer>
                            <Layout.AnswererInfo question={question} answerer={userTitleData} />
                            <FC.ContentAboutAnswer>
                              {question?.answer ? (
                                <>
                                  <ButtonForEditorUI
                                    question={question}
                                    onPatch={PatchReply}
                                    onToggle={toggleSubmittedReply}
                                  />
                                  <FC.AnswerMark>답변 완료</FC.AnswerMark>
                                  {!isRejected ? (
                                    <FC.SubmittedAnswer $isDisplay={isOn}>
                                      {question.answer.content}

                                      {question.answer.content.includes(YOUTUBE_BASE) && (
                                        <ReactPlayer
                                          url={youtubeURL}
                                          muted
                                          controls
                                          width={'400px'}
                                          height={'240px'}
                                        />
                                      )}
                                    </FC.SubmittedAnswer>
                                  ) : (
                                    <FC.AnswerRejected>답변 거절</FC.AnswerRejected>
                                  )}
                                </>
                              ) : (
                                <>
                                  <FC.UnAnswerMark>미답변</FC.UnAnswerMark>
                                  <AnswerUI onCreate={CreateReply} question={question} />
                                </>
                              )}
                            </FC.ContentAboutAnswer>
                          </FC.WrapperForAnswer>
                        </FC.ContainerForAnswer>
                        <Layout.FeedCardFooter question={question} />
                      </FC.Wrapper>
                      {isLoading && <FeedSkeleton />}
                    </>
                  );
                })}
              </>
            </>
          )}
        </S.FeedContainer>
        {isCopied && <ClipBoardCopyMessage />}
      </S.Wrapper>
      <S.Target ref={target}></S.Target>
    </>
  );
}
