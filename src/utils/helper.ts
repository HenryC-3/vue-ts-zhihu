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
NOTE：该函数的 TS 声明意思是
 arrToObj 接受一个参数，该参数类型为数组，内部元素类型为 T，且 T 上可能存在 _id 属性
 
 不添加 as { [key: string]: T } 会报错 No index signature with a parameter of type 'string' was found on type '{}'
 大意是说 {} 对象上没有指定 index signature parameter，需要指定 index signature parameter 原因详见
 [Index Signatures - TypeScript Deep Dive](https://basarat.gitbook.io/typescript/type-system/index-signatures#design-pattern-nested-index-signature)
 */
