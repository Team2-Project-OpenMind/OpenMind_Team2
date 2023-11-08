import { Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import './reset.css';

import Layout from 'components/layout';
import LandingContainer from 'pages/landing';
import PostContainer from 'pages/post';
import ListContainer from 'pages/list';

import AnswerContainer from 'pages/answer';

import Header from 'components/Header';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<LandingContainer />}></Route>
          <Route path="list">
            <Route
              index
              element={
                <>
                  <Header />
                  <ListContainer />
                </>
              }
            ></Route>
          </Route>
          <Route path="post">
            <Route index element={<PostContainer />}></Route>
            <Route path=":id" element={<PostContainer />}></Route>
          </Route>
          <Route path="answer">
            <Route index element={<AnswerContainer />}></Route>
          </Route>
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
