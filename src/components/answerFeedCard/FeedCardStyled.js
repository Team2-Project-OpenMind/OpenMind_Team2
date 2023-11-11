import styled from 'styled-components';
import { ReactComponent as Kebab } from 'assets/images/More.svg';

export const FcContainer = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 62rem;

  padding: 3.2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.2rem;
  align-self: stretch;
  border-radius: 1.6rem;
  background: var(--gray10);
  box-shadow: var(--shadow1pt);
`;
export const FcHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const AnswerMark = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  display: flex;
  padding: 0.4rem 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.8rem;
  border: 1px solid var(--brown40);
  background: var(--gray10);
  color: var(--brown40);
  font-family: Pretendard;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.8rem;
`;

export const UnansweredMark = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  display: flex;
  padding: 0.4rem 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.8rem;
  border: 1px solid var(--gray40);
  background: var(--gray10);
  font-family: Pretendard;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.8rem;
`;

export const KebabButton = styled(Kebab)`
  width: 26px;
  height: 26px;
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 32px;
`;

export const FcQuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 32px;
  gap: 1rem;
  flex: 1 0 0;
  height: 4.6rem;
`;

export const QuestionDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 32px;
  color: var(--grayscale-40, #818181);
  font: var(--caption1-medium);
  line-height: 1.8rem;
`;

export const QuestionContent = styled.div`
  color: var(--grayscale-60, #000);
  font-family: Actor;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 40rem;
  line-height: 2.4rem;
  align-self: stretch;
`;

export const FcAnswerContainer = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  align-self: stretch;
`;

export const FcProfile = styled.div`
  border-radius: 48px;
  background-image: ${({ $url }) => ($url ? `url(${$url})` : '')};
  width: 48px;
  height: 48px;
  flex-shrink: 0;
`;

export const FcProfileWrapper = styled.div`
  display: flex;
  width: 4.8rem;
  height: 4.8rem;
  justify-content: center;
  align-items: center;
`;

export const FcAnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  flex: 1 0 0;
`;

export const FcAnswerer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--gray60);
  font-family: Actor;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 2.4rem;
`;

export const FcAnswerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  align-self: stretch;
`;

export const FcAnswerInput = styled.textarea`
  display: flex;
  height: 18.6rem;
  padding: 1.6rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
  border-radius: 0.8rem;
  background: var(--gray20);
  color: var(--gray40);
  font: var(--body3-regular);
  line-height: 2.2rem;
  border: none;
  &:focus {
    outline: none;
  }
  resize: none;

  border: ${({ $isCompleted }) => (!$isCompleted ? '1px solid var(--brown40)' : 'none')};

  border: ${({ $isCompletedEdited }) =>
    !$isCompletedEdited ? '1px solid var(--brown40)' : 'none'};

  display: ${({ $editAnswer }) => ($editAnswer ? 'none' : 'flex')};
`;

export const FcAnswerButton = styled.button`
  display: flex;
  height: 4.6rem;
  padding: 1.2rem 2.4rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
  border-radius: 0.8rem;

  color: var(--gray10);
  font: var(--body3-regular);
  line-height: 2.2rem;
  border: none;
  background: ${({ $isCompleted }) => ($isCompleted ? 'var(--brown40)' : 'var(--brown30)')};
  display: ${({ $editAnswer }) => ($editAnswer ? 'none' : 'flex')};

  background: ${({ $isCompletedEdited }) =>
    $isCompletedEdited ? 'var(--brown40)' : 'var(--brown30)'};
`;

export const FcFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.4rem;
  align-self: stretch;
`;

export const FcFooterLine = styled.div`
  height: 0.1rem;
  align-self: stretch;
  background: var(--gray30);
`;

export const FcReactionMarkWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3.2rem;
`;

export const Reaction = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.8rem;
  color: ${({ $liked }) => ($liked ? 'var( --blue50)' : 'var(--gray40)')};
  color: ${({ $disliked }) => ($disliked ? 'var(--gray60)' : '')};
`;
export const EditorButton = styled.button`
  display: flex;
  padding: 0.6rem 1.6rem;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  align-self: stretch;
  border-radius: 0.8rem;
  border: 1px solid var(--gray30);
  background: var(--gray10);
  box-shadow: var(--shadow1pt);
  position: absolute;
  bottom: 2.8rem;
  right: 3.2rem;
  color: var(--gray50);
  font: var(--caption1-medium);
  display: ${({ $isUpdate }) => ($isUpdate ? 'none' : 'block')};
  display: ${({ $editAnswer }) => {
    if ($editAnswer === true) {
      return 'block';
    }
  }};
`;
export const SubmittedAnswer = styled.div`
  display: flex;
  justify-content: flex-start;
  color: var(--gray60);
  font: var(--body3-regular);
  line-height: 2.2rem;
  display: ${({ $isUpdate }) => ($isUpdate ? 'none' : 'block')};
  flex-wrap: nowrap;
`;

export const DisplayTime = styled.span`
  color: var(--gray40);

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;
