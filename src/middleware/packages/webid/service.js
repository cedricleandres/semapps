const { MIME_TYPES } = require('@semapps/mime-types');
const getRoutes = require('./getRoutes');

const WebIdService = {
  name: 'webid',
  dependencies: ['ldp.resource', 'triplestore'],
  settings: {
    usersContainer: null,
    context: {
      foaf: 'http://xmlns.com/foaf/0.1/'
    },
    defaultAccept: 'text/turtle'
  },
  actions: {
    /**
     * This should only be called after the user has been authenticated
     */
    async create(ctx) {
      let { email, nick, name, familyName, homepage } = ctx.params;

      if (!email) throw new Error('Unable to create profile, email parameter is missing');
      if (!nick) nick = email.split('@')[0].toLowerCase();
      // Check if an user already exist with this email address
      let webId = await this.actions.findByEmail({ email });
      // If no user exist, create one
      if (!webId) {
        const userData = {
          nick,
          email,
          name,
          familyName,
          homepage
        };
        webId = await ctx.call('ldp.resource.post', {
          resource: {
            '@context': {
              '@vocab': 'http://xmlns.com/foaf/0.1/'
            },
            '@type': 'Person',
            ...userData
          },
          slug: nick,
          containerUri: this.settings.usersContainer,
          contentType: MIME_TYPES.JSON
        });

        let newPerson = await ctx.call('ldp.resource.get', {
          resourceUri: webId,
          accept: MIME_TYPES.JSON,
          jsonContext: this.settings.context,
          webId
        });

        ctx.emit('webid.created', newPerson);
      }

      return webId;
    },
    async view(ctx) {
      const webId = await this.getWebId(ctx);

      if (webId) {
        return await ctx.call('ldp.resource.get', {
          resourceUri: webId,
          accept: MIME_TYPES.JSON,
          jsonContext: this.settings.context,
          webId: webId
        });
      } else {
        ctx.meta.$statusCode = 404;
      }
    },
    async edit(ctx) {
      let { userId, ...body } = ctx.params;
      const webId = await this.getWebId(ctx);
      body['@id'] = webId;
      return await ctx.call('ldp.resource.patch', {
        resource: body,
        webId: webId,
        contentType: MIME_TYPES.JSON,
        accept: MIME_TYPES.JSON
      });
    },
    async list(ctx) {
      const accept = ctx.meta.headers.accept || this.settings.defaultAccept;
      const request = `
      PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      CONSTRUCT {
        ?s ?p ?o
      }
      WHERE{
        ?s a foaf:Person;
           ?p ?o.
      }
      `;
      return await ctx.call('triplestore.query', {
        query: request,
        webId: ctx.meta.webId,
        accept: accept
      });
    },
    async findByEmail(ctx) {
      const { email } = ctx.params;

      const results = await ctx.call('triplestore.query', {
        query: `
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          SELECT ?webId
          WHERE {
            ?webId rdf:type foaf:Person ;
                   foaf:email "${email}" .
          }
        `,
        accept: MIME_TYPES.JSON
      });

      return results.length > 0 ? results[0].webId.value : null;
    },
    getUsersContainer(ctx) {
      return this.settings.usersContainer;
    },
    getApiRoutes(ctx) {
      return getRoutes();
    }
  },
  methods: {
    async getWebId(ctx) {
      if (ctx.params.userId) {
        // If an userId is specified, use it to find the webId
        return this.settings.usersContainer + ctx.params.userId;
      } else {
        if (ctx.meta.tokenPayload.webId) {
          // If the webId is in the token
          return ctx.meta.tokenPayload.webId;
        } else {
          // Find the webId by the user's email address
          return this.actions.findByEmail({ email: ctx.meta.tokenPayload.email });
        }
      }
    }
  }
};

module.exports = WebIdService;
