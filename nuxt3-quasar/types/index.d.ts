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
