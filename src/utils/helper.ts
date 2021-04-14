import { AvatarProps, ColumnProps, UserProps } from "../types/types";
// 将 [ {_id:"xxxx"} ] 转化为 {_id:{_id:"xxxx"}}
export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current;
    }
    return prev;
  }, {} as { [key: string]: T });
};

/**
 * @example 生成的链接为：原 URL 加 "?x-oss-process=image/resize,m_pad,h_50,w_50"
 * @description 根据参数生成合适大小的图片 URL，并将该值添加到目标对象的 fitUrl 属性上
 * @param width 目标缩放图的宽度
 * @param height 目标缩放图的高度
 * @param format 指定缩放模式
 * @see https://help.aliyun.com/document_detail/44688.html
 */
export function generateFitUrl(
  data: AvatarProps,
  width: number,
  height: number,
  format = ["m_pad"]
) {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + "," + prev;
    }, "");
    data.fitUrl =
      data.url +
      `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`;
  }
}

/**
 * @description 当专栏或者用户包含 avatar 时，生成大小合适的图片 URL，并将该值添加到 avatar 的 fitUrl 属性上
 * 当不包含 avatar 时，则使用新建一个包含 fitUrl 属性的对象，fitUrl 的值为本地默认图片
 * @param data 专栏相关信息或者用户相关信息
 * @param width 目标缩放图的宽度
 * @param height 目标缩放图的高度
 */
export function addColumnAvatar(
  data: ColumnProps | UserProps,
  width: number,
  height: number
) {
  if (data && data.avatar) {
    generateFitUrl(data.avatar, width, height);
  } else {
    // NOTE: 如何判断联合类型中的某个具体类型？
    // 此处利用了 ColumnProps 中存在 UserProps 中不存在 title 属性的条件
    // 将 data 断言为 ColumnProps 再做判断
    const parseColumn = data as ColumnProps;
    const defaultAvatar = {
      fitUrl: parseColumn.title
        ? require("@/assets/column.jpg")
        : require("@/assets/avatar.jpg")
    };
    data.avatar = defaultAvatar;
  }
}

/**
NOTE：该函数的 TS 声明意思是
 arrToObj 接受一个参数，该参数类型为数组，内部元素类型为 T，且 T 上可能存在 _id 属性
 不添加 as { [key: string]: T } 会报错 No index signature with a parameter of type 'string' was found on type '{}'
 大意是说 {} 对象上没有指定 index signature parameter，需要指定 index signature parameter 原因详见
 [Index Signatures - TypeScript Deep Dive](https://basarat.gitbook.io/typescript/type-system/index-signatures#design-pattern-nested-index-signature)
 */
