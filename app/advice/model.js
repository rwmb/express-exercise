import { Model } from 'objection';

class Advice extends Model {
  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  static get tableName() {
    return 'advices';
  }
}

// TODO: using TS here would be better
// so we can protect the props types, but we can also
// use JSDoc to document the props or depend on the ORM to validate them
const insertAdvice = async (props) => {
  // returning await would be better for error handling
  // and to make sure the query is done before returning

  // here we can also monitor the operation using a logger
  return Advice.query()
    .insert(props)
    .onConflict('api_id')
    .ignore()
    .returning('*');
};

export { Advice as default, insertAdvice };
