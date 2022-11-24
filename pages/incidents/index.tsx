import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getIncidents, Incident } from '../../database/incidents';

const incidentStyles = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 20px;
  h2 {
    margin-top: 0;
  }
  & + & {
    margin-top: 25px;
  }
`;

type Props = {
  incidents: Incident[];
};

export default function Incidents(props: Props) {
  return (
    <>
      <Head>
        <title>All of the incidents</title>
        <meta name="description" content="List page of all incidents" />
      </Head>

      <h1>Incidents</h1>

      {props.incidents.map((incident) => {
        return (
          <div key={`incident-${incident.id}`} css={incidentStyles}>
            <h2>
              <Link href={`/incidents/${incident.id}`}>
                {incident.category}
              </Link>
            </h2>

            <div>Category: {incident.category}</div>
            <div>Coordinates: {incident.coordinates}</div>
            <div>Day: {incident.day}</div>
          </div>
        );
      })}
    </>
  );
}

// Anything inside of this function will
// ONLY be run on the server (in Node.js)
//
// This means you can access things like `fs`
//
// Note: this function can only be exported
// from files within pages/
export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const incidents = await getIncidents();
  return {
    // Anything that you write in this props object
    // will become the props that are passed to
    // the `Incidents` page component above
    props: {
      // First prop, containing all incidents
      incidents: incidents,
      // Second prop, example
      // abc: 123,
    },
  };
}
