import { notifyExtensionsBlockErr } from '../../Component/Toast/ExtensionsBlockMsg';
import { notifyImgSizeLimitErr } from '../../Component/Toast/ImgSizeLimitMsg';

// 계산: 유효한 확장자 검사 함수
export function isExtensionValid(fileName: string, allowedExtensions: string[]) {
  const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
  return allowedExtensions.includes(fileExtension);
}

// 계산: 이미지 유효성 검사
export function validateImage(file: File, allowedExtensions: string[], fileSizeLimit: number) {
  if (!isExtensionValid(file.name, allowedExtensions)) {
    return {
      isValid: false,
      errorMessage: 'INVALID_FILE_EXTENSIONS',
    };
  }

  if (file.size > fileSizeLimit) {
    return {
      isValid: false,
      errorMessage: 'INVALID_FILE_SIZE',
    };
  }

  return { isValid: true, errorMessage: null };
}

// 액션: 토스트 띄우는 함수
export function showToast(toastType: string | null) {
  switch (toastType) {
    case 'INVALID_FILE_EXTENSIONS':
      return notifyExtensionsBlockErr();
    case 'INVALID_FILE_SIZE':
      return notifyImgSizeLimitErr();
    default:
      return;
  }
}
