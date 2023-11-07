import * as S from './CardItemStyle';
import messageIcon from '../../assets/images/message.svg';
import profileImg from '../../assets/images/profile.svg';

export default function CardItem() {
  return (
    <S.ListCard>
      <S.ProfileCard>
        <S.ProfileCardImg src={profileImg} alt="프로필 아이콘" />
        <S.ProfileCardName>아초는 고양이</S.ProfileCardName>
      </S.ProfileCard>
      <S.CardText>
        <S.CardMessageWrap>
          <S.CardMessageIcon src={messageIcon} alt="메세지아이콘" />
          <span>받은 질문</span>
        </S.CardMessageWrap>
        <div>9개</div>
      </S.CardText>
    </S.ListCard>
  );
}
