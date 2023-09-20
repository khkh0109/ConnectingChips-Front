import { styled } from 'styled-components';
import point3 from '../../image/Icon/3point_icon.svg';
import { DetailedHTMLProps, ImgHTMLAttributes, useEffect, useState } from 'react';
import { BoardsType, getBoardCheck, deleteBoard } from '../../API/Boards';

interface PostHeaderProps {
  editbind: {
    edit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  };
  postData: BoardsType;
}

const PostHeader = ({ editbind, postData }: PostHeaderProps): JSX.Element => {
  const [editModalToggle, setEditModalToggle] = useState(false);
  const [editBtnToggle, setEditBtnToggle] = useState(false);
  const { edit, setEdit } = editbind;

  const handlerToogleSwitch = () => {
    setEditModalToggle((prev) => !prev);
  };

  const defalutPofileImage = (imageUrl: string) => {
    if (imageUrl === 'default') {
      return `${process.env.PUBLIC_URL}/defalutProfileImage.jpg`;
    }
  };

  // 자신의 게시글인지 확인
  useEffect(() => {
    getBoardCheck(postData.boardId).then((data) => {
      data.canEdit ? setEditBtnToggle(true) : setEditBtnToggle(false);
    });
  }, []);

  return (
    <PostHeaderS>
      <PostHeaderProfileS>
        <PostProfileImageS>
          <img src={defalutPofileImage(postData.profileImage)} alt='프로필 사진' />
        </PostProfileImageS>
        <PostProfileNickNameS>
          <h2>{postData.nickname}</h2>
          <p>{postData.createDate}</p>
        </PostProfileNickNameS>
      </PostHeaderProfileS>
      {/* editBtnToggle ? 수정버튼 나오게 : 수정버튼 사라짐 */}
      {editBtnToggle ? null : (
        <MoreIconS onClick={handlerToogleSwitch}>
          <img src={point3} alt='point3_icon' />
          {/* editModalToggle ? 수정모달나오게 : 수정모달 사라짐 */}
          {editModalToggle ? (
            <ModalS>
              <div
                onClick={() => {
                  setEdit(true);
                }}
              >
                수정하기
              </div>
              <div
                onClick={() => {
                  deleteBoard(postData.boardId);
                }}
              >
                삭제하기
              </div>
            </ModalS>
          ) : null}
        </MoreIconS>
      )}
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
