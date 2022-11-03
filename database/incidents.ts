import { sql } from './connect';

export type Incident = {
  id: number;
  category: string;
  coordinates: {}[];
};

export type Drone = {
  id: number;
  registrationData: {}[];
  origin: {}[];
};

export type IncidentWithDrones = {
  incidentId: number;
  incidentCategory: string;
  incidentCoordinates: {}[];
  droneRegistrationData: {}[];
  droneOrigin: {}[];
};

export type IncidentWithDronesLeftJoin = {
  incidentId: number;
  incidentCategory: string;
  incidentCoordinates: {}[];
  droneRegistrationData: {}[];
  droneOrigin: {}[];
};

// Get all incidents
export async function getIncidents() {
  const incidents = await sql<Incident[]>`
    SELECT * FROM incidents
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
  category: string;
  coordinates: {}[];
) {
  const [incident] = await sql<Incident[]>`
    INSERT INTO incidents
      (category, coordinates)
    VALUES
      (${category}, ${coordinates})
    RETURNING *
  `;
  return incident;
}

export async function updateIncidentById(
  id: number,
  category: string,
  coordinates: {}[];
) {
  const [incident] = await sql<Incident[]>`
    UPDATE
      incidents
    SET
      category = ${category},
      coordinates = ${coordinates}
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
