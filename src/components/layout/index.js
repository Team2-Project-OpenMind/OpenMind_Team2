import styled from 'styled-components';
import Banner from './Banner';
import ThemeToggleButton from 'components/ThemeToggleButton';
import { PagePath } from 'context/PathContext';
import { useEffect, useState } from 'react';
import { getSubject } from 'api/api.subjects';

export default function Layout({ children }) {
  const [isPath, setIsPath] = useState(false);
  const [selectUserId, setSelectUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userTitleData, setUserTitleData] = useState({
    title: '',
    imageSource: '',
    count: 0,
    createdAt: '',
  });

  const handleSubjectsRead = async (id) => {
    try {
      const userData = await getSubject(id);
      console.log(userData);
      setUserTitleData({
        ...userTitleData,
        title: userData.name,
        imageSource: userData.imageSource,
        count: userData.questionCount,
        createdAt: userData.createdAt,
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  useEffect(() => {
    if (selectUserId) {
      handleSubjectsRead(selectUserId);
    }
  }, [selectUserId]);

  return (
    <PagePath.Provider value={{ setIsPath, setSelectUserId, userTitleData }}>
      <Container>
        {isPath ? <Banner errorMessage={errorMessage} /> : null}
        <Body>{children}</Body>
        <ThemeToggleButton></ThemeToggleButton>
      </Container>
    </PagePath.Provider>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background: ${(props) => props.theme.backgroundColor};
`;

const Body = styled.section`
  flex-grow: 1;
`;
