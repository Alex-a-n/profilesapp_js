import { defineFunction } from '@aws-amplify/backend';

export const getBooks = defineFunction({
    name: 'get-books',
    entry: './handler.ts',
});