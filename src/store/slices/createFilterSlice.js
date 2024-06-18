export const createFilterSlice = (set) => ({
  originalUsers: [],
  users: [],

  setUsers: (fetchArray) => set({ users: fetchArray }),
  setOriginalUsers: (fetchArray) => set({ originalUsers: fetchArray }),
});
