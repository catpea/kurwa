import { deserialize } from '$app/forms';

async function execute({category, action, input}){
  const request = { category, action, input };
  const response = await fetch('/administrator/api?/api', { method: 'POST', body: JSON.stringify(request) });
  const result = deserialize(await response.text());

  console.log({request});
  console.log({result});
  return result;
}

const actionHandler = {
  get({category}, action, receiver) {
    if (action === 'then') {
      return null; // caused by interaction with promises
    } else {
      return (...input) => execute({category, action, input})
     }
  }
}

const categoryHandler = {
  get(blankObject, category) {
    if (category === 'then') {
      return null; // caused by interaction with promises
    } else {
      return new Proxy({category}, actionHandler)
     }
  }
}

const api = new Proxy({}, categoryHandler);
export default api;
