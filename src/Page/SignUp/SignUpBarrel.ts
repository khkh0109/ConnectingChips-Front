import Banner from '../../Component/Banner';
import Loginheader from '../../Component/SignUp/Loginheader';
import Terms from '../../Component/SignUp/Terms';
import { GroupHeader } from '../../Component/Mission/GroupHeader';
import { SquareButton } from '../../Component/SignUp/SquareButton';
import EmailVerificationModal from '../../Component/SignUp/EmailVerificationModal';
import { WideButton, ButtonWrapperS } from '../../Component/WideButton';

import { LogInS, LoginInputS } from '../../StyleComp/LoginInputS';

import useLoginCheck from '../../Hooks/useLoginCheck';
import { type handlerBind, useSignup } from '../../Hooks/useSignup';

import { idDuplicateCheck } from '../../API/signup';
import { postAuthenticationEmail } from '../../API/Users';

import infoIcon from '../../image/Icon/Info_icon.svg';
import { ReactComponent as CheckIcon } from '../../image/Icon/check-icon.svg';

export {
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
  Loginheader,
  infoIcon,
  Terms,
  GroupHeader,
  type handlerBind,
  useSignup,
};
