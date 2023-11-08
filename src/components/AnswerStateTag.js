import styled from 'styled-components';

export default function AnswerStateTag({ state }) {
  const text = state ? '답변 완료' : '미답변';

  return <Tag state={state}>{text}</Tag>;
}

export const Tag = styled.span`
  width: ${({ $state }) => ($state ? '8rem' : '6.5rem')};
  padding: 0.4rem 1.2rem;
  font-size: 1.4rem;
  font: var(--caption1-regular);
  color: var(--brown40);
  color: ${({ state }) => (state ? 'var(--brown40)' : 'var(--gray40);')};
  text-align: center;
  border: 1px solid var(--brown-40, #542f1a);
  border-radius: 0.8rem;
  background: var(--grayscale-10, #fff);
`;
