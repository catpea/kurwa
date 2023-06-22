import {isEmpty} from 'lodash-es';
export default async function main(object, list){
  if(list.length===0){
    return {denied: false};
  }else{
    return {denied: true, message: 'Argument list must be empty, no input allowed.'};
  }
}
