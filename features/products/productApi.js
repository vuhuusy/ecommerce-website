import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ search, skip, sort, searchByCategory, limit }) => ({
        url: `/products?search=${search}&skip=${skip}&sort=${sort}&searchByCategory=${searchByCategory}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),

    postNewProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),

    updateProductById: builder.mutation({
      query: (data) => ({
        url: `/products/${data._id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  usePostNewProductMutation,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductByIdMutation,
  useDeleteProductByIdMutation,
} = productApi;
