import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { postJoin } from '../../API/joinedMinds';
import { getkeepJoin } from '../../API/Mind';

const GroupBtn = ({ refresh }: { refresh: number }) => {
  const navigate = useNavigate();
  const { mindId } = useParams();
  const [keepJoin, setKeepJoin] = useState<boolean>(false);
  const [isDoneToday, setIsDoneToday] = useState<boolean>(false);
  useEffect(() => {
    getkeepJoin(Number(mindId)).then((data) => {
      setKeepJoin(data.keepJoin);
      setIsDoneToday(data.isDoneToday);
    });
  }, [refresh]);

  // 버튼 텍스트를 결정하는 함수
  const getButtonText = () => {
    if (!keepJoin) {
      return isDoneToday ? '성공' : '인증';
    } else {
      return '재작심';
    }
  };
  const buttonText = getButtonText();

  const groupBtnHandler = () => {
    if (buttonText === '인증') {
      navigate(`/uploadPost/${mindId}`);
    }
    if (buttonText === '재작심') {
      postJoin(Number(mindId));
    }
  };

  const buttonLabels = {
    인증: '작심 인증하기',
    성공: '오늘 작심 성공!',
    재작심: '재작심 하기',
  };

  return (
    <div style={{ margin: '0 1rem' }}>
      <GroupBtnContainerS btntext={buttonText} onClick={groupBtnHandler}>
        {buttonLabels[buttonText]}
      </GroupBtnContainerS>
    </div>
  );
};
export default GroupBtn;

const GroupBtnContainerS = styled.button<{ btntext: string }>`
  width: 100%;
  height: 2.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--color-main);
  background: var(--color-white);
  font-size: 0.75rem;
  ${(props) =>
    props.btntext === '성공' &&
    `
      background: black;
      color: var(--color-main);
      border: 1px solid black;
    `};

  ${(props) =>
    props.btntext === '재작심' &&
    `
      background: var(--color-main);
    `};
`;