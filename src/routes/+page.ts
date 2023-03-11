import type { PageLoad } from './$types';


export const load = (() => {
    return {
        post: {
            title: `Title for goes here`,
            content: `Content for goes here`
        }
    };
}) satisfies PageLoad;
