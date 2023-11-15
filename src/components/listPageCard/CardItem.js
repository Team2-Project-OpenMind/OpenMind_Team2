import * as S from './CardItemStyle';
import messageIcon from '../../assets/images/message.svg';

export default function CardItem({ friends }) {
  const { id, name, imageSource, questionCount } = friends;
  return (
    <S.ListCard key={id}>
      <S.ProfileCard>
        <S.ProfileCardImg src={imageSource} alt="프로필 아이콘" />
        <S.ProfileCardName>{name}</S.ProfileCardName>
      </S.ProfileCard>
      <S.CardText>
        <S.CardMessageWrap>
          <S.CardMessageIcon src={messageIcon} alt="메세지아이콘" />
          <span>받은 질문</span>
        </S.CardMessageWrap>
        <div>{questionCount}개</div>
      </S.CardText>
    </S.ListCard>
  );
}
