// windi.config.ts
import { defineConfig } from "windicss/helpers";

export default defineConfig({
  theme: {
    extend: {
      boxShadow: {
        "x-sm": "0 5px 0 rgba(156, 163, 175, 0.5)"
      }
    }
  },
  plugins: [require("windicss/plugin/line-clamp")],
  shortcuts: {
    btn:
      "block w-24 h-9 text-sm bg-white border[2px] py-2 px-4 rounded text-center overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer",
    "btn-gray": "text-gray-600 border-gray-600 hover:bg-gray-100",
    "btn-green": "text-green-600 border-green-600 hover:bg-green-100",
    "btn-light-blue":
      "text-light-blue-600 border-light-blue-600 hover:bg-light-blue-100",
    "btn-red": "text-red-600 border-red-600 hover:bg-red-100",
    mask: "fixed top-0 bottom-0 w-[100%] z-999 bg-gray-400 bg-opacity-50"
  }
});
