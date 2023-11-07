import styled from 'styled-components';
import { ReactComponent as MessageIcon } from 'assets/images/message.svg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  height: 100%;
  padding: 2.6rem 15.125rem;
  padding-bottom: 8.5rem;
`;

export const Title = styled.h1`
  font: var(--body1-bold);
`;

export const LinkContainer = styled.div`
  padding-bottom: 2.625rem;
`;

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--brown30);
  background: var(--brown10);
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const IconMessage = styled(MessageIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;
