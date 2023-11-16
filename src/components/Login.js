import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createSubject } from 'api/api.subjects';
import personImg from '../assets/images/Person.svg';
import { useRef, useState } from 'react';

const userAccounts = { user: [] };

export default function LogIn() {
  const [accountState, setAccountState] = useState({ users: userAccounts });
  const [isEmpty, setIsEmpty] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();

  const handleLogInFormSubmit = async (e) => {
    e.preventDefault();

    const userName = formRef.current.username.value;
    if (!userName) {
      setIsEmpty(true);
      setTimeout(() => {
        setIsEmpty(false);
      }, 3000);
      return;
    }

    console.log(userName);
    const data = await createSubject({ name: userName });
    console.log(data);
    const dataObject = { id: data?.id, name: data?.name };

    if (!window.localStorage.getItem('userAccounts')) {
      userAccounts.user.push(dataObject);
      setAccountState({ ...accountState, users: userAccounts });
      console.log(accountState);
      /* 값을 object object로 저장되기 때문에 JSON.stringify 감싸줘야함 */
      window.localStorage.setItem('userAccounts', JSON.stringify(accountState));
    } else {
      /* 로컬에 저장된 객체를 읽기위해서 JSON.parse을 감싸줘야함 */
      const alreadyHaveAccount = JSON.parse(window.localStorage.getItem('userAccounts'));
      alreadyHaveAccount.users.user.push(dataObject);
      window.localStorage.setItem('userAccounts', JSON.stringify(alreadyHaveAccount));
    }
    navigate(`/post/${data?.id}`);
  };

  return (
    <Form ref={formRef} onSubmit={handleLogInFormSubmit}>
      <Input>
        <img src={personImg} alt="" />
        <input name="username" type="text" placeholder="이름을 입력하세요"></input>
      </Input>
      {isEmpty && <EmptyMsg>이름을 입력해주세요</EmptyMsg>}
      <Button type="submit">질문받기</Button>
    </Form>
  );
}

const Form = styled.form`
width: 100%;
  max-width: 40rem;
  height: fit-content;
  margin: 2.4rem 2.8rem;
  padding: 3.2rem;

  background-color: var(--gray10);

  border-radius: 1.6rem;
  @media screen and (${breakPoints.mobile}) {
  margin: 0 3.5rem;
  }
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;

  width: 100%;
  height: fit-content;
  margin-bottom: 1.6rem;
  padding: 1.2rem 1.6rem;

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

const Button = styled.button`
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

const EmptyMsg = styled.div`
  margin-left: 1rem;
  margin-bottom: 1.5rem;
  color: var(--red50);
  font: var(--body3-regular);
`;
