import { AvatarProps, ColumnProps } from "../types/types";

export default function addColumnAvatar(column: ColumnProps) {
  const defaultAvatar: AvatarProps = {
    url: require("@/assets/defaultImg.jpg")
  };
  column.avatar = defaultAvatar;
}
