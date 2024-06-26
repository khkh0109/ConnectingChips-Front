import { styled, useEffect, useState, useNavigate } from './HomeBarrel';
import { MyMisson, GroupList } from './HomeBarrel';
import type { GetUser, Mylist, isDone } from './HomeBarrel';
import {
  scrollTop,
  shareKakao,
  getUser,
  getMyList,
  getisDoneAll,
  initUser,
  initMyList,
} from './HomeBarrel';
import { Banner as BannerImage, Logo_002, Share_Icon } from './HomeImageBarrel';
import { GNB } from '../../AppBarral';
import React from 'react';

const { Kakao } = window;

/** 2023-08-20 Home.tsx - 메인 컴프 */
const Home = (): JSX.Element => {
  const [myInfo, setMyInfo] = useState<GetUser>(initUser);
  const [myList, setMyList] = useState<Mylist[]>(initMyList);
  const [istodayDone, setIsDone] = useState<boolean>(false);
  const isLogin = myInfo !== initUser;

  useEffect(() => {
    scrollTop();
    setHome(setMyInfo, setMyList, setIsDone);
  }, []);

  // 카카오 공유하기
  const KAKAO_KEY = process.env.REACT_APP_KAKAO_SHARE || '';

  Kakao.cleanup();
  if (!Kakao.isInitialized()) Kakao.init(KAKAO_KEY);

  const navigate = useNavigate();

  const profileClick = (): void | Promise<void> => {
    if (isLogin)
      return getUser()
        .then(() => navigate(`/myPage/${myInfo.userId}`))
        .catch(() => navigate('/login'));
    return navigate('/LogIn');
  };
  const WelcomeProps: WelcomeProps = { myInfo, istodayDone, myList };

  return (
    <HomeS>
      <HomeHeaderS>
        <img src={Logo_002} alt='logo' className='Logo' />
        <UserInfoS>
          <img className='share' src={Share_Icon} alt='share' onClick={() => shareKakao()} />
          <div className='profile' onClick={profileClick}>
            <img src={myInfo.profileImage} alt='기본 프로필' />
            <p>MY</p>
          </div>
        </UserInfoS>
      </HomeHeaderS>
      <HomeContentS>
        <WelComeHead WelcomeProps={WelcomeProps} />
        {myList.length !== 0 && isLogin && <MyMisson myList={myList} />}
        <Banner />
        <GroupList />
      </HomeContentS>

      {/* <div className="CTA">
        <GNB />
      </div> */}
    </HomeS>
  );
};

export default Home;

/** 2023-08-20 Home.tsx - 메인 컴프 스타일 */
const HomeS = styled.section`
  width: 100%;
  max-width: var(--width-max);
  min-width: 20rem;
  margin: 0 auto;

  .CTA {
    position: sticky;
    bottom: 0;
  }
`;

type WelcomeProps = {
  myInfo: GetUser;
  istodayDone: boolean;
  myList: Mylist[];
};

const setHome = async (
  setMyInfo: React.Dispatch<React.SetStateAction<GetUser>>,
  setMyList: React.Dispatch<React.SetStateAction<Mylist[]>>,
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  const isLogin = localStorage.getItem('access_token') || '';

  if (isLogin !== '') {
    await getUser()
      .then((userInfo: GetUser) => setMyInfo(userInfo))
      .catch(() => {});
    await getMyList()
      .then((list: Mylist[]) => {
        list.map((list) => {
          if (list.count > 3) list.count = 3;
          if (list.count < 0) list.count = 0;
        });
        setMyList(list);
      })
      .catch(() => {});
    await getisDoneAll()
      .then((isDone: isDone[]) => {
        const doneValid = isDone.some((data) => data.isDoneToday);
        setIsDone(doneValid);
      })
      .catch(() => {});
  } else {
    setMyInfo(initUser);
    setMyList(initMyList);
  }
};

const WelComeHead = ({ WelcomeProps }: { WelcomeProps: WelcomeProps }): JSX.Element => {
  const { myInfo, istodayDone, myList } = WelcomeProps;

  const isLogin = myInfo !== initUser;
  const nickName: string = myInfo.nickname;

  return (
    <WelcomeHeadS>
      <WelcomeTextS>
        {isLogin && istodayDone ? (
          <h1>
            멋져요 {nickName}칩스! <br />
            작지만 확실한
            <br />
            성공 적립 완료!
          </h1>
        ) : isLogin && myList.length === 0 ? (
          <h1>
            반가워요 {nickName}칩스! <br />
            아래 리스트에서
            <br />
            미션을 골라보세요 😊
          </h1>
        ) : isLogin ? (
          <h1>
            반가워요 {nickName}칩스! <br />
            오늘도 함께 작심을
            <br /> 성공해볼까요?
          </h1>
        ) : (
          <h1>
            <p className='bold'>딱 3일!</p>
            재미있게
            <br /> 운동하자!
          </h1>
        )}
      </WelcomeTextS>
      {!isLogin && (
        <img
          src={`${process.env.PUBLIC_URL}/assets/oneChip.png`}
          alt='원칩이'
          className='noLogin'
        />
      )}
    </WelcomeHeadS>
  );
};

/** 2023-08-20 Home.tsx - 홈화면 헤더 */
const HomeHeaderS = styled.header`
  z-index: 10;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--font-color1);
  padding: 1rem;
  width: 100vw;
  top: 0;
  left: 0;

  box-sizing: border-box;
  height: var(--height-header);

  .Logo {
    height: 1.3125rem;
  }
`;

const UserInfoS = styled.div`
  display: flex;
  align-items: center;

  .share {
    margin-right: 0.75rem;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 0.38rem;

    img {
      width: 1.75rem;
    }
  }

  p {
    font-size: 0.8125rem;
    margin-left: 0.37rem;
    color: white;
  }
`;

/** 2023-09-02 Home.tsx - 인사말과 캐릭터 - Kadesti */
const WelcomeHeadS = styled.div`
  margin: 0 1rem;
  display: flex;
  justify-content: space-between;
  margin-top: var(--height-header);
  padding: 1.25rem 0;
  height: 7.8125rem;
  gap: 0.63rem;

  img.noLogin {
    margin-right: 1.25rem;
    object-fit: contain;
    width: 9.75rem;
  }
`;

/** 2023-08-20 Home.tsx - 오늘도 득근한 하루 되세요 */
const WelcomeTextS = styled.div`
  h1 {
    display: block;
    word-break: keep-all;

    p.bold {
      font-weight: 700;
      font-size: 1.75rem;
    }
  }
`;

/** 2023-08-22 Home.tsx - 설문조사 배너 */
const Banner = (): JSX.Element => {
  return (
    <BannerS
      href={
        'https://docs.google.com/forms/d/e/1FAIpQLSfUEWLC19oM9kPgzitmki705aZxY8Wn5jkH1YtkMObi-1FHIg/viewform'
      }
      target='_blank'
    >
      <div className='bannerText'>
        <h2>칩스님의 의견을 들려주세요!</h2>
        <p>작심삼칩을 부탁해</p>
      </div>
      <img src={BannerImage} alt='bannerImage' />
    </BannerS>
  );
};

/** 2023-08-22 Home.tsx - 설문조사 배너 */
const BannerS = styled.a`
  display: flex;
  position: relative;
  height: 5.5rem;
  background-color: var(--color-line);

  padding: 1rem;
  margin: 0 1rem 1.25em 1rem;
  border-radius: 0.63rem;

  .bannerText {
    width: 7.9375rem;

    p {
      font-size: 0.8125rem;
      margin-top: 0.25rem;
      color: var(--font-color2);
    }
  }
  img {
    width: 10.5625rem;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

/** 2023-08-20 Home.tsx - WelcomeTextS, MyMisson, CurrentMission 컨테이너 */
const HomeContentS = styled.div`
  margin-bottom: 5rem;
  margin-top: var(--height-header);
`;
