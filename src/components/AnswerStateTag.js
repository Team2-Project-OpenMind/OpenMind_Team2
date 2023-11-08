import styled from 'styled-components';

export default function AnswerStateTag({ state }) {
  const text = state ? '답변 완료' : '미답변';

  return <Tag $stateColor={state}>{text}</Tag>;
}

export const Tag = styled.span`
  width: ${({ $stateColor }) => ($stateColor ? '8rem' : '6.5rem')};
  padding: 0.4rem 1.2rem;
  font-size: 1.4rem;
  font: var(--caption1-regular);
  color: ${({ $stateColor }) => ($stateColor ? 'var(--brown40)' : 'var(--gray40)')};
  text-align: center;
  border: 1px solid ${({ $stateColor }) => ($stateColor ? 'var(--brown40)' : 'var(--gray40)')};
  border-radius: 0.8rem;
  background: var(--grayscale-10, #fff);
`;
