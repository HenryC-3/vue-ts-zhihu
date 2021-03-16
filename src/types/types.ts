export interface ColumnProps {
  id: number;
  title: string;
  avatar?: AvatarProps;
  description: string;
}

export interface AvatarProps {
  _id?: string;
  url?: string;
  createdAt?: string;
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
  columnId?: number;
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

export type TagType = "input" | "textarea";
