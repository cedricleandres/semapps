const { ServiceSchemaError } = require('moleculer').Errors;

class TripleStoreAdapter {
  constructor(baseUri) {
    this.baseUri = baseUri;
  }

  init(broker, service) {
    this.broker = broker;
    this.service = service;

    if (!this.service.schema.collection) {
      throw new ServiceSchemaError('Missing `collection` definition in schema of service!');
    }

    this.containerUri = this.baseUri + '/' + this.service.schema.collection + '/';
  }

  connect() {
    // this.client = new MongoClient(this.uri, this.opts);
    // return this.client.connect().then(() => {
    //   this.db = this.client.db(this.dbName);
    //   this.collection = this.db.collection(this.service.schema.collection);
    //
    //   this.service.logger.info("MongoDB adapter has connected successfully.");
    //
    //   /* istanbul ignore next */
    //   this.db.on("close", () => this.service.logger.warn("MongoDB adapter has disconnected."));
    //   this.db.on("error", err => this.service.logger.error("MongoDB error.", err));
    //   this.db.on("reconnect", () => this.service.logger.info("MongoDB adapter has reconnected."));
    // });
    return Promise.resolve();
  }

  disconnect() {
    // if (this.client) {
    //   this.client.close();
    // }
    return Promise.resolve();
  }

  /**
   * Find all entities by filters.
   *
   * Available filter props:
   * 	- limit
   *  - offset
   *  - sort
   *  - search
   *  - searchFields
   *  - query
   */
  find(filters) {
    return this.broker.call('ldp.standardContainer', {
      containerUri: this.containerUri + '/',
      accept: 'application/ld+json'
    });
  }

  /**
   * Find an entity by query
   */
  findOne(query) {
    // return this.collection.findOne(query);
  }

  /**
   * Find an entity by ID.
   */
  findById(_id) {
    return this.broker.call('ldp.get', { resourceUri: _id, accept: 'application/ld+json' });
  }

  /**
   * Find all entites by IDs
   */
  findByIds(ids) {
    // return new Promise((resolve, reject) => {
    //   this.db.find({ _id: { $in: ids } }).exec((err, docs) => {
    //     /* istanbul ignore next */
    //     if (err)
    //       return reject(err);
    //
    //     resolve(docs);
    //   });
    //
    // });
  }

  /**
   * Get count of filtered entites
   *
   * Available filter props:
   *  - search
   *  - searchFields
   *  - query
   */
  count(filters = {}) {}

  /**
   * Insert an entity
   */
  insert(entity) {
    return this.broker.call('ldp.post', {
      containerUri: this.containerUri,
      ...entity
    });
  }

  /**
   * Insert multiple entities
   */
  insertMany(entities) {
    // return this.db.insert(entities);
  }

  /**
   * Update many entities by `query` and `update`
   */
  updateMany(query, update) {
    // return this.db.update(query, update, { multi: true }).then(res => res[0]);
  }

  /**
   * Update an entity by ID
   */
  updateById(_id, update) {
    // return this.db.update({ _id }, update, { returnUpdatedDocs: true }).then(res => res[1]);
  }

  /**
   * Remove many entities which are matched by `query`
   */
  removeMany(query) {
    // return this.db.remove(query, { multi: true });
  }

  /**
   * Remove an entity by ID
   */
  removeById(_id) {
    // return this.db.remove({ _id });
  }

  /**
   * Clear all entities from DB
   */
  clear() {
    // return this.db.remove({}, { multi: true });
  }

  /**
   * Convert DB entity to JSON object
   */
  entityToObject(entity) {
    return entity;
  }

  /**
   * Transforms 'idField' into MongoDB's '_id'
   */
  beforeSaveTransformID(entity, idField) {
    return entity;
  }

  /**
   * Transforms MongoDB's '_id' into user defined 'idField'
   */
  afterRetrieveTransformID(entity, idField) {
    return entity;
  }
}

module.exports = TripleStoreAdapter;