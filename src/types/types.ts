export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

export interface RuleProp {
  type: "required" | "email";
  message: string;
}

export type RulesProp = RuleProp[];

export type validateFunc = () => boolean;

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface PostProps {
  id: number;
  title: string;
  content: string;
  img?: string;
  createdAt: string;
  columnId: number;
}

export interface GlobalStore {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
