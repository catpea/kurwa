import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {

    if (params.user.startsWith('@')) {
      
      if (params.user === '@meow') {
          return {
              title: 'Meow Storefront',
              content: 'Welcome to our store featuring exclusive AI generated art.'
          };
      }

    }

    throw error(404, 'Not found');
}
