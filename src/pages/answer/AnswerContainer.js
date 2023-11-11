import * as S from '../post/PostStyle';
import { useState, useEffect } from 'react';

import { getSubjectsOnQuestions, getSubject } from '../../api/api.subjects.js';
import { deleteQuestion, createAnswer } from '../../api/api.questions';
import { updateAnswersPartial } from '../../api/api.answers';

import ShareIcon from 'assets/images/ShareIcon.svg';
import KAKAO from 'assets/images/ShareIcon_KAKAO.svg';
import FACEBOOK from 'assets/images/ShareIcon_FACEBOOK.svg';
import FeedCard from 'components/answerFeedCard/FeedCard';
import { DeleteButton, ButtonWrapper } from './AnswerStyle.js';

export default function Answer({ userId }) {
  const [questionList, setQuestionList] = useState([]);
  const [answererProfile, setAnswererProfile] = useState({});

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
          <DeleteButton onClick={() => handleAllDeleteQuestionList(userId)}>삭제하기</DeleteButton>
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
              {questionList.map((question) => {
                return (
                  <FeedCard
                    key={question.id}
                    question={question}
                    answerer={answererProfile}
                    onCreate={CreateReply}
                    onPatch={PatchReply}
                    onChange={handleUpdateList}
                  />
                );
              })}
            </>
          )}
        </S.FeedContainer>
      </S.Wrapper>
    </>
  );
}
