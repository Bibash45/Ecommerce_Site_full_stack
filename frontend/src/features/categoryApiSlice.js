import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: ({ token }) => ({
        url: "/categorylist",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
    postCategory: builder.mutation({
      query: ({ category, token }) => ({
        url: "/postcategory",
        body: category,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
    deleteCategory: builder.mutation({
      query: ({ categoryId, token }) => ({
        url: `/deletecategory/${categoryId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetCategoryQuery,
  usePostCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
