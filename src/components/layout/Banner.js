import styled from 'styled-components';

import BannerImage from 'assets/banner.svg';
import ProfileImage from 'assets/images/profile.svg';

export default function Banner() {
  return (
    <>
      <Wrapper image={BannerImage}>
        <Profile src={ProfileImage} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 234px;
  background: no-repeat url(${(props) => props.image});
  background-position: top;
`;

const Profile = styled.img`
  position: relative;
  top: 129px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 8.5rem;
`;
