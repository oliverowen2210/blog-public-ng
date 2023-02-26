export interface BlogComment {
  createdAt: Date;
  id: number;
  postid: number;
  text: string;
  updatedAt: Date;
  username: string;
  isNew?: Boolean;
}
