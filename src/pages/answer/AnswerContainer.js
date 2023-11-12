import { useState, useEffect } from 'react';

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

export default function Answer({ userId }) {
  const [questionList, setQuestionList] = useState([]);
  const [answererProfile, setAnswererProfile] = useState({});
  const [isOn, setIsOn] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

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
      const { results } = await getSubjectsOnQuestions(userId);
      console.log(results);
      setQuestionList(results);
    } catch (error) {
      console.log(error);
    }
    //리프레시 값을 트루 폴스로 관리
  };

  const handleMenuToggle = () => {
    setMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  const toggleSubmittedReply = () => setIsOn(!isOn);

  useEffect(() => {
    handleRenderSubjectsOnQ(userId);
    handleRenderSubjectProfile(userId);
  }, [userId]);
  console.log(questionList);

  return (
    <>
      <S.Wrapper>
        <S.Title>{answererProfile.name}</S.Title>
        <S.LinkContainer>
          <S.LinkIcon src={ShareIcon} alt="링크공유_아이콘"></S.LinkIcon>
          <S.LinkIcon src={KAKAO} alt="카카오링크_아이콘"></S.LinkIcon>
          <S.LinkIcon src={FACEBOOK} alt="페이스북링크_아이콘"></S.LinkIcon>
        </S.LinkContainer>

        <ButtonWrapper>
          <DeleteButton onClick={() => handleAllDeleteQuestionList(userId.users.user.id)}>
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
                  return (
                    <FC.Wrapper key={question.id}>
                      {isMenuOpen && (
                        <PopOverMenu
                          id={question?.id}
                          answerId={question?.answer?.id}
                          onChange={handleUpdateList}
                          onClose={handleMenuToggle}
                        />
                      )}

                      <FC.KebabButton alt="케밥버튼" onClick={handleMenuToggle} />

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
                                <FC.SubmittedAnswer $isDisplay={isOn}>
                                  {question.answer.content}
                                </FC.SubmittedAnswer>
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
      </S.Wrapper>
    </>
  );
}
