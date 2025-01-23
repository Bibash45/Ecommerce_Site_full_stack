import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    onCashOrder: builder.mutation({
      query: ({ orderDetails, token }) => ({
        url: `/postorder`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
    getMyOrders: builder.query({
      query: ({ userId, token }) => ({
        url: `/userOrders/${userId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Orders"],
      keepUnusedDataFor: 5,
    }),
    getAllOrders: builder.query({
      query: ({ token }) => ({
        url: `/orderlist`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Orders"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useOnCashOrderMutation,
  useGetAllOrdersQuery,
} = orderApiSlice;
