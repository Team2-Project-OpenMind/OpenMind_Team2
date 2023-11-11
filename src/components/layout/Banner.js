import styled from 'styled-components';
import { breakPoints } from '../../components/common/Media';

import ProfileImage from 'assets/images/profile.svg';

export default function Banner() {
  return (
    <>
      <Wrapper>
        <Logo href="/"></Logo>
        <Profile src={ProfileImage} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 23.4rem;
  background-image: ${(props) => props.theme.bannerImage};
  background-repeat: no-repeat;
  background-position: top;
  background-color: ${(props) => props.theme.backgroundColor};

  @media screen and (${breakPoints.mobile}) {
    height: 17.7rem;
  }
`;

const Logo = styled.a`
  position: absolute;
  top: 5rem;

  width: 17rem;

  content: ${(props) => props.theme.logoImage};

  cursor: pointer;

  @media screen and (${breakPoints.mobile}) {
    width: 12.4rem;
    top: 4rem;
  }
`;

const Profile = styled.img`
  width: 13.6rem;
  position: absolute;
  top: 12.9rem;

  @media screen and (${breakPoints.mobile}) {
    width: 10.4rem;
    top: 10.1rem;
  }
`;
