export const createRegisterSlice = (set) => ({
  registeredUser: null,
  setRegisteredUser: (email, password, confirmPassword) =>
    set({
      registeredUser: {
        email,
        password,
        confirmPassword,
        isAuthenticated: true,
      },
    }),
});
