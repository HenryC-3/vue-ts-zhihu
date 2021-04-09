import { ImageCheckCondition, ImageCheckErrorType } from "@/types/types";

export default function imageCheck(file: File, condition: ImageCheckCondition) {
  const isValidFormat =
    condition.type?.includes(file.type) && file ? true : false;

  // NOTE:file.size 单位为 字节
  const isValidSize = file.size / 1024 / 1024 < Number(condition.size);
  let error: ImageCheckErrorType = null;

  if (!isValidFormat) error = "format";
  if (!isValidSize) error = "size";

  return {
    passed: isValidFormat && isValidSize,
    error: error
  };
}
