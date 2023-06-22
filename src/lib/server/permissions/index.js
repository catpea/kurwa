import { abilities, actors } from './acl.js';

class Acl {
  abilities;
  actors;
  permissionChart;
  constructor(actors, abilities){
    this.abilities = abilities;
    this.actors = actors;
    this.permissionChart = this.resolveAbilities();
    //console.log(this.permissionChart);
  }
  resolveAbilities(){
    const chart = {};
    const detailedAbilities = this.inflateAbilities();
    for (const actor in this.actors) {
      if(!chart[actor]) chart[actor] = [];
      const subordinates = this.getSubordinates(actor);
      for (const ability of detailedAbilities[actor]) {
        if(!chart[actor].includes(ability)) chart[actor].push(ability);
      }
      for (const subordinate of subordinates) {
        for (const ability of detailedAbilities[subordinate]) {
          if(!chart[actor].includes(ability)) chart[actor].push(ability);
        }
      }
    }
    return chart;
  }
  getSubordinates(actor, data = []){
    for (const inherited of this.actors[actor]) {
      if(!data.includes(inherited)) data.push(inherited)
      this.getSubordinates(inherited, data);
    }
    return data;
  }
  inflateAbilities(){
    const abilities = {};
    for (const actor in this.abilities) {
      for (const ability of this.abilities[actor]) {
        let resolved = ability;
        if(!resolved.includes(':')) resolved = '*:'+resolved;
        if(!abilities[actor]) abilities[actor] = [];
        abilities[actor].push(resolved);
      }
    }
    return abilities;
  }
  allow(user, ...requests){
    if(!user){
      return {
        denied: true,
        title: 'Access Denied',
        message: `User information is not available.`
      }
    }
    const groups = user.groups.split(/\W/).filter(i=>i);
    let allowed = [];
    let denied = [];
    for (const group of groups) {
      for (let request of requests) {
        if(!request.includes(':')) request = '*:' + request;
        let [action, target] = request.split(':');
        if(this.permissionChart[group].includes('*:'+target)){
          allowed.push(request);
          continue;
        }
        if(this.permissionChart[group].includes(request)){
          allowed.push(request);
        }else{
          denied.push(request);
        }
      }
    }
    const requestDenied = (denied.length > 0);
    if(requestDenied){
      return {
        denied: true,
        title: 'Access Denied',
        message: `You are not allowed to: ${denied.join(', ')}`
      }
    }else{
      return {
        denied: false,
        title: 'Access Granted',
        message: `You are allowed to: ${allowed.join(', ')}`
      }
    }
  }
  flash(input){
    return {flash:{title:input.title, message:input.message, context:'danger'}}
  }

}

export const permissions = new Acl(actors, abilities);
