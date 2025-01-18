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
    
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  
} = productsApiSlice;
