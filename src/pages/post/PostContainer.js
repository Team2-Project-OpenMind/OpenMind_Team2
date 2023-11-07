import * as S from './PostStyle';
import FeedCard from 'components/answerFeedCard/FeedCard.js';
import { getSubjectsOnQuestions } from '../../api/api.subjects.js';
import { useState, useEffect } from 'react';

export default function Post() {
  const [questionList, setQusetionList] = useState([]);

  const handleRenderSubjectsOnQ = async (id) => {
    try {
      const { results } = await getSubjectsOnQuestions(id);

      setQusetionList(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRenderSubjectsOnQ(81);
  }, []);

  return (
    <S.Wrapper>
      <S.Title>아초는 고양이</S.Title>
      <S.LinkContainer>
        <span>링크공유</span>
        <span>카카오링크</span>
        <span>페이스북링크</span>
      </S.LinkContainer>
      <S.FeedContainer>
        <S.Info>
          <S.IconMessage />
          <span>개의 질문이 있습니다</span>
        </S.Info>
        <div>
          {questionList.map((question) => {
            return <FeedCard key={question.id} {...question} />;
          })}
        </div>
      </S.FeedContainer>
    </S.Wrapper>
  );
}
