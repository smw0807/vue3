export const rootMenu: MenuType[] = [{ icon: 'home', text: 'Home', to: '/' }];
export const tempMenu: MenuType[] = [
  { icon: 'folder', text: 'Library' },
  { icon: 'restore', text: 'History' },
  { icon: 'watch_later', text: 'Watch later' },
  { icon: 'thumb_up_alt', text: 'Liked videos' },
];
export const firebaseMenu: MenuType[] = [
  { icon: 'table_view', text: 'Firestore Database', to: '/firebase/database' },
  { icon: 'view_list', text: 'Board', to: '/firebase/board' },
  { icon: 'drive_folder_upload', text: 'File Board', to: '/firebase/file' },
];
export const quasarMenu: MenuType[] = [
  { icon: 'description', text: 'Form', to: '/quasar/form' },
];

export const nuxtMenu: MenuType[] = [
  { icon: 'nutrition', text: 'pinia', to: '/nuxt/pinia' },
];
