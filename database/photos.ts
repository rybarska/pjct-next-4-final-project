import { sql } from './connect';

export type Photo = {
  id: number;
  title: string;
};

export async function getPhotoByIdAndValidSessionToken(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  // STRETCH: Update this adding a role to the users and matching it with the session token
  const [photo] = await sql<Photo[]>`
    SELECT
      photos.*
    FROM
      photos,
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()
    AND
      photos.id = ${id}
  `;
  return photo;
}

// Get all photos
export async function getPhotos() {
  const photos = await sql<Photo[]>`
    SELECT * FROM photos
  `;
  return photos;
}
// Get a single photo by id
export async function getPhotoById(id: number) {
  const [photo] = await sql<Photo[]>`
    SELECT
      *
    FROM
      photos
    WHERE
      id = ${id}
  `;
  return photo;
}

export async function createPhoto(title: string) {
  const [photo] = await sql<Photo[]>`
    INSERT INTO photos
      (title)
    VALUES
      (${title})
    RETURNING *
  `;
  return photo;
}

export async function updatePhotoById(id: number, title: string) {
  const [photo] = await sql<Photo[]>`
    UPDATE
      photos
    SET
      title = ${title},

    WHERE
      id = ${id}
    RETURNING *
  `;
  return photo;
}
export async function deletePhotoById(id: number) {
  const [photo] = await sql<Photo[]>`
    DELETE FROM
      photos
    WHERE
      id = ${id}
    RETURNING *
  `;
  return photo;
}
