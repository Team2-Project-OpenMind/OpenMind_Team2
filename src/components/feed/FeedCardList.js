import * as S from './FeedCardStyle';
import FeedCardItem from './FeedCardItem';

export default function FeedCardList({ questionData, userTitleData }) {
  return (
    <>
      {questionData?.map((question) => (
        <S.FeedContainer key={question.id}>
          <FeedCardItem questionData={question} userTitleData={userTitleData} />
        </S.FeedContainer>
      ))}
    </>
  );
}
