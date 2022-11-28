## INTRO

This is a demo of my UpLeveled bootcamp final project, showcasing work in progress. The goal is to build a reporting system that will employ an image steganography technique to secure queries submitted to the database (SDIRS, obviously fictitious).

In a real-world scenario, the database and the steganography tool would be separated into two different apps.

Steganography is the technique of hiding secret data within a non-secret carrier. In my app, I use a png image as carrier, and an rtf text file as data. The encoded result is a png image that looks identical to the original image, but contains hidden data. The steganography image can then be decoded to extract the data in a text file.

## How to use

If you need a .png image file, go to page 'Photos' and click on a chosen image to download it from the dynamic route.

Steganography tool:

- To encode, go to page 'Steganography' and use the form on the left. Select an .rtf text file containing the data and a .png image as carrier, click 'Encode' and then click 'Download steg image'. The steganography image containing the hidden text file with the data will be downloaded to your machine.
- To decode, go to page 'Steganography' and use the form on the right. Select the steganography image, click 'Decode' and then click 'Download decoded text'. The text file with the data will be downloaded to your machine.

The 'SDIRS-manual' page can be used to manually report incidents.

The 'SDIRS-steg' page is still in development. The goal is for it to accept queries submitted by users in form of steganography images, and respond to 'GET' queries by providing a steganography image with a hidden text file.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
