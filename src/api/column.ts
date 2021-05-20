import request from "../utils/request";

// 获取专栏列表
export function fethchColumns(page: number, size: number) {
  return request(
    "/columns",
    "get",
    {
      currentPage: page,
      pageSize: size
    },
    {
      cache: true
    }
  );
}

// 获取专栏详情
export function fethchColumn(columnId: string) {
  return request(`/columns/${columnId}`, "get", null, {
    cache: true
  });
}

// 更新专栏信息
export function updateColumn(columnInfo: {
  title?: string;
  description?: string;
  avatar?: string;
}) {
  return request("/columns", "patch", columnInfo);
}
