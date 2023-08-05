type NullType = null;
type FirebaseBoardDocType = {
  content: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  id: string;
  title: string;
  viewer: string;
  writer: string;
  writerID: string;
};
type RowType = FirebaseBoardDocType | NullType;
type BoardInsertType = Pick<FirebaseBoardDocType, 'title' | 'content'>;
type BoardUpdateType = Pick<FirebaseBoardDocType, 'id' | 'title' | 'content'>;
