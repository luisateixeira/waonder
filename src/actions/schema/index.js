import {schema} from 'normalizr';

const citySchema = new schema.Entity('cities', {}, {
  idAttribute: (entity, parent) => (entity.name || parent.name).replace(/ /g, '-').toLowerCase()
});

const countrySchema = new schema.Entity('countries', { capital: citySchema }, {
    idAttribute: (entity) => entity.name.replace(/ /g, '-').toLowerCase(),
    processStrategy: (entity) => {
      return {...entity, capital: {name: entity.capital, country: entity.name.replace(/ /g, '-').toLowerCase()}};
    }
});

export const countryListSchema = [countrySchema];


const videoSchema = new schema.Entity('videos');
export const videoListSchema = [videoSchema];
