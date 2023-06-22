class Api {

  url = 'http://localhost:3668/v1';
  token = "";
  context;

  constructor(context) {
    this.context = context;
  }

  async authenticate(authentication){
    const authenticated =  await this.send('signIn', authentication);
    if (authenticated){
      this.token = authenticated.token;
    }else{
      console.error('Authentication Failure')
    }
  }

  async send(command, configuration){
    const data = { token: this.token, command, configuration };
    const response = await fetch(this.url, { method: 'post', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} });
    const jsonData = await response.json();
    return jsonData;
  }

}

const handler = {
  get(obj, prop, receiver) {
    if (prop in obj) {
      return Reflect.get(obj, prop, receiver);
    }else if (prop === 'then') {
      return null; // caused by interaction with promises
    } else {
      return (args) => obj.send(prop, args);
     }
  }
}

export default async function(authentication, context){
  const api = new Api(context);
  await api.authenticate(authentication);
  const papi = new Proxy(api, handler);
  return papi;
}
