import { sql } from './connect';

export type Incident = {
  id: number;
  category: string;
  coordinates: string;
  day: string;
};

export type Drone = {
  id: number;
  registrationData: string;
  origin: string;
};

export type IncidentWithDrones = {
  incidentId: number;
  incidentCategory: string;
  incidentCoordinates: string;
  incidentDay: string;
  droneRegistrationData: string;
  droneOrigin: string;
};

export type IncidentWithDronesLeftJoin = {
  incidentId: number;
  incidentCategory: string;
  incidentCoordinates: string;
  incidentDay: string;
  droneRegistrationData: string;
  droneOrigin: string;
};

// Get all incidents
export async function getIncidents() {
  const incidents = await sql<Incident[]>`
    SELECT * FROM incidents
  `;
  return incidents;
}

export async function getIncidentsWithLimit(limit: number) {
  const incidents = await sql<Incident[]>`
    SELECT
      *
    FROM
    incidents
    LIMIT ${limit}
  `;
  return incidents;
}

// Get a single incident by id
export async function getIncidentById(id: number) {
  const [incident] = await sql<Incident[]>`
    SELECT
      *
    FROM
      incidents
    WHERE
      id = ${id}
  `;
  return incident;
}

// Get a single incident by id and valid session token
export async function getIncidentByIdAndValidSessionToken(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  // STRETCH: Update this adding a role to the users and matching it with the session token
  const [incident] = await sql<Incident[]>`
    SELECT
      incidents.*
    FROM
      incidents,
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()
    AND
      incidents.id = ${id}
  `;
  return incident;
}

// Alternative method: accept id of undefined
// // Get a single incident by id
// export async function getIncidentById(id: number | undefined) {
//   if (!id) return undefined;
//   const [incident] = await sql<Incident[]>`
//     SELECT
//       *
//     FROM
//       incidents
//     WHERE
//       id = ${id}
//   `;
//   return incident;
// }

export async function getIncidentByIdWithDrones(incidentId: number) {
  const incidentWithDrones = await sql<IncidentWithDrones[]>`
    SELECT
      incidents.id AS incident_id,
      incidents.category AS incident_category,
      incidents.coordinates AS incident_coordinates,
      incidents.day AS incident_day,
      drones.registrationData AS drone_registration_data,
      drones.origin AS drone_origin
    FROM
      incidents
    INNER JOIN
      incidents_drones ON incidents.id = incidents_drones.incident_id
    INNER JOIN
      drones ON incidents_drones.drone_id = drones.id
    WHERE
      incidents.id = ${incidentId}
  `;

  return incidentWithDrones;
}

// In case you still want the incident information
// when the incident is not related to any drones,
// use the LEFT JOIN instead of INNER JOIN
export async function getIncidentByIdWithDronesLeftJoin(incidentId: number) {
  const incidentWithDrones = await sql<IncidentWithDronesLeftJoin[]>`
    SELECT
      incidents.id AS incident_id,
      incidents.category AS incident_category,
      incidents.coordinates AS incident_coordinates,
      incidents.day AS incident_day,
      drones.registrationData AS drone_registration_data,
      drones.origin AS drone_origin
    FROM
      incidents
    LEFT JOIN
      incidents_drones ON incidents.id = incidents_drones.incident_id
    LEFT JOIN
      drones ON incidents_drones.drone_id = drones.id
    WHERE
      incidents.id = ${incidentId}
  `;

  return incidentWithDrones;
}

export async function createIncident(
  category: string,
  coordinates: string,
  day: string,
) {
  const [incident] = await sql<Incident[]>`
    INSERT INTO incidents
      (category, coordinates, day)
    VALUES
      (${category}, ${coordinates}, ${day})
    RETURNING *
  `;
  return incident;
}

export async function updateIncidentById(
  id: number,
  category: string,
  coordinates: string,
  day: string,
) {
  const [incident] = await sql<Incident[]>`
    UPDATE
      incidents
    SET
      category = ${category},
      coordinates = ${coordinates}
      day = ${day}
    WHERE
      id = ${id}
    RETURNING *
  `;
  return incident;
}

export async function deleteIncidentById(id: number) {
  const [incident] = await sql<Incident[]>`
    DELETE FROM
      incidents
    WHERE
      id = ${id}
    RETURNING *
  `;
  return incident;
}
