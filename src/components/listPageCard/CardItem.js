import * as style from './CardItemStyle';
import messageIcon from '../../assets/images/message.svg';

export default function CardItem() {
  return (
    <style.ListCard>
      <style.ProfileCard>
        <style.ProfileCardImg src="/images/profile.svg" alt="프로필 아이콘" />
        <style.ProfileCardName>아초는 고양이</style.ProfileCardName>
      </style.ProfileCard>
      <style.CardText>
        <style.CardMessageWrap>
          <style.CardMessageIcon src={messageIcon} alt="메세지아이콘" />
          <span>받은 질문</span>
        </style.CardMessageWrap>
        <div>9개</div>
      </style.CardText>
    </style.ListCard>
  );
}
