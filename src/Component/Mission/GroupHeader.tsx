import { styled } from 'styled-components';
import { Arrow_Left_B, Arrow_Left_W } from '../ArrowBarrel';
import post_Icon from '../../image/Icon/post_Icon.svg';
import post_Icon_locked from '../../image/Icon/post_Icon_locked.svg';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getkeepJoin } from '../../API/Mind';

interface GroupHeaderProps {
  children?: React.ReactNode;
  className?: string;
  refresh?: number;
}

/** 2023-08-25 GroupHeader.tsx - 뒤로가기 핸들러 */
const goBack = (): void => {
  window.history.back();
};

/** 2023-08-25 GroupHeader.tsx - 그룹 페이지 헤더 */
const GroupHeader = ({ children, className, refresh }: GroupHeaderProps): JSX.Element => {
  const path = useLocation().pathname;
  const isUpload = path.indexOf('/upload') !== -1;
  const { mindId } = useParams();
  const [isDoneToday, setIsDoneToday] = useState<boolean>(false);
  const [keepJoin, setKeepJoin] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    getkeepJoin(Number(mindId)).then((data) => {
      setIsDoneToday(data.isDoneToday);
      setKeepJoin(data.keepJoin);
    });
  }, [refresh]);

  const goBack = (): void => {
    window.history.back();
  };

  return (
    <GroupBGHeaderS className={className}>
      <img src={Arrow_Left_B} onClick={goBack} alt='Arrow icon' />
      {isUpload ? (
        <div></div>
      ) : !(isDoneToday || keepJoin) ? (
        <Link to={`/uploadPost/${mindId}`}>
          <img src={post_Icon} alt='post icon' />
        </Link>
      ) : (
        <img src={post_Icon_locked} alt='post icon' />
      )}
      {children}
    </GroupBGHeaderS>
  );
};

/** 2023-08-22 GroupHeader.tsx - 그룹 인트로 뒤로가기 */
const GroupIntroHeader = (): JSX.Element => {
  return (
    <GroupHeaderS onClick={goBack}>
      <img src={Arrow_Left_W} alt='Arrow icon' />
    </GroupHeaderS>
  );
};

export { GroupHeader, GroupIntroHeader };

/** 2023-08-22 GroupHeader.tsx - 그룹 인트로 뒤로가기 */
const GroupHeaderS = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 100vw;
  top: 0;
  left: 0;
  box-sizing: border-box;
  height: var(--height-header);
  z-index: 20;
`;

/** 2023-08-22 GroupHeader.tsx - 그룹페이지 상단 고정 */
const GroupBGHeaderS = styled(GroupHeaderS)`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1rem;
  width: 100vw;
  top: 0;
  left: 0;
  box-sizing: border-box;
  height: var(--height-header);
  z-index: 20;
`;
