import {isEmpty} from 'lodash-es';
export default async function main(object, list){

  const tooMuch = false;

  if(!tooMuch){
    return {denied: false};
  }else{
    return {denied: true, message: 'Argument list must be empty, no input allowed.'};
  }
}
