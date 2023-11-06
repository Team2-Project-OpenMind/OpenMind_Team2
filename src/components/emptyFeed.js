import styled from 'styled-components';
import { ReactComponent as MsgIcon } from 'assets/images/message.svg';
import emptyIcon from 'assets/images/emptyIcon.svg';

function EmptyFeed() {
  return (
    <Container>
      <TitleWrapper>
        <Icon alt="메시지_아이콘" />
        <Title>아직 질문이 없습니다</Title>
      </TitleWrapper>
      <EmptyBoxImg src={emptyIcon} alt="빈_상자_아이콘" />
    </Container>
  );
}

export default EmptyFeed;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  width: 716px;
  height: 330px;
  margin: 0 auto;
  padding: 16px 24px;
  border: 1px solid var(--brown20);
  border-radius: 16px;
  background-color: var(--brown10);
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Icon = styled(MsgIcon)`
  width: 24px;
  height: 24px;

  & path {
    fill: var(--brown40);
  }
`;

const Title = styled.h2`
  color: #542f1a;
  font-family: Actor;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 25px;
`;

const EmptyBoxImg = styled.img`
  position: absolute;
  top: 111px;
  left: 283px;
  width: 150px;
  height: 150px;
`;
