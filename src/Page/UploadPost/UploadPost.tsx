import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled, keyframes } from 'styled-components';
import axios from 'axios';

import CreateExampleImage from '../../Component/UploadPost/CreateExampleImage';
import UploadImage from '../../Component/UploadPost/UploadImage';
import UploadText from '../../Component/UploadPost/UploadText';
import { DivideBaS } from '../../Component/Mission/GroupArticle';
import { WideButton, ButtonWrapperS } from '../../Component/WideButton';
import {
  GroupArticleS,
  HeadLine,
  MissionRule,
  initMind,
} from '../../Component/Mission/GroupArticle';

import { validateImage, showToast } from './validateImage';
import { notifyNetErr } from '../../Component/Toast/NetworkErrorMsg';

import { getUser } from '../../API/Users';
import { postCreateBoard } from '../../API/Boards';
import { getMindInfo_Intro } from '../../API/Mind';

import { ReactComponent as LoadingSpinner } from '../../image/loading.svg';
import { MindsType } from '../../Type/Mind';
import {
  BAD_REQUEST,
  SERVER_ERROR,
  INVALID_TOKEN,
  EXPIRED_TOKEN,
  AXIOS_NETWORK_ERROR,
} from '../../constant/error';
import { GroupHeader } from '../GroupPage/GroupPageBarrel';

import { SIZE_10MB } from '../../constant/uploadPost';
import { allowedExtensions } from '../../data/uploadPost';

interface Image {
  name: string;
  file: null | File;
}

const UploadPost = () => {
  const INITIAL_TEXT = '오늘 작심 성공!';

  const navigate = useNavigate();
  const { mindId } = useParams();

  const [userId, setUserId] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [text, setText] = useState<string>(INITIAL_TEXT);
  const [image, setImage] = useState<Image>({ name: '', file: null });
  const [isLoading, setIsLoading] = useState(false);
  const [getMindInfoData, setGetMindInfoData] = useState<MindsType>(initMind);

  useEffect(() => {
    (async () => {
      const [getUserData, getMindInfoIntroData] = await Promise.allSettled([
        getUser(),
        getMindInfo_Intro(Number(mindId)),
      ]);

      if (getUserData.status === 'fulfilled') {
        setUserId(getUserData.value.userId);
      } else {
        handleAxiosError(getUserData.reason);
      }

      if (getMindInfoIntroData.status === 'fulfilled') {
        setGetMindInfoData(getMindInfoIntroData.value);
      } else {
        handleAxiosError(getMindInfoIntroData.reason);
      }
    })();
  }, []);

  const handleAxiosError = (error: unknown) => {
    // TODO: 코드 중복 수정 필요 / 공통으로 처리할 에러 정리 필요
    if (axios.isAxiosError(error)) {
      if (error.response?.status === SERVER_ERROR) {
        return notifyNetErr();
      }

      if (error.response?.data.code === EXPIRED_TOKEN) {
        localStorage.removeItem('access_token');
        return navigate('/');
      }

      if (error.response?.data.code === INVALID_TOKEN) {
        localStorage.removeItem('access_token');
        return navigate('/');
      }

      if (error.code === AXIOS_NETWORK_ERROR) {
        return notifyNetErr();
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    // 유효성 검사 함수 호출
    const { isValid, errorMessage } = validateImage(file, allowedExtensions, SIZE_10MB);

    if (isValid) {
      setImage({ name: file.name, file });
      setImageUrl(URL.createObjectURL(file));
    } else {
      showToast(errorMessage);
    }
  };

  const handleFileInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = '';
  };

  const handleDeleteIconClick = () => {
    URL.revokeObjectURL(imageUrl);
    setImageUrl('');
    setImage({ name: '', file: null });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (image.file === null) {
      return console.error('이미지는 필수입니다.');
    }

    if (userId === null) {
      return console.error('userId가 없습니다.');
    }

    try {
      setIsLoading(true);

      const response = await postCreateBoard({
        mindId: Number(mindId),
        userId,
        content: text,
        image,
      });

      if (response.statusCode === 200) {
        setIsLoading(false);
      }

      navigate(`/groupPage/${mindId}`);
    } catch (error) {
      console.error(error);
      setIsLoading(false);

      // TODO: 코드 중복 수정 필요 / 공통으로 처리할 에러 정리 필요
      handleAxiosError(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === BAD_REQUEST) {
          return console.error('이미지는 필수입니다.');
        }
      }
    }
  };

  return (
    <CreatePostS>
      <GroupHeader text='작심 글쓰기' />
      <GroupArticleS passsort={'Create'}>
        <HeadLine getMindInfoData={getMindInfoData} passsort={'Create'} />
        <MissionRule getMindInfoData={getMindInfoData} passsort={'Create'} />
      </GroupArticleS>
      <CreateExampleImage />
      <DivideBaS />
      <CreateFormS onSubmit={handleFormSubmit}>
        {isLoading ? (
          <LoadingSpinnerContainer>
            <LoadingSpinner />
          </LoadingSpinnerContainer>
        ) : (
          <>
            <UploadImage
              imageUrl={imageUrl}
              handleDeleteIconClick={handleDeleteIconClick}
              handleFileInputChange={handleFileInputChange}
              handleFileInputClick={handleFileInputClick}
            />
            <UploadText initialText={INITIAL_TEXT} handleTextareaChange={handleTextareaChange} />
          </>
        )}
        <ButtonWrapperS $fixed>
          <WideButton disabled={image.file === null}>인증하기</WideButton>
        </ButtonWrapperS>
      </CreateFormS>
    </CreatePostS>
  );
};

export default UploadPost;

const CreatePostS = styled.div`
  width: 100%;
  max-width: var(--width-max);
`;

const CreateFormS = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 5.5rem;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100dvh - 362.16px);

  svg {
    animation: ${spin} 1s linear infinite;
  }
`;
