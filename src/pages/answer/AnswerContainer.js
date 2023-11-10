import * as S from '../post/PostStyle';

import { useState, useEffect } from 'react';
import ClipBoardCopyMessage from 'components/ClipBoardCopyMessage';
import FeedCard from 'components/answerFeedCard/FeedCard.js';
import { getSubjectsOnQuestions, getSubject } from '../../api/api.subjects.js';
import { deleteQuestion } from '../../api/api.questions';

import ShareIcon from 'assets/images/ShareIcon.svg';
import KAKAO from 'assets/images/ShareIcon_KAKAO.svg';
import FACEBOOK from 'assets/images/ShareIcon_FACEBOOK.svg';

export default function Answer({ userId }) {
  const [questionList, setQuestionList] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);
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

  const handleClickButton = () => {
    setOpenModal(!isOpenModal);
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

  useEffect(() => {
    handleRenderSubjectsOnQ(userId);
    handleRenderSubjectProfile(userId);
  }, [userId]);

  return (
    <>
      <S.Wrapper>
        <S.Title>{answererProfile.name}</S.Title>
        <S.LinkContainer>
          <S.LinkIcon src={ShareIcon} alt="링크공유_아이콘"></S.LinkIcon>
          <S.LinkIcon src={KAKAO} alt="카카오링크_아이콘"></S.LinkIcon>
          <S.LinkIcon src={FACEBOOK} alt="페이스북링크_아이콘"></S.LinkIcon>
        </S.LinkContainer>

        <S.ButtonWrapper>
          <S.DeleteButton onClick={() => handleAllDeleteQuestionList(userId)}>
            삭제하기
          </S.DeleteButton>
        </S.ButtonWrapper>
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
                  <FeedCard key={question.id} question={question} answerer={answererProfile} />
                );
              })}
            </>
          )}
        </S.FeedContainer>
      </S.Wrapper>
    </>
  );
}
