import * as S from './FeedCardStyled';
import { timeForToday } from '../../date';
export function FeedCardLayout({ Children }) {
  console.log(Children);
  return (
    <S.FcContainer>
      <S.FcAnswerContent>{Children}</S.FcAnswerContent>

      <S.FcFooter>
        <S.FcFooterLine />
      </S.FcFooter>
    </S.FcContainer>
  );
}

export function FeedCardInfo({ answerer, question }) {
  <>
    <S.FcQuestionWrapper>
      <S.QuestionDate>
        질문
        <S.DisplayTime>{timeForToday(question.createdAt)}</S.DisplayTime>
      </S.QuestionDate>
      <S.QuestionContent>{question.content}</S.QuestionContent>
    </S.FcQuestionWrapper>
    <S.FcProfileWrapper>
      <S.FcProfile $url={answerer.imageSource} alt="프로필" />
    </S.FcProfileWrapper>

    <S.FcAnswerer>
      {answerer?.name}
      {question?.answer ? (
        <S.DisplayTime>{timeForToday(question.answer?.createdAt)}</S.DisplayTime>
      ) : null}
    </S.FcAnswerer>
  </>;
}
