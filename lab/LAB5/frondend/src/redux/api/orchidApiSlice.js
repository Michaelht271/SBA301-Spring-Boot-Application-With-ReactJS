import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

export const orchidApiSlice = createApi({
    reducerPath: "orchidApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["Orchid", "Category"],
    endpoints: (builder) => ({
        // Orchid endpoints
        getOrchids: builder.query({
            query: () => "/api/orchids",
            providesTags: (result = [], error, arg) => [
                "Orchid",
                ...result.map(({ orchidId }) => ({ type: "Orchid", id: orchidId })),
            ],
        }),
        getOrchidById: builder.query({
            query: (id) => `/api/orchids/${id}`,
            providesTags: (result, error, id) => [{ type: "Orchid", id }],
        }),
        createOrchid: builder.mutation({
            query: (newOrchid) => ({
                url: "/api/orchids",
                method: "POST",
                body: newOrchid,
            }),
            invalidatesTags: ["Orchid"],
        }),
        updateOrchid: builder.mutation({
            query: ({ orchidId, ...orchid }) => ({
                url: `/api/orchids/${orchidId}`,
                method: "PUT",
                body: orchid,
            }),
            invalidatesTags: (result, error, { orchidId }) => [{ type: "Orchid", id: orchidId }, "Orchid"],
        }),
        deleteOrchid: builder.mutation({
            query: (id) => ({
                url: `/api/orchids/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Orchid"],
        }),
        
        // Category endpoints
        getCategories: builder.query({
            query: () => "/api/categories",
            providesTags: ["Category"],
        }),
    }),
});

export const {
    useGetOrchidsQuery,
    useGetOrchidByIdQuery,
    useCreateOrchidMutation,
    useUpdateOrchidMutation,
    useDeleteOrchidMutation,
    useGetCategoriesQuery,
} = orchidApiSlice;
