import styled from 'styled-components';
import { BoardsType } from '../GroupPageBarrel';

interface CommentToolbarProps {
  postData: BoardsType;
}

const CommentToolbar = ({ postData }: CommentToolbarProps) => {
  return <CommentToolbarS>댓글 {postData.commentCount}</CommentToolbarS>;
};

// TOFIX: export defalut 왜 안돼
export { CommentToolbar };

const CommentToolbarS = styled.h2`
  margin: 0.37rem 1rem 0.75rem 1rem;
  font-size: 1rem;
`;
