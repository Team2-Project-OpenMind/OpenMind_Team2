import styled from 'styled-components';
import { ReactComponent as profileIcon } from 'assets/images/profile.svg';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 3.2rem;
  flex-direction: column;
  gap: 3.2rem;
  border-radius: 1.6rem;
  background: var(--gray10);
  box-shadow: var(--shadow1pt);
`;

export const Tag = styled.span`
  width: 80px;
  padding: 0.4rem 1.2rem;
  font-size: 1.4rem;
  font: var(--caption1-regular);
  color: var(--brown40);
  text-align: center;
  border: 1px solid var(--brown-40, #542f1a);
  border-radius: 0.8rem;
  background: var(--grayscale-10, #fff);
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Info = styled.p`
  font: var(--caption1-regular);
  color: var(--gray40);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.8rem;
`;

export const Title = styled.h3`
  font: var(--body2-bold);
`;

export const Contents = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
`;

export const Profile = styled(profileIcon)`
  width: 4.8rem;
  height: 4.8rem;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const ContentInfo = styled.p`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const InfoTitle = styled.span`
  font: var(--body2-bold);
`;

export const InfoTimeDiff = styled.span`
  font: var(--caption1-regular);
  color: var(--gray40);
  font-size: 1.4rem;
`;

export const ContentDescription = styled.textarea`
  height: 15.4rem;
  font: var(--body3-regular);
  color: var(--gray60);
  line-height: 2.2rem;
  border: none;
  resize: none;

  &:focus {
    outline-style: none;
  }
`;
