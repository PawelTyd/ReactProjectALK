export const createLoginSlice = (set) => ({
  user: null,
  loginError: false,
  logout: () => set({ user: null }),
  setLoginError: (visibility) => {
    set({
      loginError: visibility,
    });
  },
  setUser: (email, password) =>
    set({
      user: {
        email,
        password,
        isAuthenticated: true,
      },
    }),
});
