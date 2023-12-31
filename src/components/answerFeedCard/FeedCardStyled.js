import styled from 'styled-components';
import { ReactComponent as Kebab } from 'assets/images/More.svg';
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-up.svg';
import { ReactComponent as DisLikeIcon } from 'assets/images/thumbs-down.svg';
import { breakPoints } from 'components/common/Media';
export const Wrapper = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 100%;
  padding: 3.2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.2rem;
  align-self: stretch;
  word-break: break-all;
  border-radius: 1.6rem;
  background: var(--gray10);
  box-shadow: var(--shadow1pt);
`;
export const Header = styled.div`
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

export const UnAnswerMark = styled.div`
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

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 32px;
  gap: 1rem;`

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

export const ContainerForAnswer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  width: 100%;
`;

export const Profile = styled.div`
  border-radius: 48px;
  background-image: ${({ $url }) => ($url ? `url(${$url})` : '')};
  background-size: cover;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  width: 4.8rem;
  height: 4.8rem;
  justify-content: center;
  align-items: center;
`;

export const WrapperForAnswer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  width: 100%;
`;

export const Answerer = styled.div`
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

export const ContentAboutAnswer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 0.8rem;
`;

export const AnswerRejected = styled.div`
  color: var(--red50);
  font-family: Pretendard;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.2rem;
`;

export const CardInput = styled.textarea`
  display: flex;
  padding: 1.6rem;
  height: 18.6rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.8rem;
  background: var(--gray20);
  color: var(--gray40);
  font: var(--body3-regular);
  line-height: 2.2rem;
  border: none;
  flex-wrap: nowrap;
  width: 100%;
  &:focus {
    outline: none;
  }
  resize: none;
`;

export const AnswerInput = styled(CardInput)`
  border: ${({ $isCompleted }) => (!$isCompleted ? '1px solid var(--brown40)' : 'none')};
`;

export const EditInput = styled(CardInput)`
  border: ${({ $isCompletedEdited }) =>
    !$isCompletedEdited ? '1px solid var(--brown40)' : 'none'};
`;

export const CardButton = styled.button`
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
`;

export const AnswerButton = styled(CardButton)`
  background: ${({ $isCompleted }) => ($isCompleted ? 'var(--brown40)' : 'var(--brown30)')};
`;

export const EditButton = styled(CardButton)`
  background: ${({ $isCompletedEdited }) =>
    $isCompletedEdited ? 'var(--brown40)' : 'var(--brown30)'};
`;
export const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.4rem;
  align-self: stretch;
`;

export const FooterLine = styled.div`
  height: 0.1rem;
  align-self: stretch;
  background: var(--gray30);
`;

export const ReactionMarkWrapper = styled.div`
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
  pointer-events: ${({ disabled }) => disabled === true && 'none'};
`;
export const EditorButton = styled.button`
  display: flex;
  width: 10.3rem;
  height: 3rem;
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

  @media (max-width: 600px) {
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
    top: 3.2rem;
    right: 7rem;
    margin: 0 auto;
  }
`;
export const SubmittedAnswer = styled.div`
  width: 100%;
  justify-content: flex-start;
  color: var(--gray60);
  font: var(--body3-regular);
  line-height: 2.2rem;
  display: ${({ $isDisplay }) => ($isDisplay ? 'block' : 'none')};
`;

export const DisplayTime = styled.span`
  color: var(--gray40);

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;
export const LikeText = styled.span`
  color: ${({ $isActive }) => ($isActive === true ? 'var(--blue50)' : 'var(--gray40)')};
  font: var(--caption1-regular);
`;

export const DislikeText = styled.span`
  color: ${({ $isActive }) => ($isActive === true ? 'var(--gray60)' : 'var(--gray40)')};
  font: var(--caption1-regular);
`;

export const IconLike = styled(LikeIcon)`
  & path {
    fill: ${({ $isActive }) => ($isActive === true ? 'var(--blue50)' : 'var(--gray40)')};
  }
`;

export const IconDisLike = styled(DisLikeIcon)`
  & path {
    fill: ${({ $isActive }) => ($isActive === true ? 'var(--gray60)' : 'var(--gray40)')};
  }
`;


export const VideoWrapper = styled.div`
  width: 100%;
  height: 400px;
  @media screen and (${breakPoints.mobile}) {
    height: 200px;
  }
`;