import { styled } from 'styled-components';

export const Container = styled.div`
  background-color: var(--gray20);
`;

export const GoAskButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 5.7rem;
  right: 17.5rem;

  width: 16.6rem;
  padding: 1.2rem 2.4rem;

  color: var(--brown40);
  background-color: var(--brown10);

  border-radius: 0.8rem;
  border: 1px solid var(--brown40);

  font: var(--body3-regular);

  & img {
    margin-left: 0.8rem;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: url('/images/heroImage.svg');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
`;

export const Logo = styled.img`
  width: 45.6rem;
  height: 18rem;
  margin-top: 16rem;
  margin-bottom: 2.4rem;
`;

export const Form = styled.form`
  width: 40rem;
  height: fit-content;
  margin: 2.4rem 2.8rem;
  padding: 3.2rem;

  background-color: var(--gray10);

  border-radius: 1.6rem;
`;

export const Input = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;

  width: 100%;
  height: fit-content;
  padding: 1.2rem 1.6rem;
  margin-bottom: 1.6rem;

  color: var(--gray40);
  background-color: var(--gray10);

  font: var(--body3-regular);
  border: 1px solid var(--grayscale-40, #818181);
  border-radius: 8px;

  & img {
    width: 2rem;
    height: 2rem;
    margin-right: 0.4rem;
  }
  & input {
    border: none;
    outline: none;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: fit-content;
  padding: 1.2rem 2.4rem;

  color: var(--gray10);
  background-color: var(--brown40);

  font: var(--body3-regular);
  border-radius: 8px;
  border: none;
`;
