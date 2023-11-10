import { Routes, Route } from 'react-router-dom';
import { Cookies, CookiesProvider } from 'react-cookie';

import './reset.css';

import Layout from 'components/layout';
import LandingContainer from 'pages/landing';
import PostContainer from 'pages/post';
import ListContainer from 'pages/list';

import AnswerContainer from 'pages/answer';

import Header from 'components/Header';
const localId = window.localStorage.getItem('id');
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
                  <Header saveCookie={localId} />
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
