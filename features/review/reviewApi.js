import { apiSlice } from "../api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query({
      query: (id) => ({
        url: `/product-reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),

    addProductReview: builder.mutation({
      query: (data) => ({
        url: `/product-reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;

      //     if (result.data.status === "success") {
      //       const { productId } = arg;
      //       dispatch(userWishList(productId));
      //     }
      //   } catch (err) {}
      // },
    }),
  }),
});

export const { useAddProductReviewMutation, useGetProductReviewsQuery } =
  reviewApi;
