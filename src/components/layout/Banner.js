import styled from 'styled-components';
import { breakPoints } from '../../components/common/Media';
import { useContext } from 'react';
import { PagePath } from 'context/PathContext';

export default function Banner({ errorMessage }) {
  const { userTitleData } = useContext(PagePath);
  if (!userTitleData) return;
  const { imageSource } = userTitleData;

  return (
    <>
      <Wrapper>
        <Logo href="/"></Logo>
        {!errorMessage ? (
          <Profile src={imageSource} />
        ) : (
          <div style={{ marginTop: '180px', fontSize: '20px' }}>{errorMessage}</div>
        )}
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
  transition: height 300ms linear;

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
  border-radius: 50%;
  transition: all 300ms linear;

  @media screen and (${breakPoints.mobile}) {
    width: 10.4rem;
    top: 10.1rem;
  }
`;
