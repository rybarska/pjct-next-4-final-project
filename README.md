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
