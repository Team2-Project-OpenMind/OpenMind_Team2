import { Routes, Route } from 'react-router-dom';

import './reset.css';

import Layout from 'components/layout';
import LandingContainer from 'pages/landing';
import PostContainer from 'pages/post';
import ListContainer from 'pages/list';

import AnswerContainer from 'pages/answer';

import Header from 'components/Header';
const localId = JSON.parse(window.localStorage.getItem('userAccounts'));
/* 위 객체 형태 userId.users.user */

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<LandingContainer saveCookie={localId} />}></Route>
          <Route path="list">
            <Route
              index
              element={
                <>
                  <Header localId={localId} />
                  <ListContainer />
                </>
              }
            ></Route>
          </Route>
          <Route path="post">
            <Route index element={<PostContainer />} />
            <Route path=":id" element={<PostContainer />} />
          </Route>
          <Route path={'post/:id/answer'} element={<AnswerContainer userId={localId} />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
