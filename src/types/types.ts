export interface ColumnProps {
  _id: number;
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

export interface ImageProps {
  _id: string;
  url: string;
  createdAt: string;
}
export interface PostProps {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: ImageProps;
  createdAt: string;
  columnId: number;
}

export interface GlobalStore {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

export type TagType = "input" | "textarea";
