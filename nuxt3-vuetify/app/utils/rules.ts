const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const emailRules = (v: string): boolean | string => {
  if (!v) return '이메일을 입력해주세요.';
  else if (!regex.test(v)) return '이메일 형식에 맞지 않습니다.';
  return true;
};

export const nameRules = (v: string): boolean | string => {
  if (!v) return '이름을 입력해주세요.';
  return true;
};

export const passwordRules = (v: string): boolean | string => {
  if (!v) return '비밀번호를 입력해주세요.';
  return true;
};

export const passwordConfirmRules = (
  v: string,
  password: string
): boolean | string => {
  if (!v) return '비밀번호 확인을 입력해주세요.';
  else if (v !== password) return '비밀번호가 일치하지 않습니다.';
  return true;
};
