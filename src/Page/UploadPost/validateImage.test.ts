import { isExtensionValid, validateImage } from './validateImage';

// 파일 객체를 모의(Mock)하기 위한 유틸리티 함수
const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', {
    value: size,
  });
  return file;
};

describe('isExtensionValid Function', () => {
  it('유효한 확장자라면 true를 리턴함', () => {
    const fileName = 'image.jpeg';
    const allowedExtensions = ['.jpeg', '.png', '.gif'];
    const result = isExtensionValid(fileName, allowedExtensions);
    expect(result).toBe(true);
  });

  it('대소문자 구분 없이 유효한 확장자라면 true를 리턴함', () => {
    const fileName = 'image.JPEG';
    const allowedExtensions = ['.jpeg', '.png', '.gif'];
    const result = isExtensionValid(fileName, allowedExtensions);
    expect(result).toBe(true);
  });

  it('유효하지 않은 확장자라면 false를 리턴함', () => {
    const fileName = 'document.pdf';
    const allowedExtensions = ['.jpeg', '.png', '.gif'];
    const result = isExtensionValid(fileName, allowedExtensions);
    expect(result).toBe(false);
  });

  it('확장자가 없는 경우 false를 리턴함', () => {
    const fileName = 'image';
    const allowedExtensions = ['.jpeg', '.png', '.gif'];
    const result = isExtensionValid(fileName, allowedExtensions);
    expect(result).toBe(false);
  });

  it('파일 이름에 점이 여러 개 있는 경우 제일 마지막 .을 기준으로 확장자를 판단하고 유효하면 true를 반환함', () => {
    const fileName = 'archive.01.png';
    const allowedExtensions = ['.png', '.zip'];
    const result = isExtensionValid(fileName, allowedExtensions);
    expect(result).toBe(true);
  });
});

describe('validateImage Function', () => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  const fileSizeLimit = 10 * 1024 * 1024; // 10MB

  it('유효한 확장자와 허용 가능한 파일 크기를 가진 파일에 대해 true를 반환해야 함', () => {
    const mockFile = createMockFile('image.jpg', 5 * 1024 * 1024, 'image/jpeg'); // 5MB
    const validation = validateImage(mockFile, allowedExtensions, fileSizeLimit);
    expect(validation).toEqual({ isValid: true, errorMessage: null });
  });

  it('허용되지 않는 확장자를 가진 파일에 대해 false와 "INVALID_FILE_EXTENSIONS" 오류 메시지를 반환해야 함', () => {
    const mockFile = createMockFile('document.pdf', 3 * 1024 * 1024, 'application/pdf'); // 3MB
    const validation = validateImage(mockFile, allowedExtensions, fileSizeLimit);
    expect(validation).toEqual({ isValid: false, errorMessage: 'INVALID_FILE_EXTENSIONS' });
  });

  it('허용된 확장자를 가지지만 파일 크기가 제한을 초과하는 경우, false와 "INVALID_FILE_SIZE" 오류 메시지를 반환해야 함', () => {
    const mockFile = createMockFile('large-image.jpg', 12 * 1024 * 1024, 'image/jpeg'); // 12MB
    const validation = validateImage(mockFile, allowedExtensions, fileSizeLimit);
    expect(validation).toEqual({ isValid: false, errorMessage: 'INVALID_FILE_SIZE' });
  });

  // 경계 테스트
  it('파일 크기가 정확히 제한값인 경우 (10MB), 유효한 파일로 처리해야 함', () => {
    const mockFile = createMockFile('exact-size-image.jpg', 10 * 1024 * 1024, 'image/jpeg'); // 정확히 10MB
    const validation = validateImage(mockFile, allowedExtensions, fileSizeLimit);
    expect(validation).toEqual({ isValid: true, errorMessage: null });
  });

  it('파일 크기가 제한값을 약간 초과하는 경우 (10MB + 1byte), 유효하지 않은 파일로 처리해야 함', () => {
    const mockFile = createMockFile('slightly-large-image.jpg', 10 * 1024 * 1024 + 1, 'image/jpeg'); // 10MB + 1byte
    const validation = validateImage(mockFile, allowedExtensions, fileSizeLimit);
    expect(validation).toEqual({ isValid: false, errorMessage: 'INVALID_FILE_SIZE' });
  });
});
