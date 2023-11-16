import { styled } from 'styled-components';
import { breakPoints } from '../../components/common/Media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 137px);
  padding: 3.5rem;

  background-color: ${(props) => props.theme.backgroundColor};
  background: ${(props) => props.theme.heroImage};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;

  @media screen and (${breakPoints.mobile}) {
    height: 100vh;
  }
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
  background-color: ${(props) => props.theme.elemBackgroundColor};

  border-radius: 0.8rem;
  border: 1px solid var(--brown40);

  font: var(--body3-regular);

  & img {
    margin-left: 0.8rem;
  }

  @media screen and (${breakPoints.mobile}) {
    display: none;
    padding: 0.8rem 1.2rem;
    font-size: 1.4rem;
  }
`;

export const MobileGoAskButton = styled(GoAskButton)`
  position: static;
  display: none;
  @media screen and (${breakPoints.mobile}) {
    width: 12.7rem;
    display: flex;
    position: static;
    margin: 4rem auto;
  }
`;

export const Logo = styled.img`
  width: 45.6rem;
  height: fit-content;
  margin-bottom: 2.4rem;

  content: ${(props) => props.theme.logoImage};
  @media screen and (${breakPoints.mobile}) {
    margin-top: 8rem;
    margin-bottom: 1rem;
    width: 24.8rem;
    padding: 0;
  }
`;

export const HeroImage = styled.div`
  width: 100%;
  max-width: 85vw;
  height: 100%;

  @media screen and (${breakPoints.mobile}) {
    max-width: 100vw;
  }
`;
