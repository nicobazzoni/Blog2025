// schema.js
import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import { schemaTypes as customSchemaTypes } from './schemaTypes';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat(customSchemaTypes),
});