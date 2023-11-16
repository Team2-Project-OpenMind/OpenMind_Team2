import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { createQuestions, getSubject } from 'api/api.subjects';
import { ReactComponent as MsgIcon } from 'assets/images/message.svg';
import closeIcon from 'assets/images/CloseButton.svg';

function QuestionModal({ id, onClose }) {
  const [textValue, setTextValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const USER_ID = id;
  const questionsData = {
    content: textValue,
  };

  const handleLoadSubject = async (id) => {
    try {
      const res = await getSubject(id);
      const { name, imageSource } = res;
      setName(name);
      setProfileImage(imageSource);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleTextChange = (e) => {
    const nextValue = e.target.value;
    setTextValue(nextValue);
  };

  const handleSubmit = async () => {
    let result;
    try {
      setIsLoading(true);
      const ss = await createQuestions(USER_ID, questionsData);
      console.log(ss)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setTextValue('');
    onClose();
  };

  useEffect(() => {
    handleLoadSubject(id);
  }, []);

  return (
    <BG onClick={handleModalClose}>
      <Container onSubmit={handleSubmit}>
        <TitleWrapper>
          <TitleContainer>
            <MessageIcon alt="메시지_아이콘" />
            <Title>질문을 작성하세요</Title>
          </TitleContainer>
          <CloseIcon src={closeIcon} alt="닫는_아이콘" onClick={handleModalClose}></CloseIcon>
        </TitleWrapper>
        <ReceiverWrapper>
          <To>To.</To>
          <ReceiverProfileImg src={profileImage} alt="프로필_이미지"></ReceiverProfileImg>
          {name}
        </ReceiverWrapper>
        <TextArea placeholder="질문을 입력해주세요" value={textValue} onChange={handleTextChange} />
        <FormButton disabled={isLoading}>질문 보내기</FormButton>
      </Container>
    </BG>
  );
}

export default QuestionModal;

const BG = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.56);
  z-index: 1;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
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
  font-size: 2.4rem;
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
  font-size: 1.6rem;
`;

const To = styled.span`
  font-family: Actor;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.4rem;
`;

const ReceiverProfileImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
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
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.2rem;
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
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 22px;
  cursor: pointer;
`;
