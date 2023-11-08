import * as S from './FeedCardStyle';
import FeedCardItem from './FeedCardItem';

export default function FeedCardList({ questionData }) {
  // console.log(questionData);

  return (
    <>
      {questionData?.map((question) => (
        <S.FeedContainer key={question.id}>
          <FeedCardItem questionData={question} />
        </S.FeedContainer>
      ))}
    </>
  );
}
