import styled from 'styled-components';
import { breakPoints } from 'components/common/media';
import { ReactComponent as MessageIcon } from 'assets/images/message.svg';
import { ReactComponent as emptyIcon } from 'assets/images/emptyIcon.svg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  height: 100%;
  padding: 0 15.125rem 2.6rem;
  padding-bottom: 8.5rem;
`;

export const Title = styled.h1`
  margin-top: 43px;
  font-family: Actor;
  font-size: 3.2rem;
  font-weight: 400;
  line-height: 25px;
`;

export const LinkContainer = styled.div`
  margin-top: 12px;
  padding-bottom: 2.625rem;
  display: inline-flex;
  align-items: flex-start;
  gap: 12px;
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
  gap: 1rem;
  position: relative;
  width: 100%;
  max-width: 716px;
  height: ${(isEmpty) => (isEmpty ? '330px' : '100%')};
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--brown30);
  background: var(--brown10);
  @media screen and (${breakPoints.tablet}) {
    width: 704px;
    max-width: none;
  }
  @media screen and (${breakPoints.mobile}) {
    width: 327px;
    max-width: none;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const EmptyBoxImg = styled(emptyIcon)`
  position: absolute;
  top: 111px;
  bottom: 65px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
`;

export const QuestionCount = styled.h2`
  color: #542f1a;
  font-family: Actor;
  font-size: 2rem;
  font-weight: 400;
  line-height: 25px;
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
  gap: 8px;
  flex-shrink: 0;
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
