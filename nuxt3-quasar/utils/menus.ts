interface IMenu {
  icon?: string; // 메뉴 아이콘
  text: string; //  메뉴 이름
  to?: string; //   링크
}
export const rootMenu: IMenu[] = [{ icon: 'home', text: 'Home', to: '/' }];
export const tempMenu: IMenu[] = [
  { icon: 'folder', text: 'Library' },
  { icon: 'restore', text: 'History' },
  { icon: 'watch_later', text: 'Watch later' },
  { icon: 'thumb_up_alt', text: 'Liked videos' },
];
export const firebaseMenu: IMenu[] = [
  { icon: 'table_view', text: 'Firestore Database', to: '/firebase/database' },
  { icon: 'view_list', text: 'Board', to: '/firebase/board' },
  { icon: 'drive_folder_upload', text: 'File Board', to: '/firebase/file' },
];
export const quasarMenu: IMenu[] = [
  { icon: 'description', text: 'Form', to: '/quasar/form' },
];
