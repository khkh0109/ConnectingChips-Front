import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import {
  GroupHeader,
  Banner,
  LoginInput,
  SignClearBtnS,
  ArrowRight,
  postLogin,
} from './LoginBarrel';

type BindValue = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const LogIn = () => {
  const [inputState, setInputState] = useState('default');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const idBind: BindValue = { value: nickname, setValue: setNickname };
  const pwBind: BindValue = { value: password, setValue: setPassword };
  const navigate = useNavigate();

  const isDefault = inputState === 'default';

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { accessToken } = await postLogin(nickname, password);
      localStorage.setItem('access_token', accessToken);
      navigate('/');
    } catch (error) {
      console.error('로그인 실패');
      setInputState('failed');
    }
  };

  return (
    <ContainerS>
      <GroupHeader text='로그인' />
      <Banner />
      <LoginOuterContainerS>
        <LoginFormS onSubmit={handleLoginSubmit}>
          <LoginContainerS>
            <LoginInnerContainerS>
              <LoginInput
                sort='ID'
                isdefault={isDefault}
                inputbind={idBind}
                setInputState={setInputState}
              />
              <LoginInput
                sort='PW'
                isdefault={isDefault}
                inputbind={pwBind}
                setInputState={setInputState}
              />
            </LoginInnerContainerS>
            {!isDefault && <p className='error'>아이디 혹은 비밀번호가 일치하지 않습니다</p>}
          </LoginContainerS>

          <SignClearBtnS type='submit'>로그인</SignClearBtnS>
        </LoginFormS>
        <SignUpLinkS>
          <p>회원이 아니신가요?</p>
          <Link to='/signUp' className='sign-up-link'>
            <span>회원가입</span>
            <ArrowRight />
          </Link>
        </SignUpLinkS>
      </LoginOuterContainerS>
    </ContainerS>
  );
};

export default LogIn;

const ContainerS = styled.div`
  width: var(--width-mobile);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const LoginOuterContainerS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`;

const LoginFormS = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 13.75rem;

  p.error {
    color: var(--system-red);
  }
`;

const LoginContainerS = styled.div`
  height: 9.28438rem;
  margin-bottom: 0.97rem;
`;

const LoginInnerContainerS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.47rem;
`;

const SignUpLinkS = styled.div`
  display: flex;
  margin-top: 4.25rem;

  p {
    margin-right: 0.4rem;
    font-size: 0.875rem;
    color: var(--font-color3);
  }

  .sign-up-link {
    font-size: 0.875rem;
  }

  svg {
    width: 0.75rem;
    margin-left: 3px;
  }
`;
