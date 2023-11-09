import { useEffect } from 'react';
import { styled } from 'styled-components';
import CopyToClipboard from 'utils/CopyToClipboard';
import shareKakao from 'utils/KakaoSDK';
import ShareIcon from 'assets/images/ShareIcon.svg';
import KAKAO from 'assets/images/ShareIcon_KAKAO.svg';
import FACEBOOK from 'assets/images/ShareIcon_FACEBOOK.svg';

export default function SNSshare({ OnClickSNSshare }) {
  const shareLink = window.location?.href;

  const handleCopyLinkClick = () => {
    OnClickSNSshare(true);
    CopyToClipboard(shareLink);
    setTimeout(() => OnClickSNSshare(false), 3000);
  };

  const handleKakaoClick = () => {
    // TODO : 앱 도메인 등록 필요, 이미지 뭐 넣을지 정하기 + 이름 설명 넣기
    const KAKAO_SHARE_DATA = {
      title: '카카오 공유할 제목',
      description: '카카오 공유할 설명',
      imageUrl: 'https://codeit-frontend.codeit.com/static/images/brand/og_tag.png',
    };
    shareKakao({ url: shareLink, ...KAKAO_SHARE_DATA });
  };

  const handleFacebookClick = () => {
    window.open(`http://www.facebook.com/sharer.php?u=${shareLink}`);
  };

  useEffect(() => {
    window.Kakao?.cleanup();
    window.Kakao?.init('5f8e5519dced3a3814f9c8fba6e03966');
  }, []);

  return (
    <LinkContainer>
      <LinkIcon onClick={handleCopyLinkClick}>
        <img src={ShareIcon} alt="링크공유_아이콘" />
      </LinkIcon>
      <LinkIcon onClick={handleKakaoClick}>
        <img src={KAKAO} alt="카카오링크_아이콘" />
      </LinkIcon>
      <LinkIcon onClick={handleFacebookClick}>
        <img src={FACEBOOK} alt="페이스북링크_아이콘" />
      </LinkIcon>
    </LinkContainer>
  );
}

export const LinkContainer = styled.div`
  margin-top: 1.2rem;
  padding-bottom: 4.2rem;
  display: inline-flex;
  align-items: flex-start;
  gap: 1.2rem;
`;

export const LinkIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;

  background-color: transparent;
  border: none;
  & img {
    cursor: pointer;
  }
`;
