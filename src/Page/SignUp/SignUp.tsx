import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import {
  WideButton,
  ButtonWrapperS,
  SquareButton,
  EmailVerificationModal,
  CheckIcon,
  idDuplicateCheck,
  postAuthenticationEmail,
  useLoginCheck,
  Banner,
  LogInS,
  LoginInputS,
  infoIcon,
  Terms,
  GroupHeader,
  type handlerBind,
  useSignup,
} from './SignUpBarrel';

const SignUp = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [inputState, setInputState] = useState('default');
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [isDuplicateId, setIsDuplicateId] = useState<boolean | null>(null);
  const [validation, setValidation] = useState({
    id: false,
    email: false,
    nickname: false,
    password: false,
    confirmPassword: false,
  });
  const isFailed = inputState === 'failed';
  const {
    id,
    idBind,
    email,
    emailBind,
    nickname,
    nicknameBind,
    password,
    passBind,
    confirmPassword,
    confirmBind,
  } = useSignup();
  const navigate = useNavigate();

  useLoginCheck(navigate, 'Done');

  useEffect(() => {
    const isAllChecked = Object.values(validation).every((value) => value);
    setIsValid(isAllChecked);
  }, [validation]);

  const idValidationCheck = () => {
    const idReg = /^(?!^\d+$)[a-zA-Z0-9]{2,10}$/g;
    const isValidId = idReg.test(id);
    setValidation((prev) => ({ ...prev, id: isValidId }));

    setInputState('default');
    setIsDuplicateId(true);
  };

  const emailValidationCheck = () => {
    const emailReg = /^[a-z0-9_.]+@[a-z0-9_.]+\.[a-z0-9]*$/g;
    const isValidEmail = emailReg.test(email);
    setValidation((prev) => ({ ...prev, email: isValidEmail }));
  };

  const nicknameValidationCheck = () => {
    const nicknameReg = /^[가-힣]{2,6}$/g;
    const isValidNickname = nicknameReg.test(nickname);
    setValidation((prev) => ({ ...prev, nickname: isValidNickname }));
  };

  const passwordValidationCheck = () => {
    const passwordReg = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{10,20}$/g;
    const isValidPassword = passwordReg.test(password);
    setValidation((prev) => ({ ...prev, password: isValidPassword }));
    passwordConfirmCheck();
  };

  const passwordConfirmCheck = () => {
    const isSamePassword = password === confirmPassword;
    setValidation((prev) => ({ ...prev, confirmPassword: isSamePassword }));
  };

  const handleIdDuplicateCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!id || (id && validation.id === false)) return;
    const isUsable = await idDuplicateCheck(id);
    if (isUsable) {
      setInputState('default');
      setIsDuplicateId(false);
    } else {
      setInputState('failed');
      setIsDuplicateId(true);
    }
  };

  const authenticationEmailRequest = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const data = await postAuthenticationEmail(email);
      if (data.statusCode === 200) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSubmitButtonClick = () => {
    setIsEmailModalOpen(true);
    authenticationEmailRequest();
  };

  const handleCloseIconClick = () => {
    setIsEmailModalOpen(false);
  };

  return (
    <LogInS>
      <GroupHeader text='회원가입' />
      <Banner />
      <LoginFormS>
        <LoginInputContainerS>
          <h2>아이디</h2>
          <SignUpInput
            sort='ID'
            handlerBind={idBind}
            isFailed={isFailed}
            validationCheck={idValidationCheck}
            isError={id !== '' && validation.id === false}
            handleIdDuplicateCheck={handleIdDuplicateCheck}
            isDuplicateId={isDuplicateId}
          />
          <p
            className={
              (id && validation.id === false) || isFailed || !isDuplicateId ? 'hidden' : ''
            }
          >
            <img src={infoIcon} alt='infoIcon' />
            영문, 영문+숫자 중 1가지 2~10자 조합, 공백 불가
          </p>
          {id && validation.id === false && (
            <p className='error'>영문, 영문+숫자 중 1가지 2~10자 조합, 공백 불가</p>
          )}
          {isFailed && <p className='error'>이미 존재하는 아이디입니다</p>}
          {!isDuplicateId && <p className='success'>사용할 수 있는 아이디입니다.</p>}
        </LoginInputContainerS>
        <LoginInputContainerS>
          <h2>이메일</h2>
          <SignUpInput
            sort='Email'
            handlerBind={emailBind}
            validationCheck={emailValidationCheck}
            isError={email !== '' && validation.email === false}
          />
          {email && validation.email === false && (
            <p className='error'>이메일 형식이 올바르지 않습니다.</p>
          )}
        </LoginInputContainerS>
        <LoginInputContainerS>
          <h2>닉네임</h2>
          <SignUpInput
            sort='Nickname'
            handlerBind={nicknameBind}
            validationCheck={nicknameValidationCheck}
            isError={nickname !== '' && validation.nickname === false}
          />
          <p className={nickname && validation.nickname === false ? 'hidden' : ''}>
            <img src={infoIcon} alt='infoIcon' />
            한글 2-6자, 욕설 및 비속어 사용 시 서비스 제한
          </p>
          {nickname && validation.nickname === false && <p className='error'>한글 2-6자</p>}
        </LoginInputContainerS>
        <LoginInputContainerS>
          <h2>비밀번호</h2>
          <SignUpInput
            sort='PW'
            handlerBind={passBind}
            validationCheck={passwordValidationCheck}
            isError={password !== '' && validation.password === false}
          />
          <p className={password && validation.password === false ? 'hidden' : ''}>
            <img src={infoIcon} alt='infoIcon' />
            영문+숫자 10~20자 조합, 공백 및 특수문자 불가
          </p>
          {password && validation.password === false && (
            <p className='error'>영문+숫자 10~20자 조합, 공백 불가</p>
          )}
        </LoginInputContainerS>
        <LoginInputContainerS>
          <h2>비밀번호 재입력</h2>
          <SignUpInput
            sort='PWconfirm'
            handlerBind={confirmBind}
            validationCheck={passwordConfirmCheck}
            isError={confirmPassword !== '' && validation.confirmPassword === false}
          />
          {confirmPassword && validation.confirmPassword === false && (
            <p className='error'>비밀번호가 일치하지 않습니다.</p>
          )}
        </LoginInputContainerS>
      </LoginFormS>
      <Terms isAllAgreed={isAllAgreed} setIsAllAgreed={setIsAllAgreed} />
      {isEmailModalOpen && (
        <EmailVerificationModal
          id={id}
          email={email}
          nickname={nickname}
          password={password}
          handleCloseIconClick={handleCloseIconClick}
          authenticationEmailRequest={authenticationEmailRequest}
        />
      )}
      <ButtonWrapperS>
        <WideButton
          onClick={handleSubmitButtonClick}
          disabled={!(isValid && isAllAgreed && isDuplicateId === false)}
        >
          메일 인증하고 회원가입
        </WideButton>
      </ButtonWrapperS>
    </LogInS>
  );
};

export default SignUp;

type Sort = 'ID' | 'PW' | 'Email' | 'Nickname' | 'PWconfirm';
interface SignUpInputProps {
  sort: Sort;
  handlerBind: handlerBind;
  isFailed?: boolean;
  validationCheck: () => void;
  isError: boolean;
  handleIdDuplicateCheck?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDuplicateId?: boolean | null;
}

const SignUpInput = ({
  sort,
  handlerBind,
  isFailed,
  validationCheck,
  isError,
  handleIdDuplicateCheck,
  isDuplicateId,
}: SignUpInputProps) => {
  const { value, setValue } = handlerBind;

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue.trim());
  };

  useEffect(() => {
    validationCheck();
  }, [value]);

  const generateInputType = (sort: Sort) => {
    switch (sort) {
      case 'ID':
        return { type: 'text', placeholder: '아이디를 입력해 주세요' };
      case 'PW':
        return { type: 'password', placeholder: '비밀번호를 입력해 주세요' };
      case 'Email':
        return { type: 'email', placeholder: '이메일을 입력해 주세요' };
      case 'Nickname':
        return { type: 'text', placeholder: '닉네임을 입력해 주세요' };
      case 'PWconfirm':
        return { type: 'password', placeholder: '비밀번호를 확인해 주세요' };
      default:
        return { type: 'text', placeholder: '' };
    }
  };

  const { type, placeholder } = generateInputType(sort);

  return (
    <>
      {sort === 'ID' ? (
        <IDInputWrapperS>
          <LoginInputWrapperS>
            <LoginInputS
              placeholder={placeholder}
              type={type}
              className={`${isFailed ? 'failed' : ''} ${isError ? 'error' : ''} ${
                isDuplicateId ? '' : 'success'
              }`}
              value={value}
              onChange={handlerOnChange}
            />
            <CheckIcon className={isDuplicateId ? '' : 'success'} />
          </LoginInputWrapperS>
          <SquareButton onClick={handleIdDuplicateCheck}>중복 확인</SquareButton>
        </IDInputWrapperS>
      ) : (
        <LoginInputS
          placeholder={placeholder}
          type={type}
          className={`${isFailed ? 'failed' : ''} ${isError ? 'error' : ''}`}
          value={value}
          onChange={handlerOnChange}
        />
      )}
    </>
  );
};

const LoginInputWrapperS = styled.div`
  position: relative;
  svg {
    display: none;
    position: absolute;
    top: 0.75rem;
    right: 1rem;
  }

  svg.success {
    display: block;
  }

  flex-grow: 1;

  input {
    box-sizing: border-box;
    width: 100%;
  }
`;

const LoginFormS = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  padding: 1rem;
`;

const LoginInputContainerS = styled.div`
  height: 7.5rem;
  display: flex;
  flex-direction: column;
  gap: var(--height-gap);

  input.error {
    border-color: var(--system-red);
  }

  input.success {
    border-color: var(--system-green);
  }

  p {
    color: var(--font-color2);

    img {
      margin-right: 0.25rem;
      position: relative;
      top: 56%;
      transform: translateY(-50%);
    }

    &.error {
      color: var(--system-red);
    }

    &.success {
      color: var(--system-green);
    }

    &.hidden {
      display: none;
    }
  }
`;

const IDInputWrapperS = styled.div`
  display: flex;
  gap: 8px;

  button {
    flex-shrink: 0;
  }
`;
