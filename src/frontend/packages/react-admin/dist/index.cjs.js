'use strict';
function e(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
Object.defineProperty(exports, '__esModule', { value: !0 });
var t = e(require('final-form-calculate')),
  r = e(require('jsonld')),
  n = require('react-admin'),
  o = e(require('react'));
function a(e) {
  return (a =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function(e) {
          return typeof e;
        }
      : function(e) {
          return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        })(e);
}
function i(e, t, r, n, o, a, i) {
  try {
    var c = e[a](i),
      u = c.value;
  } catch (e) {
    return void r(e);
  }
  c.done ? t(u) : Promise.resolve(u).then(n, o);
}
function c(e) {
  return function() {
    var t = this,
      r = arguments;
    return new Promise(function(n, o) {
      var a = e.apply(t, r);
      function c(e) {
        i(a, n, o, c, u, 'next', e);
      }
      function u(e) {
        i(a, n, o, c, u, 'throw', e);
      }
      c(void 0);
    });
  };
}
function u(e, t, r) {
  return (
    t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e
  );
}
function s() {
  return (s =
    Object.assign ||
    function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
      }
      return e;
    }).apply(this, arguments);
}
function l(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function(t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function p(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? l(Object(r), !0).forEach(function(t) {
          u(e, t, r[t]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
      : l(Object(r)).forEach(function(t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
        });
  }
  return e;
}
function f(e, t) {
  return (
    (function(e) {
      if (Array.isArray(e)) return e;
    })(e) ||
    (function(e, t) {
      if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(e))) return;
      var r = [],
        n = !0,
        o = !1,
        a = void 0;
      try {
        for (
          var i, c = e[Symbol.iterator]();
          !(n = (i = c.next()).done) && (r.push(i.value), !t || r.length !== t);
          n = !0
        );
      } catch (e) {
        (o = !0), (a = e);
      } finally {
        try {
          n || null == c.return || c.return();
        } finally {
          if (o) throw a;
        }
      }
      return r;
    })(e, t) ||
    d(e, t) ||
    (function() {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      );
    })()
  );
}
function d(e, t) {
  if (e) {
    if ('string' == typeof e) return m(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    return (
      'Object' === r && e.constructor && (r = e.constructor.name),
      'Map' === r || 'Set' === r
        ? Array.from(e)
        : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
        ? m(e, t)
        : void 0
    );
  }
}
function m(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function y(e) {
  if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
    if (Array.isArray(e) || (e = d(e))) {
      var t = 0,
        r = function() {};
      return {
        s: r,
        n: function() {
          return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };
        },
        e: function(e) {
          throw e;
        },
        f: r
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }
  var n,
    o,
    a = !0,
    i = !1;
  return {
    s: function() {
      n = e[Symbol.iterator]();
    },
    n: function() {
      var e = n.next();
      return (a = e.done), e;
    },
    e: function(e) {
      (i = !0), (o = e);
    },
    f: function() {
      try {
        a || null == n.return || n.return();
      } finally {
        if (i) throw o;
      }
    }
  };
}
var h = function(e, t) {
    var r = {};
    return (
      e.forEach(function(e) {
        return (r[e.prefix] = e.url);
      }),
      t
        ? (delete r[t],
          [
            e.find(function(e) {
              return e.prefix === t;
            }).context,
            r
          ])
        : r
    );
  },
  g = function(e) {
    var t = e.types,
      r = e.params,
      n = r.pagination,
      o = (r.sort, r.filter),
      a = e.ontologies,
      i = '';
    return (
      o.q &&
        o.q.length > 0 &&
        (i = '\n      {\n        SELECT ?s1\n        WHERE {\n          ?s1 ?p1 ?o1 .\n          FILTER regex(str(?o1), "'.concat(
          o.q,
          '")\n          FILTER NOT EXISTS {?s1 a ?o1}\n        }\n      }\n      '
        )),
      '\n    '
        .concat(
          (function(e) {
            return e
              .map(function(e) {
                return 'PREFIX '.concat(e.prefix, ': <').concat(e.url, '>');
              })
              .join('\n');
          })(a),
          '\n    CONSTRUCT { \n      ?s1 ?p2 ?o2\n    }\n    WHERE {\n      '
        )
        .concat(i, '\n      ?s1 a ?type .\n      FILTER( ?type IN (')
        .concat(
          t.join(', '),
          ") ) .\n      FILTER( (isIRI(?s1)) ) .\n      ?s1 ?p2 ?o2 .\n    }\n    # TODO try to make pagination work in SPARQL as this doesn't work.\n    # LIMIT "
        )
        .concat(n.perPage, '\n    # OFFSET ')
        .concat((n.page - 1) * n.perPage, '\n  ')
    );
  },
  b = function(e) {
    var t = e.resource,
      r = e.id,
      a = e.source,
      i = e.basePath,
      c = n.useReference({ reference: t, id: r }).referenceRecord;
    return c
      ? o.createElement(n.Link, { to: ''.concat(i, '/').concat(encodeURIComponent(r)) }, c[a])
      : o.createElement(n.LinearProgress, null);
  },
  v = function(e) {
    var t = (function(e) {
        switch (e.type) {
          case 'Create':
            return {
              description: "A posté l'actualité",
              reference: { resource: 'Note', id: e.object.id, value: e.object.name, basePath: '/Note' }
            };
          case 'Follow':
            return {
              description: "A suivi l'action",
              reference: { resource: 'Project', id: e.object, source: 'name', basePath: '/Project' }
            };
          default:
            return { description: "Type d'action inconnu" };
        }
      })(e.record),
      r = t.description,
      a = t.reference;
    return o.createElement(
      'span',
      null,
      r,
      ' ',
      a.value
        ? o.createElement(n.Link, { to: ''.concat(a.basePath, '/').concat(encodeURIComponent(a.id)) }, a.value)
        : o.createElement(b, a)
    );
  },
  w = function(e) {
    var t = e.ids,
      r = e.children;
    if (1 !== o.Children.count(r)) throw new Error('<ActorsList> only accepts a single child');
    var a = n
      .useGetMany('Actor', t)
      .data.filter(function(e) {
        return e;
      })
      .reduce(function(e, t) {
        return p(p({}, e), {}, u({}, t.id, t));
      }, {});
    return o.cloneElement(r, {
      resource: 'Actor',
      currentSort: { field: 'id', order: 'ASC' },
      data: a,
      ids: Object.keys(a),
      basePath: '/Actor'
    });
  },
  E = function(e) {
    return 'object' === a(e) && e['@value'] ? e['@value'] : e;
  };
(exports.ActivitiesGrid = function(e) {
  return o.createElement(
    n.Datagrid,
    e,
    o.createElement(n.DateField, { source: 'published', showTime: !0, label: 'Date' }),
    o.createElement(
      n.ReferenceField,
      { basePath: '/Actor', reference: 'Actor', source: 'actor', label: 'Acteur' },
      o.createElement(n.TextField, { source: 'name' })
    ),
    o.createElement(v, { label: 'Description' })
  );
}),
  (exports.ActivitiesList = function(e) {
    var t = e.children,
      r = e.source,
      a = e.record,
      i = void 0 === a ? {} : a;
    if (1 !== o.Children.count(t)) throw new Error('<ActivitiesList> only accepts a single child');
    var c = n.useQueryWithStore({ type: 'getList', resource: 'Activity', payload: { id: i[r] } }).data;
    if (!c) return null;
    var s = c.reduce(function(e, t) {
      return p(p({}, e), {}, u({}, t.id, t));
    }, {});
    return o.cloneElement(t, {
      resource: 'Activity',
      currentSort: { field: 'id', order: 'ASC' },
      data: s,
      ids: Object.keys(s),
      basePath: '/Activity'
    });
  }),
  (exports.ActivityDescription = v),
  (exports.ActorsGrid = function(e) {
    return o.createElement(
      n.Datagrid,
      s({ rowClick: 'show' }, e),
      o.createElement(n.TextField, { source: 'name', label: 'Nom' }),
      o.createElement(n.ShowButton, { basePath: '/Actor' })
    );
  }),
  (exports.CollectionList = function(e) {
    var t = e.children,
      r = e.source,
      a = e.record,
      i = n.useQueryWithStore({ type: 'getOne', resource: 'Collection', payload: { id: a[r] } }).data;
    return i && i.items.length > 0 ? o.createElement(w, { ids: i.items }, t) : null;
  }),
  (exports.DateField = function(e) {
    return o.createElement('span', null, E(e.record[e.source]).replace('T', ' '));
  }),
  (exports.DateTimeInput = function(e) {
    return o.createElement(
      n.DateTimeInput,
      s({}, e, {
        format: function(e) {
          if ((e = E(e))) return e.replace(' ', 'T');
        }
      })
    );
  }),
  (exports.JsonLdReferenceInput = function(e) {
    return o.createElement(
      n.ReferenceArrayInput,
      s({}, e, {
        format: function(t) {
          return t
            ? (Array.isArray(t) || (t = [t]),
              e.format && (t = e.format(t)),
              t.map(function(e) {
                return 'object' === a(e) ? e.id || e['@id'] : e;
              }))
            : t;
        }
      })
    );
  }),
  (exports.StringField = function(e) {
    var t = e.source,
      r = e.record,
      n = void 0 === r ? {} : r;
    return o.createElement('span', null, E(n[t]));
  }),
  (exports.UriInput = function(e) {
    return o.createElement(
      n.TextInput,
      s({}, e, {
        format: function(t) {
          return 'object' === a(t) && (t = t['@id']), e.format && (t = e.format(t)), t;
        }
      })
    );
  }),
  (exports.authProvider = function(e) {
    return {
      login: function(e) {
        return Promise.resolve();
      },
      logout: function() {
        localStorage.removeItem('token'), (window.location.href = ''.concat(e, 'auth/logout?global=true'));
      },
      checkAuth: function() {
        if (localStorage.getItem('token')) return Promise.resolve();
        var t = new URL(window.location);
        return (
          t.searchParams.has('token')
            ? (localStorage.setItem('token', t.searchParams.get('token')),
              t.searchParams.delete('token'),
              (window.location.href = t.toString()))
            : (window.location.href = ''.concat(e, 'auth?redirectUrl=') + encodeURI(window.location.href)),
          Promise.resolve()
        );
      },
      checkError: function(e) {
        return Promise.resolve();
      },
      getPermissions: function(e) {
        return Promise.resolve();
      }
    };
  }),
  (exports.copyValues = function(e) {
    for (var r = [], n = 0, o = Object.entries(e); n < o.length; n++) {
      var a = f(o[n], 2),
        i = a[0],
        c = a[1];
      r.push({
        field: i,
        updates: u({}, c, function(e) {
          return e;
        })
      });
    }
    return t.apply(void 0, r);
  }),
  (exports.dataProvider = function(e) {
    var t,
      n,
      o,
      i,
      u,
      s,
      l = e.sparqlEndpoint,
      f = e.httpClient,
      d = e.resources,
      m = e.ontologies,
      b = e.mainOntology;
    return {
      getList:
        ((s = c(
          regeneratorRuntime.mark(function e(t, n) {
            var o, a, i, c, u, s, p, y, v, w;
            return regeneratorRuntime.wrap(function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if ((d[t], !n.id && !n['@id'] && d[t].types)) {
                      e.next = 16;
                      break;
                    }
                    return (o = n.id || n['@id'] || d[t].containerUri), (e.next = 5), f(o);
                  case 5:
                    if (
                      ((a = e.sent),
                      (i = a.json),
                      (c = ['ldp:contains', 'as:orderedItems', 'orderedItems', 'as:items', 'items'].find(function(e) {
                        return i[e];
                      })))
                    ) {
                      e.next = 11;
                      break;
                    }
                    throw new Error('Unknown list type');
                  case 11:
                    return (
                      (u = i[c].map(function(e) {
                        return (e.id = e.id || e['@id']), e;
                      })),
                      n.pagination &&
                        (u = u.slice(
                          (n.pagination.page - 1) * n.pagination.perPage,
                          n.pagination.page * n.pagination.perPage
                        )),
                      e.abrupt('return', { data: u, total: i[c].length })
                    );
                  case 16:
                    return (
                      (s = g({ types: d[t].types, params: n, ontologies: m })),
                      (e.next = 19),
                      f(l, { method: 'POST', body: s })
                    );
                  case 19:
                    return (p = e.sent), (y = p.json), (e.next = 23), r.compact(y, h(m, b));
                  case 23:
                    if (((v = e.sent), 1 !== Object.keys(v).length)) {
                      e.next = 28;
                      break;
                    }
                    return e.abrupt('return', { data: [], total: 0 });
                  case 28:
                    if (v['@graph']) {
                      e.next = 32;
                      break;
                    }
                    return e.abrupt('return', { data: [v], total: 1 });
                  case 32:
                    return (
                      (w = v['@graph']
                        .map(function(e) {
                          return (e.id = e.id || e['@id']), e;
                        })
                        .slice(
                          (n.pagination.page - 1) * n.pagination.perPage,
                          n.pagination.page * n.pagination.perPage
                        )),
                      e.abrupt('return', { data: w, total: v['@graph'].length })
                    );
                  case 34:
                  case 'end':
                    return e.stop();
                }
            }, e);
          })
        )),
        function(e, t) {
          return s.apply(this, arguments);
        }),
      getOne:
        ((u = c(
          regeneratorRuntime.mark(function e(t, r) {
            var n, o;
            return regeneratorRuntime.wrap(function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), f(r.id);
                  case 2:
                    return (n = e.sent), ((o = n.json).id = o.id || o['@id']), e.abrupt('return', { data: o });
                  case 6:
                  case 'end':
                    return e.stop();
                }
            }, e);
          })
        )),
        function(e, t) {
          return u.apply(this, arguments);
        }),
      getMany:
        ((i = c(
          regeneratorRuntime.mark(function e(t, r) {
            var n, o, i, c, u, s;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      (n = []), (o = y(r.ids)), (e.prev = 2), o.s();
                    case 4:
                      if ((i = o.n()).done) {
                        e.next = 15;
                        break;
                      }
                      return (c = 'object' === a((c = i.value)) ? c['@id'] : c), (e.next = 9), f(c);
                    case 9:
                      (u = e.sent), ((s = u.json).id = s.id || s['@id']), n.push(s);
                    case 13:
                      e.next = 4;
                      break;
                    case 15:
                      e.next = 20;
                      break;
                    case 17:
                      (e.prev = 17), (e.t0 = e.catch(2)), o.e(e.t0);
                    case 20:
                      return (e.prev = 20), o.f(), e.finish(20);
                    case 23:
                      return e.abrupt('return', { data: n });
                    case 24:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              null,
              [[2, 17, 20, 23]]
            );
          })
        )),
        function(e, t) {
          return i.apply(this, arguments);
        }),
      getManyReference: function(e, t) {
        throw new Error('getManyReference is not implemented yet');
      },
      create:
        ((o = c(
          regeneratorRuntime.mark(function e(t, r) {
            var n, o, a, i, c;
            return regeneratorRuntime.wrap(function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      d[t],
                      (e.next = 3),
                      f(d[t].containerUri, {
                        method: 'POST',
                        body: JSON.stringify(p({ '@context': h(m, b), '@type': d[t].types }, r.data))
                      })
                    );
                  case 3:
                    return (n = e.sent), (o = n.headers), (a = o.get('Location')), (e.next = 8), f(a);
                  case 8:
                    return (i = e.sent), ((c = i.json).id = c.id || c['@id']), e.abrupt('return', { data: c });
                  case 12:
                  case 'end':
                    return e.stop();
                }
            }, e);
          })
        )),
        function(e, t) {
          return o.apply(this, arguments);
        }),
      update:
        ((n = c(
          regeneratorRuntime.mark(function e(t, r) {
            return regeneratorRuntime.wrap(function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), f(r.id, { method: 'PATCH', body: JSON.stringify(r.data) });
                  case 2:
                    return e.abrupt('return', { data: r.data });
                  case 3:
                  case 'end':
                    return e.stop();
                }
            }, e);
          })
        )),
        function(e, t) {
          return n.apply(this, arguments);
        }),
      updateMany: function(e, t) {
        throw new Error('updateMany is not implemented yet');
      },
      delete:
        ((t = c(
          regeneratorRuntime.mark(function e(t, r) {
            return regeneratorRuntime.wrap(function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), f(r.id, { method: 'DELETE' });
                  case 2:
                    return e.abrupt('return', { data: { id: r.id } });
                  case 3:
                  case 'end':
                    return e.stop();
                }
            }, e);
          })
        )),
        function(e, r) {
          return t.apply(this, arguments);
        }),
      deleteMany: function(e, t) {
        throw new Error('deleteMany is not implemented yet');
      }
    };
  }),
  (exports.httpClient = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    switch ((t.headers || (t.headers = new Headers()), t.method)) {
      case 'POST':
      case 'PATCH':
        t.headers.set('Accept', 'application/ld+json'), t.headers.set('Content-Type', 'application/ld+json');
        break;
      case 'DELETE':
        break;
      case 'GET':
      default:
        t.headers.set('Accept', 'application/ld+json');
    }
    var r = localStorage.getItem('token');
    return t.headers.set('Authorization', 'Bearer '.concat(r)), n.fetchUtils.fetchJson(e, t);
  });