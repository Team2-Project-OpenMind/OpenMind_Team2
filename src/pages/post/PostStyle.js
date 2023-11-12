import styled from 'styled-components';
import { breakPoints } from 'components/common/Media';
import { ReactComponent as MessageIcon } from 'assets/images/message.svg';
import { ReactComponent as emptyIcon } from 'assets/images/emptyIcon.svg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  position: relative;
  height: 100%;
  padding-bottom: 13.6rem;
`;

export const Title = styled.h1`
  margin-top: 4.3rem;
  font-family: Actor;
  font-size: 3.2rem;
  font-weight: 400;
  line-height: 2.5rem;

  color: ${(props) => props.theme.textColor};
`;

export const LinkContainer = styled.div`
  margin-top: 1.2rem;
  padding-bottom: 4.2rem;
  display: inline-flex;
  align-items: flex-start;
  gap: 1.2rem;
`;

export const LinkIcon = styled.img`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`;

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  position: relative;
  width: 100%;
  max-width: 71.6rem;
  height: 100%;
  min-height: 33rem;
  /* height: ${($isEmpty) => ($isEmpty ? '330px' : '100%')}; */
  padding: 1.6rem;
  border-radius: 1.6rem;
  border: 1px solid var(--brown30);
  background: var(--brown10);

  @media screen and (${breakPoints.tablet}) {
    width: 70.4rem;
    max-width: none;
  }
  @media screen and (${breakPoints.mobile}) {
    width: 32.7rem;
    max-width: none;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 1.28rem;
`;

export const EmptyBoxImg = styled(emptyIcon)`
  position: absolute;
  top: 11.1rem;
  bottom: 6.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 15rem;
  height: 15rem;
`;

export const QuestionCount = styled.p`
  color: var(--brown40);
  font-family: Actor;
  font-size: 2rem;
  font-weight: 400;
`;

export const IconMessage = styled(MessageIcon)`
  width: 2.4rem;
  height: 2.4rem;

  & path {
    fill: var(--brown40);
  }
`;

export const CreateQuestionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 208px;
  height: 54px;
  padding: 12px 24px;
  border: none;
  border-radius: 200px;
  background: var(--brown40);
  box-shadow: var(--shadow2pt);
  color: var(--gray10);
  font-family: Actor;
  font-size: 2rem;
  font-weight: 400;
  line-height: 25px;
  cursor: pointer;
`;
