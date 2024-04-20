import { styled } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import {
  Home,
  GroupIntro,
  Feed,
  GroupPage,
  CommentPage,
  Login,
  UploadPost,
  SignUp,
  NotFound,
  MyPage,
  OAuthPage,
  RouteChangeTracker,
  GroupCheck,
} from './AppBarral';
import { RecoilRoot } from 'recoil';

function App() {
  RouteChangeTracker();

  return (
    <MobileS>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/login'
            element={<OAuthPage component={<Login />} authenticated='block' />}
          />
          <Route
            path='/signUp'
            element={<OAuthPage component={<SignUp />} authenticated='block' />}
          />
          <Route
            path='/groupIntro/:mindId'
            element={<GroupCheck component={<GroupIntro />} sort='Intro' />}
          />
          <Route
            path='/groupPage/:mindId'
            element={<GroupCheck component={<GroupPage />} sort='Page' />}
          />
          <Route path='/groupPage/:mindId/:postId' element={<CommentPage />} />
          <Route
            path='/uploadPost/:mindId'
            // element={<GroupCheck component={<UploadPost />} sort='Upload' />}
            element={<UploadPost />}
          />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/myPage/:userId'
            element={<OAuthPage component={<MyPage />} authenticated='access' />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </RecoilRoot>
    </MobileS>
  );
}

export default App;

/** 2023-08-20 App.tsx 모바일 케이스 */
const MobileS = styled.div`
  display: flex;
  justify-content: center;
`;
