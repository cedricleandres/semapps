const { ServiceBroker } = require('moleculer');
const EventsWatcher = require('./middleware/EventsWatcher');
const createServices = require('../createServices');
const CONFIG = require('../config');

jest.setTimeout(22000);

const broker = new ServiceBroker({
  // logger: false,
  middlewares: [EventsWatcher]
});

beforeAll(async () => {
  createServices(broker);

  await broker.start();

  await broker.call('fuseki-admin.initDataset', {
    dataset: CONFIG.MAIN_DATASET
  });

  await broker.call('triplestore.dropAll');
  await broker.call('activitypub.activity.clear');
  await broker.call('activitypub.collection.clear');
});

afterAll(async () => {
  await broker.stop();
});

describe('Posting to followers', () => {
  let simon, sebastien;

  test('Create actor directly', async () => {
    sebastien = await broker.call('activitypub.actor.create', {
      slug: 'srosset81',
      preferredUsername: 'srosset81',
      name: 'Sébastien Rosset'
    });

    expect(sebastien.preferredUsername).toBe('srosset81');
  }, 20000);

  test('Create actor through WebID', async () => {
    const simonId = await broker.call('webid.create', {
      email: 'simon.louvet.zen@gmail.com',
      nick: 'simonLouvet',
      name: 'Simon',
      familyName: 'Louvet'
    });

    await broker.watchForEvent('actor.created');

    simon = await broker.call('activitypub.actor.get', {
      id: simonId
    });

    expect(simon.inbox).toBe(simonId + '/inbox');
    expect(simon.outbox).toBe(simonId + '/outbox');
    expect(simon.followers).toBe(simonId + '/followers');
    expect(simon.following).toBe(simonId + '/following');
  }, 20000);

  test('Post follow request', async () => {
    const result = await broker.call('activitypub.outbox.post', {
      username: sebastien.preferredUsername,
      '@context': 'https://www.w3.org/ns/activitystreams',
      actor: sebastien.id,
      type: 'Follow',
      object: simon.id
    });

    // Wait for actor to be added to the followers collection
    await broker.watchForEvent('activitypub.follow.added');

    expect(result.type).toBe('Follow');
  }, 10000);

  test('Get followers list', async () => {
    const result = await broker.call('activitypub.follow.listFollowers', {
      username: simon.preferredUsername
    });

    expect(result.items).toContain(sebastien.id);
  });

  test('Send message to followers', async () => {
    const result = await broker.call('activitypub.outbox.post', {
      username: simon.preferredUsername,
      '@context': 'https://www.w3.org/ns/activitystreams',
      type: 'Note',
      name: 'Hello World',
      attributedTo: simon.id,
      to: [simon.followers],
      content: 'Voilà mon premier message, très content de faire partie du fedivers !'
    });

    // Wait for message to be received by all followers
    await broker.watchForEvent('activitypub.inbox.received');

    expect(result).toHaveProperty('type', 'Create');
    expect(result).toHaveProperty('object');
  });

  test('Find message in inbox', async () => {
    const result = await broker.call('activitypub.inbox.list', {
      username: sebastien.preferredUsername
    });

    expect(result.orderedItems).toHaveLength(1);
  });
});
