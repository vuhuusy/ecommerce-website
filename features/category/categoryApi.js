import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategorys: builder.query({
      query: ({ search, skip }) => ({
        url: `/categorys?search=${search}&skip=${skip}`,
        method: "GET",
      }),
      providesTags: ["categorys"],
    }),

    postNewCategory: builder.mutation({
      query: (data) => ({
        url: `/categorys`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["categorys"],
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;

      //     if (result.data.data._id) {
      //       dispatch(
      //         apiSlice.util.updateQueryData(
      //           "getCategorys",
      //           undefined,
      //           (draft) => {
      //             draft.data.push(result.data.data);
      //           }
      //         )
      //       );
      //     }
      //   } catch (err) {
      //     console.log(err);
      //   }
      // },
    }),

    deleteCategoryById: builder.mutation({
      query: (id) => ({
        url: `/categorys/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categorys"],
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   const pathResult = dispatch(
      //     apiSlice.util.updateQueryData("getCategorys", undefined, (draft) => {
      //       const data = draft.data.filter((category) => category._id != arg);
      //       return { ...draft, data };
      //     })
      //   );

      //   try {
      //     await queryFulfilled;
      //   } catch (err) {
      //     pathResult.undo();
      //   }
      // },
    }),

    updateCategoryById: builder.mutation({
      query: (data) => ({
        url: `/categorys/${data._id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["categorys"],
    }),
  }),
});

export const {
  useGetCategorysQuery,
  usePostNewCategoryMutation,
  useDeleteCategoryByIdMutation,
  useUpdateCategoryByIdMutation,
} = categoryApi;
