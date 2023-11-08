import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--gray20);
`;

export const GoAskButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 5.7rem;
  right: 17.5rem;

  width: 16.6rem;
  padding: 1.2rem 2.4rem;

  color: var(--brown40);
  background-color: var(--brown10);

  border-radius: 0.8rem;
  border: 1px solid var(--brown40);

  font: var(--body3-regular);

  & img {
    margin-left: 0.8rem;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;

  background: url('/images/heroImage.svg');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
`;

export const Logo = styled.img`
  width: 45.6rem;
  height: 18rem;
  margin-top: 16rem;
  margin-bottom: 2.4rem;
`;

export const HeroImage = styled.div`
  width: 100%;
  height: 41rem;
  background: url('/images/heroImage.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
`;
