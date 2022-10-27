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
      <h2>
        The Space Drone Incident Reporting Database collects, classifies, and
        analyses information on security incidents involving space drones.
        Reporting and access to information is restricted to registered users.
      </h2>
      <a>
        <Image
          src={`/images/spaceDrone18.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone13.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone33.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone21.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone30.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone25.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone16.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone28.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone26.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone14.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone2.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone4.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone34.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone35.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          src={`/images/spaceDrone36.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
      </a>
    </>
  );
}
