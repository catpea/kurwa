export default async function main(input){

  if(this.user.active){
    return {denied: false};
  }else{
    return {denied: true, message: 'This user is not active.'};
  }

}
