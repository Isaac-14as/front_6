import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../models/IUser';

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/auth'}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        createUser: build.mutation<JSON, IUser>({
            query: (user) => ({
                url: '/register',
                method: 'POST',
                body: user,
            }),
            // invalidatesTags: ['User']
        }),

    })
})


