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
  }),
});

export const { useGetCategoryQuery } = categoryApiSlice;
