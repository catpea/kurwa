export default async function sayHello({name}){
  console.log(`Hello World, ${name||'bork'}`)
  return 'OKi!'
}
