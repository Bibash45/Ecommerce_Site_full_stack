import { apiSlice } from "./apiSlice";

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWishlist: builder.mutation({
      query: ({ productId, userId, token }) => ({
        url: `/wishlist`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: { productId, userId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
    getMyWishlist: builder.query({
      query: ({ userId, token }) => ({
        url: `/wishlist/${userId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Wishlist"],
      keepUnusedDataFor: 5,
    }),
    deleteMyWishlist: builder.mutation({
      query: ({ token, userId, productId }) => ({
        url: `/wishlist/${userId}/${productId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Wishlist"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateWishlistMutation,
  useGetMyWishlistQuery,
  useDeleteMyWishlistMutation,
} = wishlistApiSlice;
