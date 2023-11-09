import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function LoginCheck() {
  const [cookies, setCookie] = useCookies(['id']);
  const [userID, setUserID] = useState(null);

  const getID = () => {
    // 페이지에 들어올때 쿠키로 사용자 체크
    setUserID(cookies?.id); // 쿠키에서 id 를 꺼내기
  };

  useEffect(() => {
    getID(); // 로그인 체크 함수
  });

  return userID ? userID : 131; // 131은 ID 못가져왔을때의 default id
}
