import * as filestack from 'filestack-js';

export const client = filestack.init(import.meta.env.VITE_FILESTACK_SECRET);