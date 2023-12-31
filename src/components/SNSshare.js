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
      title: 'Team2-OpenMind',
      description: '이 사람에게 궁금한걸 물어보세요!',
      imageUrl: 'https://codeit-frontend.codeit.com/static/images/brand/og_tag.png',
    };
    shareKakao({ url: shareLink, ...KAKAO_SHARE_DATA });
  };

  const handleFacebookClick = () => {
    window.open(`http://www.facebook.com/sharer.php?u=${shareLink}`);
  };

  useEffect(() => {
    window.Kakao?.cleanup();
    window.Kakao?.init(process.env.REACT_APP_KAKAOMESSAGE_API);
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
