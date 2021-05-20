import request from "../utils/request";

export function fileUpload(formData: FormData) {
  return request(
    "/upload",
    "post",
    formData,
    { loading: false, cache: false, error: true },
    { headers: { "Content-Type": "multipart/form-data" } }
  );
}
