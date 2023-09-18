import { styled } from 'styled-components';
import point3 from '../../image/Icon/3point_icon.svg';
import { useState } from 'react';
import { BoardsType } from '../../API/Boards';
/** 2023-08-22 PostHeader.tsx - 작심 인증 프로필 + 더보기 */
interface PostHeaderProps {
  editbind: {
    edit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  };
  post: BoardsType;
}

const PostHeader = ({ editbind, post }: PostHeaderProps): JSX.Element => {
  const [isToggle, setIsToggle] = useState(false);
  const { edit, setEdit } = editbind;
  const handlerToogleSwitch = () => {
    setIsToggle((prev) => !prev);
  };

  return (
    <PostHeaderS>
      <PostHeaderProfileS>
        <PostProfileImageS>
          <img src={post.profileImage} alt='프로필 사진' />
        </PostProfileImageS>
        <PostProfileNickNameS>
          <h2>{post.nickname}</h2>
          <p>{post.createDate}</p>
        </PostProfileNickNameS>
      </PostHeaderProfileS>
      <MoreIconS onClick={handlerToogleSwitch}>
        <img src={point3} alt='point3_icon' />
        {isToggle && (
          <ModalS>
            <div
              onClick={() => {
                setEdit(true);
              }}
            >
              수정하기
            </div>
            <div>삭제하기</div>
          </ModalS>
        )}
      </MoreIconS>
    </PostHeaderS>
  );
};

export default PostHeader;

/** 2023-08-22 PostHeader.tsx - 그룹페이지 아티클 헤더 */
const PostHeaderS = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* margin: 1rem; */
  padding: 1rem;

  img {
    cursor: pointer;
  }
`;

/** 2023-08-22 PostHeader.tsx - 그룹페이지 아티클 헤더 프로필 */
const PostHeaderProfileS = styled.div`
  display: flex;
  align-items: center;

  h2 {
    margin-right: 0.5rem;
    font-size: 0.875rem;
  }

  p {
    color: var(--font-color2);
  }
`;

/** 2023-08-22 PostHeader.tsx - 그룹페이지 아티클 헤더 프로필 */
const MoreIconS = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const ModalS = styled.div`
  position: absolute;
  top: 3.31rem;
  right: 0rem;
  background-color: white;
  width: 8.8125rem;
  border-radius: 0.63rem;
  border: 1px solid var(--color-main);
  div {
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child {
      border-radius: 0.63rem 0.63rem 0 0;
    }
    &:last-child {
      border-radius: 0 0 0.63rem 0.63rem;
    }
  }
`;

/** 2023-08-22 PostHeader.tsx - 그룹페이지 아티클 인증 이미지(임시) */
const PostProfileImageS = styled.div`
  width: 3rem;
  aspect-ratio: 1/1;
  border-radius: 10rem;
  overflow: hidden;
  margin-right: 0.5rem;

  img {
    width: 3.5rem;
  }
`;

/** 2023-08-22 PostHeader.tsx - 그룹페이지 아티클 인증 이미지(임시) */
const PostProfileNickNameS = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: var(--font-color3);
  }
`;
