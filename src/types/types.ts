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
  fitUrl?: string;
}
export interface RuleProp {
  type: "required" | "email";
  message: string;
}

export type RulesProp = RuleProp[];

export type validateFunc = () => boolean;

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  description?: string;
  avatar?: AvatarProps;
}
export interface PostProps {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: AvatarProps;
  createdAt: string;
  column: string;
  isHTML?: boolean;
  author?: string | UserProps;
}

export interface ErrorProps {
  status: boolean;
  message?: string;
}

export interface GlobalStore {
  error: ErrorProps;
  token: string;
  columns: ColumnProps[];
  posts: {
    data: ListProps<PostProps>;
  };
  user: UserProps;
  loading: boolean;
}

export interface ImageCheckCondition {
  type?: string[];
  size?: number;
}

export interface ListProps<T> {
  [key: string]: T;
}

export type ImageCheckErrorType = "format" | "size" | null;
export type TagType = "input" | "textarea";
export type MessageType = "success" | "error" | "default";
export type uploadingStatus = "ready" | "success" | "error" | "uploading";
