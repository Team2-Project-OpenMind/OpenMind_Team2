import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { createSubject } from 'api/api.subjects';
import personImg from '../assets/images/Person.svg';
import { useRef } from 'react';

export default function LogIn() {
  const formRef = useRef();
  /* const [cookies, setCookies] = useCookies(['id']); */
  const navigate = useNavigate();

  const handleLogInFormSubmit = async (e) => {
    e.preventDefault();
    if (!window.localStorage.getItem('id')) {
      // TODO
      // 1. getAllSubjects로 유저 이름 유효성 검사 getAllSubjects
      // 2. 존재한다면 id 리턴
      // 3. 존재하지 않는다면 createSubject
      const userName = formRef.current.username.value;
      console.log(userName);
      const data = await createSubject({ name: userName });
      console.log(data);
      window.localStorage.setItem('id', data?.id);
      navigate(`/post/${data?.id}/answer`);
    } else {
      alert('이미 가입하셨습니다.');
      navigate('/list');
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleLogInFormSubmit}>
      <Input>
        <img src={personImg} alt="" />
        <input name="username" type="text" placeholder="이름을 입력하세요"></input>
      </Input>
      <Button type="submit">질문받기</Button>
    </Form>
  );
}

const Form = styled.form`
  width: 40rem;
  height: fit-content;
  margin: 2.4rem 2.8rem;
  padding: 3.2rem;

  background-color: var(--gray10);

  border-radius: 1.6rem;
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
