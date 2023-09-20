interface Image {
  id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  key: string;
  post: Post;
}

interface Tab {
  id: number;
  title: string;
  type: string;
  group?: Group;
  groupId?: number;
}

export interface Group {
  id: number;
  title: string;
  intro: string;
  rule: string;
  tabs: Tab;
  image?: Image;
  imageId?: number;
  createdAt: string;
  updatedAt: string;
  post: Post;
}

export interface Post {
  id: number;
  image?: Image;
  imgageId?: number;
  contents: string;
  group: Group;
  groupId: number;
  createdAt: string;
  updatedAt: string;
  comment: Comment;
  userId: number;
}

interface Comment {
  id: number;
  post: Post;
  postId: number;
  text: string;
}

export interface MindsType {
  mindId: number;
  mindTypeName: string;
  name: string;
  introduce: string;
  userCount: number;
  pageImage: string;
  introImage?: string;
  writeFormat?: string;
  isDoneToday?: boolean;
  count?: number;
  canJoin?: number;
}
