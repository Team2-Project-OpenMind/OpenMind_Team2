import * as S from '../post/PostStyle';
import { DeleteButton, ButtonWrapper } from './AnswerStyle.js';
import { useState, useEffect } from 'react';
import FeedCard from 'components/answerFeedCard/FeedCard.js';
import { getSubjectsOnQuestions, getSubject } from '../../api/api.subjects.js';
import { deleteQuestion } from '../../api/api.questions';

import ShareIcon from 'assets/images/ShareIcon.svg';
import KAKAO from 'assets/images/ShareIcon_KAKAO.svg';
import FACEBOOK from 'assets/images/ShareIcon_FACEBOOK.svg';

export default function Answer({ userId }) {
  const [questionList, setQuestionList] = useState([]);
  const [answererProfile, setAnswererProfile] = useState({});

  const handleRenderSubjectsOnQ = async (id) => {
    try {
      const { results } = await getSubjectsOnQuestions(id);
      console.log(results);
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

  const handleUpdateList = async () => {
    try {
      const { results } = await getSubjectsOnQuestions(userId.users.user.id);
      console.log(results);
      setQuestionList(results);
    } catch (error) {
      console.log(error);
    }
    //리프레시 값을 트루 폴스로 관리
  };

  useEffect(() => {
    handleRenderSubjectsOnQ(userId.users.user.id);
    handleRenderSubjectProfile(userId.users.user.id);
  }, [userId.users.user.id]);

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
              {questionList.map((question) => {
                return (
                  <FeedCard
                    key={question.id}
                    question={question}
                    answerer={answererProfile}
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
