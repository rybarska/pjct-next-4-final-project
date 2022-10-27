import Head from 'next/head';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <div>About</div>
      <p>
        The Space Drone Incident Reporting Database collects, classifies, and
        analyses information on security incidents involving drones. Reporting
        and access to information is accessible only to registered users.
      </p>
      <a>
        <Image
          src={`/DroneAtSunset.jpeg`}
          alt="drone flying at sunset"
          width="600"
          height="400"
        />
      </a>
    </>
  );
}
