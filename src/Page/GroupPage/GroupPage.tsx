import { styled } from './GroupPageBarrel';
import { GroupHeader, DivideBaS, GroupArticle } from './GroupPageBarrel';
import { GroupPostList } from './GroupPostList';
import { getMind_IntroImage } from '../../API/Mind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GroupBtn from './GroupBtn';

const GroupPage = (): JSX.Element => {
  const { mindId } = useParams<string>();
  const [pageImage, setPageImage] = useState<string>('');
  const [refresh, setRefresh] = useState(1);
  const refreshBind = { refresh, setRefresh };
  useEffect(() => {
    getMind_IntroImage(Number(mindId)).then((data) => {
      setPageImage(data.introImage);
    });
  }, []);

  return (
    <GroupPageS>
      <GroupHeader refresh={refresh} />
      <GroupImageS url={pageImage} />
      <GroupArticle selected={[0, 1]} passsort='Page' />
      <GroupBtn refresh={refresh} />
      <DivideBaS />
      <GroupPostList refreshBind={refreshBind} />
    </GroupPageS>
  );
};

export default GroupPage;

const GroupPageS = styled.div`
  width: var(--width-mobile);
  margin-bottom: 3rem;
  position: relative;
`;

const GroupImageS = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-size: 26rem;
  background-position: 0 -1rem;
  height: 10rem;
`;
