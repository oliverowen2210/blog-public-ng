export interface Post {
  id: number;
  title: string;
  createdAt: Date;
  commentCount: number;
  isNew?: boolean;
  text: string;
}
