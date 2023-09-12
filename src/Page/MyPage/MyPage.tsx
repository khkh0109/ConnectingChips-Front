import styled from 'styled-components';
import { Arrow_Left_B } from '../../Component/ArrowBarrel';
import 기본프로필 from '../../image/예시사진모음/default_profile_W_MyPage.png';
import infoIcon from '../../image/Icon/icon_Info.png';
import ArticleTab from '../../Component/ArticleTab';
import { CurrentMind, FinishedMind } from './MyPageMind';

// FIXME: 버려질 코드
import { myInfo, myGroupList } from '../../data/myInfo';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MyPage = () => {
  const tabText = [`참여중인 작심(${myGroupList.length}/3)`, '참여했던 작심'];
  const compArr = [<CurrentMind />, <FinishedMind />];
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <MyPageS>
      <MyPageHeader />
      <ProfileHeaderS>
        <h2>
          {myInfo.my_id}칩스’s
          <br />
          작심서랍
        </h2>
        <img src={기본프로필} alt='기본프로필' />
      </ProfileHeaderS>
      <LimitInfoS>
        <img src={infoIcon} alt='기본프로필' />
        {myGroupList.length === 3 && <p>최대 3개의 그룹까지 참여 가능합니다.</p>}
      </LimitInfoS>
      <ArticleTab tabText={tabText} compArr={compArr} />
      <MyPageSetS>
        <h2>설정</h2>
        <ul>
          <li onClick={() => setConfirmLogout(true)}>로그아웃</li>
        </ul>
      </MyPageSetS>

      {confirmLogout && <ConfirmLogoutModal setConfirmLogout={setConfirmLogout} />}
    </MyPageS>
  );
};

export default MyPage;

const goBack = (): void => {
  window.history.back();
};

const logOutFetch = (navigate: NavigateFunction) => {
  localStorage.clear();
  navigate(-1);
};

const MyPageHeader = (): JSX.Element => {
  return (
    <GroupBGHeaderS>
      <img src={Arrow_Left_B} onClick={goBack} alt='Arrow icon' />
      <h2>마이 페이지</h2>
    </GroupBGHeaderS>
  );
};

type ConfirmLogoutProps = { setConfirmLogout: React.Dispatch<React.SetStateAction<boolean>> };
const ConfirmLogoutModal = ({ setConfirmLogout }: ConfirmLogoutProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <AlertBGS onClick={() => setConfirmLogout(false)}>
      <AlertModalS onClick={(e) => e.stopPropagation()}>
        <h2>로그아웃하시겠습니까?</h2>
        <div>
          <button className='cancel' onClick={() => setConfirmLogout(false)}>
            취소
          </button>
          <button className='point' onClick={() => logOutFetch(navigate)}>
            로그아웃
          </button>
        </div>
      </AlertModalS>
    </AlertBGS>
  );
};

const MyPageS = styled.div`
  width: var(--width-mobile);
`;

const MyPageHeaderS = styled.header`
  cursor: pointer;
  position: sticky;
  top: 0;

  height: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const GroupBGHeaderS = styled(MyPageHeaderS)`
  z-index: 10;

  display: flex;
  justify-content: center;
  position: relative;

  img {
    position: absolute;
    left: 1.67rem;
  }

  h2 {
    font-size: 1.25rem;
  }
`;

const ProfileHeaderS = styled.div`
  height: 6.3125rem;

  display: flex;
  align-items: center;
  padding: 0 1rem;

  justify-content: space-between;

  background-color: var(--font-color1);
  color: #fff;
`;

const LimitInfoS = styled.div`
  background: #ffd32c;
  height: 2.0625rem;

  display: flex;
  align-items: center;

  padding: 0 1rem;
  gap: 0.25rem;
`;

const MyPageSetS = styled.div`
  margin: 1.75rem 1rem;

  ul {
    margin-top: 1.06rem;
    display: flex;
    flex-direction: column;
  }
  li {
    color: #000;
  }
`;

const AlertBGS = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const AlertModalS = styled.div`
  background: #fff;
  width: 18.5rem;
  height: 8.875rem;
  border-radius: 0.625rem;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  div {
    /* height: 2.5rem; */
    display: flex;

    button {
      width: 100%;
      font-size: 0.75rem;
      padding: 0.62rem 0;

      &.cancel {
        background-color: var(--color-bg);
      }

      &.point {
        background-color: var(--color-main);
      }
    }
  }

  h2 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
`;
