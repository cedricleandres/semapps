import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { MIDDLEWARE_URL, FRONTEND_URL } from '../config';
import { editResource } from '../api/actions';
import useAuth from '../auth/useAuth';
import Page from '../Page';
import { addFlash } from '../app/actions';

const MyProfilePage = () => {
  const { user } = useAuth({ force: true });
  const dispatch = useDispatch();

  const edit = async values => {
    await fetch(`${MIDDLEWARE_URL}me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        '@context': { '@vocab': 'http://xmlns.com/foaf/0.1/' },
        '@type': 'Person',
        ...values
      })
    });

    await dispatch(editResource(`${MIDDLEWARE_URL}me`, values));

    await dispatch(addFlash('Votre profil a été édité avec succès'));
  };

  const logout = global => {
    localStorage.removeItem('token');
    let redirectUrl = `${MIDDLEWARE_URL}auth/logout?redirectUrl=${encodeURI(FRONTEND_URL)}`;
    if (global) redirectUrl += '&global=true';
    window.location.href = redirectUrl;
  };

  let homepage;
  if (user) homepage = user.homepage || user['foaf:homepage'];
  if (typeof homepage === 'object') homepage = homepage['@id'];

  return (
    <Page>
      {user && (
        <>
          <h2>
            Modifier mon profil
            <span className="dropdown pull-right">
              <button className="btn btn-danger dropdown-toggle" type="button" data-toggle="dropdown">
                Se déconnecter
              </button>
              <div className="dropdown-menu">
                <button className="dropdown-item" href="#" onClick={() => logout(false)}>
                  Localement
                </button>
                <button className="dropdown-item" href="#" onClick={() => logout(true)}>
                  Globalement
                </button>
              </div>
            </span>
          </h2>
          <Form
            onSubmit={edit}
            initialValues={{
              name: user.name || user['foaf:name'],
              familyName: user.familyName || user['foaf:familyName'],
              email: user.email || user['foaf:email'],
              homepage
            }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Prénom</label>
                  <Field name="name" component="input" className="form-control" id="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="familyName">Nom de famille</label>
                  <Field name="familyName" component="input" className="form-control" id="familyName" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Adresse e-mail</label>
                  <Field name="email" component="input" className="form-control" id="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="homepage">Site web</label>
                  <Field name="homepage" component="input" className="form-control" id="homepage" />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Modifier mon profil
                </button>
              </form>
            )}
          />
        </>
      )}
    </Page>
  );
};

export default MyProfilePage;
