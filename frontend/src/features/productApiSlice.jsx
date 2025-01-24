import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `/productlist`,
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `/productdetails/${productId}`,
      }),
      providesTags: (result, error, productId) => [
        { type: "Products", id: productId },
      ],
      keepUnusedDataFor: 5,
    }),
    deleteProduct: builder.mutation({
      query: ({ token, productId }) => ({
        url: `/deleteproduct/${productId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result, error, productId) => [
        { type: "Products", id: productId },
      ],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useDeleteProductMutation,
} = productsApiSlice;
