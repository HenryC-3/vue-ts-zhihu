import request from "../utils/request";

// 创建一篇文章
export function createPost(post: {
  title: string;
  description: string;
  avatar: string;
}) {
  return request("/posts", "post", post);
}

// 修改一篇文章
export function modifyPost(postId: string, post: string) {
  return request(`/posts/${postId}`, "patch", post);
}

/**
 * @description 获取对应专栏文章
 * @param columnId 专栏 id
 * @param page 页码数
 * @param size 每页文章数量
 */
export function fetchPosts(columnId: string, page: number, size: number) {
  return request(
    `/columns/${columnId}/posts`,
    "get",
    {
      currentPage: page,
      pageSize: size
    },
    { cache: true }
  );
}

// 获取一篇文章
export function fetchPost(postId: string) {
  return request(`/posts/${postId}`, "get", null, {
    cache: true
  });
}

// 删除一篇文章
export function deletePost(postId: string) {
  return request(`/posts/${postId}`, "delete");
}
