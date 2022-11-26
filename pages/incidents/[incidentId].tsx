/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getIncidentById, Incident } from '../../database/incidents';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

type Props =
  | {
      incident: Incident;
    }
  | {
      error: string;
    };

export default function SingleIncident(props: Props) {
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Incident not found</title>
          <meta name="description" content="Incident not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/incidents">Incidents page</Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>
          {props.incident.category}, the {props.incident.coordinates}
        </title>
        <meta
          name="description"
          content={`${props.incident.category} is a ${props.incident.coordinates} with a ${props.incident.day}`}
        />
      </Head>
      <h2>{props.incident.category}</h2>
      <Image
        src={`/images/${props.incident.id}.jpeg`}
        alt=""
        width="400"
        height="400"
      />
      <div>Id: {props.incident.id}</div>
      <div>Category: {props.incident.category}</div>
      <div>Coordinates: {props.incident.coordinates}</div>
      <div>Day: {props.incident.day}</div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  // Retrieve the incident ID from the URL
  const incidentId = parseIntFromContextQuery(context.query.incidentId);

  if (typeof incidentId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Incident not found',
      },
    };
  }

  // Finding the incident
  //
  // Note: This is not the most efficient way
  // of finding the single aniincidentmal, because it
  // will run every time. Using a database
  // like PostgreSQL will allow you to do this
  // in a nicer way.
  // const foundIncident = incidents.find((incident) => {
  //   return incident.id === incidentId;
  // });
  const foundIncident = await getIncidentById(incidentId);

  if (typeof foundIncident === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Incident not found',
      },
    };
  }

  return {
    props: {
      incident: foundIncident,
    },
  };
}
