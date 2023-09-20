import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

// TODO: 갈아끼울 코드
// import { CommonProps } from '../../../Type/MissionType';

// FIXME: 사라져야할 코드
import { ButtonListProps } from '../../../Type/MissionType';
import ImageBoxS from '../../../StyleComp/ImageBoxS';

import { MyListContext, useContext } from '../HomeBarrel';
import useMission from '../../../Hooks/useCarresel';
import { getCheckedJoined, putReJoin } from '../../../API/joinedMinds';

/** 2023-09-02 ButtonList.tsx - 캐러셀 버튼 영역 - Kadesti */
//TODO: 갈아끼울 코드
// const ButtonList = ({ buttonListProps }: { buttonListProps: CommonProps }): JSX.Element => {
//   const { slideRef, count, sort, TOTAL_SLIDES } = buttonListProps;
//   const [myList, setMyList] = useState(initMyList.data);

//   useEffect(() => {
//     fetchMyList(setMyList);
//   }, []);

//   return (
//     <ImageBoxS ref={slideRef} count={count} sort={sort} length={TOTAL_SLIDES}>
//       {myList.map((mind) => {
//         const { count, isDoneToday, id } = mind;
//         return <CarreselBtnList myCount={count} completedToday={isDoneToday} uuid={id} key={id} />;
//       })}
//     </ImageBoxS>
//   );
// };

// FIXME: 사라질 코드
const ButtonList = ({ buttonListProps }: { buttonListProps: ButtonListProps }): JSX.Element => {
  const { slideRef, count, sort, TOTAL_SLIDES, doneList, uuidList, countList } = buttonListProps;
  return (
    <ImageBoxS ref={slideRef} count={count} sort={sort} length={myList.length}>
      {myList.map((mind,idx) => {
        const { count, isDoneToday, mindId } = mind;
        return (
          <CarreselBtnList myCount={count} completedToday={isDoneToday} mindId={mindId} key={idx} />
        );
      })}
    </ImageBoxS>
  );
};
export default ButtonList;

/** 2023-08-22 ButtonList.tsx - 캐러셀 버튼 영역 - Kadesti */
const CarreselBtnList = ({
  myCount,
  completedToday,
  mindId,
}: {
  myCount: number;
  completedToday: boolean;
  mindId: number;
}) => {
  const navigate = useNavigate();
  const remind = async () => putReJoin(mindId);

  return (
    <>
      {myCount === 3 ? (
        <ClearBtnS onClick={remind}>재작심 하기</ClearBtnS>
      ) : completedToday ? (
        <TodayClearBtnS>
          <p>오늘 작심 성공!</p>
        </TodayClearBtnS>
      ) : (
        <NoneClearBtnS
          onClick={() => {
            goPost(mindId)
              .then(() => navigate(`/uploadPost/${mindId}`))
              .catch(() => navigate('/error'));
          }}
        >
          작심 인증하기
        </NoneClearBtnS>
      )}
    </>
  );
};

const goPost = async (mindId: number): Promise<{ isJoining: boolean }> =>
  await getCheckedJoined(mindId);

const CommonBtnS = styled.button`
  width: var(--width-my-mission);
  border-radius: 2rem;
  box-sizing: border-box;
  height: 2.5rem;
  font-size: var(--button-mid);

  text-align: center;
`;

const TodayClearBtnS = styled(CommonBtnS)`
  color: var(--color-main);
  background-color: black;
  p {
    margin-top: -2px;
  }
`;

const ClearBtnS = styled(CommonBtnS)`
  background-color: var(--color-main);
  color: black;
`;

const NoneClearBtnS = styled(CommonBtnS)`
  border: 0.1rem solid var(--color-main);
`;
