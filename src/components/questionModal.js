import styled from 'styled-components';
import { ReactComponent as MsgIcon } from 'assets/images/message.svg';
import closeIcon from 'assets/images/CloseButton.svg';
import modalProfile from 'assets/images/modal_profile.svg';

function QuestionModal() {
  return (
    <BG>
      <Wrapper>
        <TitleWrapper>
          <TitleContainer>
            <MessageIcon alt="메시지_아이콘" />
            <Title>질문을 작성하세요</Title>
          </TitleContainer>
          <CloseIcon src={closeIcon} alt="닫는_아이콘"></CloseIcon>
        </TitleWrapper>
        <ReceiverWrapper>
          To.
          <ReceiverProfileImg src={modalProfile} alt="프로필_이미지"></ReceiverProfileImg>
          아초는고양이
        </ReceiverWrapper>
        <TextArea placeholder="질문을 입력해주세요" />
        <FormButton>질문 보내기</FormButton>
      </Wrapper>
    </BG>
  );
}

export default QuestionModal;

const BG = styled.div`
  flex-shrink: 0;
  position: fixed;
  width: 1200px;
  height: 832px;
  background-color: rgba(0, 0, 0, 0.56);
`;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  padding: 40px 40px 70px;
  width: 612px;
  height: 454px;
  border: none;
  border-radius: 24px;
  background: var(--gray10);
  box-shadow: var(--shadow3pt);
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 43px;
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const MessageIcon = styled(MsgIcon)`
  width: 28px;
  height: 28px;
  & path {
    fill: var(--gray60);
  }
`;

const Title = styled.div`
  font-family: Actor;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 30px;
`;

const CloseIcon = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const ReceiverWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
  font-family: Pretendard;
`;

const ReceiverProfileImg = styled.img`
  width: 28px;
  height: 28px;
`;

const TextArea = styled.textarea`
  display: flex;
  margin-bottom: 8px;
  padding: 16px;
  max-width: 532px;
  height: 180px;
  border: none;
  border-radius: 8px;
  background: var(--gray20);
  font-family: Pretendard;
  resize: none;

  &::placeholder {
    color: var(--gray40);
  }

  &:focus {
    outline: none;
  }
`;

const FormButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  padding: 12px 24px;
  width: 100%;
  height: auto;
  border: none;
  border-radius: 8px;
  background: var(--brown30);
  color: var(--gray10);
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 400;
  line-height: 22px;
  cursor: pointer;
`;
