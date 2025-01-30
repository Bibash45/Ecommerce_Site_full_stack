import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
    }),
    confirmEmail: builder.mutation({
      query: (data) => ({
        url: `/confirmation/${data}`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, name, email, image, address, token }) => ({
        url: `/updateuser/${userId}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: { name, email, address, image },
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `/forgotpassword`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: ({ token }) => ({
        url: "/userlist",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),

    getUserDetails: builder.query({
      query: (userId) => ({
        url: `/userdetails/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `/forgotpassword`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/resetpassword/`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useConfirmEmailMutation,
  useUpdateUserMutation,
} = usersApiSlice;
