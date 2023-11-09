import { styled } from 'styled-components';
import { breakPoints } from '../../components/common/Media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

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

  @media screen and (${breakPoints.mobile}) {
    display: none;
  }
`;

export const MobileGoAskButton = styled(GoAskButton)`
  @media screen and (${breakPoints.mobile}) {
    display: flex;
    position: static;
    margin: 4rem auto;
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
  height: fit-content;
  margin-top: 16rem;
  margin-bottom: 2.4rem;
  @media screen and (${breakPoints.mobile}) {
    width: 100%;
    margin-top: 8rem;
    padding: 8rem 6.3rem 0;
  }
`;

export const HeroImage = styled.div`
  width: 100%;
  max-width: 85vw;
  height: 100%;

  background: url('/images/heroImage.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;

  @media screen and (${breakPoints.mobile}) {
    max-width: 100vw;
  }
`;
