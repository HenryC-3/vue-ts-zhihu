import { Params } from "@/types/types";
import { ComputedRef, ref } from "vue";
import { useStore } from "vuex";

/**
 * @description 适用于实现专栏、文章列表的“加载更多”功能
 * @param actionName vuex action 名称
 * @param params url 参数
 * @param.page，page 初始分页页码，默认为 1
 * @param.size number 本次请求专栏数量，默认为 5
 * @param currentCount vuex 中已经获取到的专栏数量
 * @returns {Ref<boolean>} isLastPage 是否为最后一页，用于决定 “加载更多”按钮的显隐
 * @returns {function} loadMorePage 触发 vuex action
 * @see currentCount 的参数怪异是因为从 setup 返回的 refs 在模板中访问时是被自动解开的
 * [Setup | Vue.js](https://v3.cn.vuejs.org/guide/composition-api-setup.html#%E7%BB%93%E5%90%88%E6%A8%A1%E6%9D%BF%E4%BD%BF%E7%94%A8)
 */

const useLoadMore = (
  actionName: string,
  params: Params = { page: 1, size: 5 },
  currentCount: { count: ComputedRef }
) => {
  const store = useStore();
  const isLastPage = ref(false);
  const { count } = currentCount;
  const loadMorePage = () => {
    store.dispatch(actionName, params).then(res => {
      params.page++;
      // 本地文章或专栏的总数小于实际的总数，则意味着还未到最后一页
      isLastPage.value = count.value < res.data.count ? false : true;
    });
  };

  return {
    isLastPage,
    loadMorePage
  };
};

export default useLoadMore;
