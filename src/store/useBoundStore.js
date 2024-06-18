import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createFilterSlice } from "./slices/createFilterSlice";
import { createLoginSlice } from "./slices/createLoginSlice";
import { createRegisterSlice } from "./slices/createRegisterSlice";

export const useBoundStore = create(
  devtools((...a) => ({
    ...createFilterSlice(...a),
    ...createLoginSlice(...a),
    ...createRegisterSlice(...a),
  }))
);
