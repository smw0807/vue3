// 메뉴 타입
type MenuType = {
  icon?: string; // 메뉴 아이콘
  text: string; //  메뉴 이름
  to?: string; //   링크
};

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
// 파이어베이스 게시판 컬렉션 데이터 추가할 때 타입
type BoardInsertType = Pick<FirebaseBoardDocType, 'title' | 'content'>;
// 파이어베이스 게시판 컬렉션 데이터 수정할 때 타입
type BoardUpdateType = Pick<FirebaseBoardDocType, 'id' | 'title' | 'content'>;

// 파이어베이스 파일게시판 컬렉션 데이터 타입
type FileUploadDocType = {
  fileName: string; // 파일명
  fileType: string; // 파일유형
  filePath: string; // 파일경로(스토리지 경로)
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

type FileUploadType = {};
