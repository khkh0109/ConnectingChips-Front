import { LoginInputS } from '../../StyleComp/LoginInputS';

// TODO: 중복된 타입임
type bindValue = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

interface LoginInputProps {
  sort: 'ID' | 'PW';
  isdefault: boolean;
  inputbind: bindValue;
  setInputState: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginInput({ sort, isdefault, inputbind, setInputState }: LoginInputProps) {
  const { value, setValue } = inputbind;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setInputState('default');
  };

  if (sort === 'ID')
    return (
      <LoginInputS
        placeholder='아이디를 입력해 주세요'
        className={isdefault ? '' : 'failed'}
        value={value}
        onChange={handleInputChange}
      />
    );

  return (
    <LoginInputS
      placeholder='비밀번호를 입력해 주세요'
      className={isdefault ? '' : 'failed'}
      type={true ? 'password' : 'text'}
      value={value}
      onChange={handleInputChange}
    />
  );
}
