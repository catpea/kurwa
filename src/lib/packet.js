import {pick} from "lodash-es";

export function flash(title, message, context="info"){
  const kind = 'flash';
  return {
    kind,
    title,
    message,
    context,
    }
}

export function session(session){
  const kind = 'session';
  return {
    kind,
    ...pick(session, ['token', 'expires'])
  }
}

export function user(input){
  const kind = 'user';
  return {
    kind,
    ...pick(input, ['name', 'username', 'email', 'position'])
  }
}

export function code(id){
  const kind = 'code';
  return {
    kind,
    code:id
  };
}
