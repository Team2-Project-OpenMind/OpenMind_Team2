
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './reset.css';

import Layout from 'components/layout';
import LandingContainer from 'pages/landing';
import PostContainer from 'pages/post';
import ListContainer from 'pages/list';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/">
            <Route index element={<LandingContainer />}></Route>
            <Route path="list">
              <Route index element={<ListContainer />}></Route>
            </Route>
            <Route path="post">
              <Route index element={<PostContainer />}></Route>
            </Route>
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
