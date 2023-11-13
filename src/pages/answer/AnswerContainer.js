import { useState, useEffect, useContext } from 'react';

import { getSubjectsOnQuestions, getSubject } from '../../api/api.subjects.js';
import { deleteQuestion, createAnswer } from '../../api/api.questions';
import { updateAnswersPartial } from '../../api/api.answers';

import PopOverMenu from 'components/modal/PopOverMenu';
import ShareIcon from 'assets/images/ShareIcon.svg';
import KAKAO from 'assets/images/ShareIcon_KAKAO.svg';
import FACEBOOK from 'assets/images/ShareIcon_FACEBOOK.svg';
import * as S from '../post/PostStyle';
import * as Layout from 'components/answerFeedCard/FeedCardLayout';
import * as FC from 'components/answerFeedCard/FeedCardStyled';
import { DeleteButton, ButtonWrapper } from './AnswerStyle.js';
import { Reply } from 'components/answerFeedCard/Reply';
import ButtonForEditorUI from 'components/answerFeedCard/ButtonForEditorUI';
import ClipBoardCopyMessage from 'components/ClipBoardCopyMessage.js';
import SNSshare from 'components/SNSshare.js';
import { pathState } from 'components/common/pathState.js';
import { PagePath } from 'context/PathContext.js';

export default function Answer() {
  const [questionList, setQuestionList] = useState([]);
  const [answererProfile, setAnswererProfile] = useState({});
  const [isOn, setIsOn] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuSelected, setMenuSelected] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const LocalId = window.localStorage.getItem('id');
  const { setIsPath } = useContext(PagePath);
  console.log(pathState());
  console.log(questionList);
  const handleRenderSubjectsOnQ = async (id) => {
    try {
      const { results } = await getSubjectsOnQuestions(id);
      setQuestionList(results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenderSubjectProfile = async (id) => {
    try {
      const result = await getSubject(id);
      const { name, imageSource } = result;

      setAnswererProfile({ ...answererProfile, name, imageSource });
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(questionList);
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

  const handleUpdateList = async () => {
    try {
      const { results } = await getSubjectsOnQuestions(LocalId);
      console.log(results);
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
    e.preventDefault();
    const nextItem = e.currentTarget.getAttribute('id');
    setMenuSelected(nextItem);
    console.log(nextItem);
    handleMenuToggle();
  };

  const toggleSubmittedReply = () => setIsOn(!isOn);

  useEffect(() => {
    handleRenderSubjectsOnQ(LocalId);
    handleRenderSubjectProfile(LocalId);
    if (pathState()) {
      setIsPath(true);
    } else {
      setIsPath(false);
    }
  }, [LocalId]);
  console.log(questionList);

  return (
    <>
      <S.Wrapper>
        <S.Title>{answererProfile.name}</S.Title>
        <SNSshare OnClickSNSshare={setIsCopied}></SNSshare>

        <ButtonWrapper>
          <DeleteButton onClick={() => handleAllDeleteQuestionList(LocalId.users.user.id)}>
            삭제하기
          </DeleteButton>
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

                  return (
                    <FC.Wrapper key={question.id}>
                      {isMenuOpen && isSelected && (
                        <PopOverMenu
                          id={question?.id}
                          answerId={question?.answer?.id}
                          onChange={handleUpdateList}
                          onClose={handleMenuToggle}
                        />
                      )}

                      <FC.KebabButton
                        type="button"
                        alt="케밥버튼"
                        id={question?.id}
                        onClick={handleSelectPopOver}
                      />

                      <Layout.QuestionInfo question={question} />
                      <FC.AnswerContainer>
                        <Layout.AnswererImage answerer={answererProfile} />
                        <FC.AnswerWrapper>
                          <Layout.AnswererInfo question={question} answerer={answererProfile} />
                          <FC.AnswerContent>
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
                                  </FC.SubmittedAnswer>
                                ) : (
                                  <FC.AnswerRejected>답변 거절</FC.AnswerRejected>
                                )}
                              </>
                            ) : (
                              <>
                                <FC.UnansweredMark>미답변</FC.UnansweredMark>
                                <Reply onCreate={CreateReply} question={question} />
                              </>
                            )}
                          </FC.AnswerContent>
                        </FC.AnswerWrapper>
                      </FC.AnswerContainer>

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
