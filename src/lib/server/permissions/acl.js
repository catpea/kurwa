const actors = {
  programmer: ['administrator'],
  anonymous: [],
  registered: [],
  administrator: ['registered'],
}

const abilities = {
  anonymous: ['sign-up', 'sign-in'],
  registered: ['profile:*', 'sign-out'],
  administrator: ['administration:*', 'view:diagnostics', 'list:db'],
  programmer: ['programming:*'],
}

export {
  actors,
  abilities,
}
