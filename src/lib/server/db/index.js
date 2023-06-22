import knexConfig from '../../../../knexfile.js';
import Knex from 'knex';
import {Model} from 'objection';

class Account extends Model {
  static tableName = 'account'
  static get relationMappings() {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'account.id',
          to: 'user.account'
        }
      }
    };
  }
}

class User extends Model {
  static tableName = 'user'
  static get modelPaths() {
    return [__dirname];
  }

  static get relationMappings() {
    return {
      sessions: {
        relation: Model.HasManyRelation,
        modelClass: Session,
        join: {
          from: 'user.id',
          to: 'session.owner'
        }
      },
      playlists: {
        relation: Model.HasManyRelation,
        modelClass: Playlist,
        join: {
          from: 'user.id',
          to: 'playlist.owner'
        }
      }
    };
  }

  get name() {
    return `${this.firstname} ${this.middlename} ${this.lastname}`;
  }

}

class Session extends Model {
  static tableName = 'session'
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'session.owner',
          to: 'user.id'
        }
      }
    };
  }
}













class Node extends Model {
  static tableName = 'node'
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'node.owner',
          to: 'user.id'
        }
      },
    };
  }
}












const knex = Knex(knexConfig.development);

Model.knex(knex);

export { Account,User,Session, Node };
