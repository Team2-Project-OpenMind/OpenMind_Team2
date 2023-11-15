import { useState, useEffect, useContext } from 'react';

import ReactPlayer from 'react-player';

import { useNavigate } from 'react-router-dom';

import { getSubjectsOnQuestions, getSubject } from '../../api/api.subjects.js';
import { deleteQuestion, createAnswer } from '../../api/api.questions';
import { updateAnswersPartial } from '../../api/api.answers';

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

export default function Answer() {
  const [questionList, setQuestionList] = useState([]);
  const [answererProfile, setAnswererProfile] = useState({});
  const [isOn, setIsOn] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuSelected, setMenuSelected] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const LocalId = window.localStorage.getItem('id');

  const YOUTUBE_BASE = 'https://www.youtube.com/watch?v=';

  const { setIsPath, setSelectUserId, userTitleData } = useContext(PagePath);

  const navigate = useNavigate();

  const handleRenderSubjectsOnQ = async (id) => {
    try {
      const { results } = await getSubjectsOnQuestions(id);
      setQuestionList(results);
    } catch (error) {
      console.log(error);
    }
  };

  /* const handleRenderSubjectProfile = async (id) => {
    try {
      const result = await getSubject(id);
      const { name, imageSource } = result;

      setAnswererProfile({ ...answererProfile, name, imageSource });
    } catch (error) {
      console.log(error);
    }
  }; */

  const handleAllDeleteQuestionList = async (id) => {
    try {
      const { results } = await getSubjectsOnQuestions(id);

      const questionIdForDelete = results.map((result) => result.id);

      questionIdForDelete.map(async (id) => {
        await deleteQuestion(id);
      });

      setQuestionList([]);
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
    handleRenderSubjectsOnQ(LocalId);
    /*   handleRenderSubjectProfile(LocalId); */
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
              {questionList ? `${questionList.length}개의 질문이 있습니다` : `아직 질문이 없습니다`}
            </S.QuestionCount>
          </S.Info>
          {!questionList ? (
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
                  );
                })}
              </>
            </>
          )}
        </S.FeedContainer>
        {isCopied && <ClipBoardCopyMessage />}
      </S.Wrapper>
    </>
  );
}
