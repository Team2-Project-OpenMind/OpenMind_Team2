import styled from 'styled-components';

function ClipBoardCopyMessage() {
  return (
    <Wrapper>
      <Message>URL이 복사되었습니다</Message>
    </Wrapper>
  );
}

export default ClipBoardCopyMessage;

const Wrapper = styled.div`
  display: inline-flex;
  padding: 12px 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  transform: translateX(-50%);
  bottom: 60px;
  left: 50%;
  border: none;
  border-radius: 8px;
  background-color: var(--gray60);
  box-shadow: var(--shadow2pt);
`;

const Message = styled.div`
  color: var(--gray10);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 18px;
`;
