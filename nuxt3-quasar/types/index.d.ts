type MenuType = {
  icon?: string; // 메뉴 아이콘
  text: string; //  메뉴 이름
  to?: string; //   링크
};

type NullType = null;
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
type RowType = FirebaseBoardDocType | NullType;
type BoardInsertType = Pick<FirebaseBoardDocType, 'title' | 'content'>;
type BoardUpdateType = Pick<FirebaseBoardDocType, 'id' | 'title' | 'content'>;
