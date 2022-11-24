import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Fragment, useState } from 'react';
import { getIncidentsWithLimit, Incident } from '../../database/incidents';
import { getValidSessionByToken } from '../../database/sessions';
import { createTokenFromSecret } from '../../utils/csrf';

const formStyles = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  color: white;
  font-weight: bold;
  font-size: 22px;
  background: rgb(230,227,240);
background: linear-gradient(55deg, rgba(230,227,240,0.9910481770833334) 0%, rgba(78,71,93,1) 0%, rgba(2,1,5,1) 100%);
  box-shadow: box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-webkit-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-moz-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
  box-sizing: border-box;
  width: 500px;
  border: solid #7c729a 2px;
`;

const inputStyles = css`
  width: 70%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 22px;
  color: #180d24;
  border-radius: 5px;
  background-color: rgba(241, 245, 255, 1);
  border: solid #7c729a 2px;
`;

const buttonStyles = css`
  background: #fa9d00;
  color: black;
  width: 200px;
  height: 50px;
  border-radius: 6px;
  font-size: 26px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      box-shadow: box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-webkit-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-moz-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
`;

type Props =
  | {
      errors: { message: string }[];
      csrfToken: undefined;
      incidents: undefined;
    }
  | { csrfToken: string; incidents: Incident[] };

export default function IncidentsAdmin(props: Props) {
  const [incidents, setIncidents] = useState(props.incidents || []);
  const [categoryInput, setCategoryInput] = useState('');
  const [coordinatesInput, setCoordinatesInput] = useState('');
  const [dayInput, setDayInput] = useState('');

  const [categoryOnEditInput, setCategoryOnEditInput] = useState('');
  const [coordinatesOnEditInput, setCoordinatesOnEditInput] = useState('');
  const [dayOnEditInput, setDayOnEditInput] = useState('');
  const [onEditId, setOnEditId] = useState<number | undefined>();

  if ('errors' in props) {
    return (
      <div>
        {props.errors.map((error) => {
          return <div key={error.message}>{error.message}</div>;
        })}
      </div>
    );
  }

  async function getIncidentsFromApi() {
    const response = await fetch('/api/incidents');
    const incidentsFromApi = await response.json();

    setIncidents(incidentsFromApi);
  }

  async function createIncidentFromApi() {
    const response = await fetch('/api/incidents', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        category: categoryInput,
        coordinates: coordinatesInput,
        day: dayInput,
        csrfToken: props.csrfToken,
      }),
    });
    const incidentFromApi = (await response.json()) as Incident;

    // TODO handle the error when incident from api is undefined
    // you can check if incidentFromApi contains an error and display the error in the front end

    const newState = [...incidents, incidentFromApi];

    setIncidents(newState);
  }

  async function deleteIncidentFromApiById(id: number) {
    const response = await fetch(`/api/incidents/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ csrfToken: props.csrfToken }),
    });
    const deletedIncident = (await response.json()) as Incident;

    const filteredIncidents = incidents.filter((incident) => {
      return incident.id !== deletedIncident.id;
    });

    setIncidents(filteredIncidents);
  }

  async function updateIncidentFromApiById(id: number) {
    const response = await fetch(`/api/incidents/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        category: categoryOnEditInput,
        coordinates: coordinatesOnEditInput,
        day: dayOnEditInput,
        csrfToken: props.csrfToken,
      }),
    });
    const updatedIncidentFromApi = (await response.json()) as Incident;

    // TODO handle the error when incident from api is undefined
    // you can check if incidentFromApi contains an error and display the error in the front end

    const newState = incidents.map((incident) => {
      if (incident.id === updatedIncidentFromApi.id) {
        return updatedIncidentFromApi;
      } else {
        return incident;
      }
    });

    setIncidents(newState);
  }

  return (
    <>
      <Head>
        <title>Frontend api lecture</title>
        <meta name="description" content="Content of the api lecture" />
      </Head>
      <div css={formStyles}>
        <h1>Incidents List</h1>
        <label>
          Category
          <br />
          <input
            css={inputStyles}
            value={categoryInput}
            onChange={(event) => {
              setCategoryInput(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <br></br>
        <label>
          Coordinates
          <br />
          <input
            css={inputStyles}
            value={coordinatesInput}
            onChange={(event) => {
              setCoordinatesInput(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <br></br>
        <label>
          Day
          <br />
          <input
            css={inputStyles}
            value={dayInput}
            onChange={(event) => {
              setDayInput(event.currentTarget.value);
            }}
          />
        </label>
        <br></br>
        <br></br>
        <button
          css={buttonStyles}
          onClick={async () => {
            await createIncidentFromApi();
          }}
        >
          Create Incident
        </button>
      </div>

      <hr />

      {incidents.map((incident) => {
        const isIncidentOnEdit = onEditId === incident.id;

        return (
          <Fragment key={incident.id}>
            <input
              value={isIncidentOnEdit ? categoryOnEditInput : incident.category}
              disabled={!isIncidentOnEdit}
              onChange={(event) => {
                setCategoryOnEditInput(event.currentTarget.value);
              }}
            />
            <input
              value={
                isIncidentOnEdit ? coordinatesOnEditInput : incident.coordinates
              }
              disabled={!isIncidentOnEdit}
              onChange={(event) => {
                setCoordinatesOnEditInput(event.currentTarget.value);
              }}
            />
            <input
              value={isIncidentOnEdit ? dayOnEditInput : incident.day || ''}
              disabled={!isIncidentOnEdit}
              onChange={(event) => {
                setDayOnEditInput(event.currentTarget.value);
              }}
            />

            <button onClick={() => deleteIncidentFromApiById(incident.id)}>
              X
            </button>
            {!isIncidentOnEdit ? (
              <button
                onClick={() => {
                  setOnEditId(incident.id);
                  setCategoryOnEditInput(incident.category);
                  setCoordinatesOnEditInput(incident.coordinates || '');
                  setDayOnEditInput(incident.day);
                }}
              >
                edit
              </button>
            ) : (
              <button
                onClick={async () => {
                  setOnEditId(undefined);
                  await updateIncidentFromApiById(incident.id);
                }}
              >
                save
              </button>
            )}
            <br />
          </Fragment>
        );
      })}
      {incidents.length < 4 && (
        <button onClick={() => getIncidentsFromApi()}>show more than 3</button>
      )}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Retrieve the username from the URL
  const token = context.req.cookies.sessionToken;

  const session = token && (await getValidSessionByToken(token));

  if (!session) {
    context.res.statusCode = 401;
    return { props: { errors: [{ message: 'User not authorized' }] } };
  }

  const csrfToken = await createTokenFromSecret(session.csrfSecret);

  const initialIncidentsList = await getIncidentsWithLimit(3);

  return {
    props: {
      csrfToken,
      incidents: initialIncidentsList,
    },
  };
}
