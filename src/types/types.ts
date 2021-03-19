export interface ColumnProps {
  _id: string;
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
  token: string;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
}

export type TagType = "input" | "textarea";
