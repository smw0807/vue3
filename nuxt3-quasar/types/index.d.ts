// 메뉴 타입
type MenuType = {
  icon?: string; // 메뉴 아이콘
  text: string; //  메뉴 이름
  to?: string; //   링크
};

type StringKeyValueType = { [x: string]: string };

type NullType = null;

// 파이어베이스 게시판 컬렉션 데이터 타입
type FirebaseBoardDocType = {
  content: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  id: string;
  title: string;
  viewer: number;
  writer: string;
  writerID: string;
};

// 파이어베이스 게시판 컬렉션 1개 데이터 타입
type RowType = FirebaseBoardDocType | NullType;
// 파이어베이스 게시판 컬렉션 데이터 등록 수정 할 때 타입
type BoardInsUpdType = Pick<FirebaseBoardDocType, 'title' | 'content'>;

// 파이어베이스 파일게시판 컬렉션 데이터 타입
type FileUploadDocType = {
  fileName: string; // 파일명
  fileType: string; // 파일유형
  fileSize: number; //파일 사이즈
  downloadURL: string; // 파일 다운로드 URL
  // 스토리지 및 파이어스토어 등록시간
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  id: string; // 도큐먼트 아이디(필요한지 컴토 필요)
  uploader: string; // 파일 업로드한 사람
  uploaderID: string; // 파일 업로드한 사람 아이디(또는 이메일)
  downloadCount: number; // 파일 다운로드 횟수
};

type FileUploadType = {
  fileName: string; // 파일명
  fileType: string; // 파일유형
  fileSize: number; //파일 사이즈
  downloadURL: string; // 파일 다운로드 URL
  uploader: string; // 파일 업로드한 사람
  uploaderID: string; // 파일 업로드한 사람 아이디(또는 이메일)
  downloadCount: number; // 파일 다운로드 횟수
  createdAt: Date; //파일 업로드 시간
};
