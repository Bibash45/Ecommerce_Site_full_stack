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
    createProduct: builder.mutation({
      query: (data) => ({
        url: `postproduct`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"], // Updated to match the tag used in `getProducts`
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/updateproduct/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/uploadImage`, // Add the actual endpoint for image upload
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/deleteproduct/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `/product/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Products", id: data.productId },
      ],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `/topproducts`, // Add the actual endpoint for top products
      }),
      providesTags: ["TopProducts"], // Use a separate tag for top products if needed
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice;
