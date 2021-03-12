import { ColumnProps, UserProps, PostProps } from "../types/types";

export const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1的专栏",
    description: "这是的test1专栏，有一段非常有意思的简介，可以更新一下欧"
    // avatar:"http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100"
  },
  {
    id: 2,
    title: "test2的专栏",
    description: "这是的test2专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100"
  },
  {
    id: 3,
    title: "test3的专栏",
    description: "这是的test3专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100"
  },
  {
    id: 4,
    title: "test4的专栏",
    description: "这是的test4专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100"
  }
];

export const testUserData: UserProps = {
  isLogin: true,
  name: "Henry",
  id: 9527
};

export const testPostData: PostProps[] = [
  {
    id: 1,
    title: "test1的文章",
    content: "这是的test1 文章，有一段非常有意思的简介，可以更新一下欧",
    img:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
    createdAt: "2020-09-10",
    columnId: 1
  },
  {
    id: 2,
    title: "test2的文章",
    content: "这是的test2 文章，有一段非常有意思的简介，可以更新一下欧",
    img:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
    createdAt: "2020-09-10",
    columnId: 2
  },
  {
    id: 3,
    title: "test3的文章",
    content: "这是的test3 文章，有一段非常有意思的简介，可以更新一下欧",
    img:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
    createdAt: "2020-09-10",
    columnId: 3
  },
  {
    id: 4,
    title: "test4的文章",
    content: "这是的test4 文章，有一段非常有意思的简介，可以更新一下欧",
    img:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
    createdAt: "2020-09-10",
    columnId: 4
  },
  {
    id: 5,
    title: "test5的文章",
    content: "这是的test5 文章，有一段非常有意思的简介，可以更新一下欧",
    img:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
    createdAt: "2020-09-10",
    columnId: 5
  }
];
