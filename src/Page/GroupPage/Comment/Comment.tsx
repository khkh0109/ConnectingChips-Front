import styled from 'styled-components';
import { useState } from 'react';
import { PostProps } from '../PostPropsType';
import { CommentHeader } from './CommentHeader';
import { CommentInput } from './CommentInput';
import CommentBoxMaker from './CommentList';
import Bind from '../../../Type/Bind';

const Comment = ({ postProps }: { postProps: PostProps }): JSX.Element => {
  const { postData, userInfo } = postProps;

  // 댓글접기
  const [commentFlip, setCommentFlip] = useState(true);
  const commentFlipBind:Bind<boolean> = { state: commentFlip, Setter: setCommentFlip };

  // input 바텀에 붙거나 말거나
  const [inputToggle, setInputToggle] = useState<boolean>(true);
  const inputToggleBind: Bind<boolean> = { state: inputToggle, Setter: setInputToggle };

  // 댓글과 답글 구분
  const [isComment, setIsComment] = useState<number>(0);
  const isCommentBind: Bind<number> = { state: isComment, Setter: setIsComment };

  return (
    <CommentContainerS>
      {postData.commentCount > 0 && (
        <>
          <CommentHeader postData={postData} commentFlipBind={commentFlipBind} />
          <CommentListS commentFlip={commentFlip}>
            {postData.commentList.map((commentData, i) => (
              <CommentBoxMaker
                userInfo={userInfo}
                setInputToggle={setInputToggle}
                setIsComment={setIsComment}
                commentData={commentData}
                key={i}
              />
            ))}
          </CommentListS>
        </>
      )}
      <CommentInput
        postData={postData}
        userInfo={userInfo}
        setCommentFlip={setCommentFlip}
        inputToggleBind={inputToggleBind}
        isCommentBind={isCommentBind}
      />
    </CommentContainerS>
  );
};

export default Comment;

const CommentContainerS = styled.div`
  margin: 0 1rem;
  margin-top: 0.5rem;
`;

const CommentListS = styled.div<{ commentFlip: boolean }>`
  height: ${(props) => (props.commentFlip ? '0px' : 'auto')};
  margin: ${(props) => (props.commentFlip ? 'none' : '1rem 0')};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;