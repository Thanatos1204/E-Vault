const fs = require('fs');
const { createCanvas, Image } = require('canvas');
const fluentffmpeg = require('fluent-ffmpeg');
const path = require('path');


export async function binaryToVideo(fileD, width = 1920, height = 1080, pixel_size = 4, fps = 24) {
    return new Promise((resolve, reject) => {
    const fileData = fileD;
    const fileBuffer = Buffer.from(fileData);
    const bin_string = fileBuffer.toString('binary');
    const num_pixels = bin_string.length;
    const pixels_per_image = (width / pixel_size) * (height / pixel_size);
    const num_images = Math.ceil(num_pixels / pixels_per_image);

    const frames = [];

    for (let i = 0; i < num_images; i++) {
        const start_index = i * pixels_per_image;
        const end_index = Math.min(start_index + pixels_per_image, num_pixels);
        const binary_digits = bin_string.slice(start_index, end_index);

        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');

        for (let row_index = 0; row_index < height / pixel_size; row_index++) {
        const row_start = row_index * (width / pixel_size);
        const row_end = row_start + (width / pixel_size);
        const row = binary_digits.slice(row_start, row_end);

        for (let col_index = 0; col_index < row.length; col_index++) {
            const digit = row[col_index];
            const color = digit === '1' ? 'black' : 'white';

            const x1 = col_index * pixel_size;
            const y1 = row_index * pixel_size;
            const x2 = x1 + pixel_size;
            const y2 = y1 + pixel_size;

            context.fillStyle = color;
            context.fillRect(x1, y1, pixel_size, pixel_size);
        }
        }

        const path = require('path');
        const tempDir = './tempFrames';
        if (!fs.existsSync(tempDir)){
            fs.mkdirSync(tempDir);
        }

        for (let i = 0; i < num_images; i++) {
            //const image = new Image();
            const buffer = canvas.toBuffer();
            const imagePath = path.join(tempDir, `frame${i}.png`);
            fs.writeFileSync(imagePath, buffer);
            frames.push(imagePath);
        }
    }

    const videoPath = 'video.mp4';

    const ffmpeg = fluentffmpeg();
    fluentffmpeg.setFfmpegPath("C:\ffmpeg\ffmpeg1\bin\ffmpeg.exe");
    frames.forEach((framePath) => {
        ffmpeg.addInput(framePath);
    });

    ffmpeg
        .fps(fps)
        .videoCodec('libx264')
        .size(`${width}x${height}`)
        .outputOptions(['-pix_fmt yuv420p'])
        .output(videoPath)
        .on('end', () => {
            console.log(`Video created at ${videoPath}`);
            const videoBuffer = fs.readFileSync(videoPath);
            resolve(videoBuffer);
        })
        .on('error', (err) => {
            console.log(err);
        })
        .run();
    });
}

export async function processImages(frames) {
    const threshold = 128;
    let binaryDigits = '';

    for (const frame of frames) {
        const canvas = createCanvas(frame.width, frame.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(frame, 0, 0);
        const imageData = ctx.getImageData(0, 0, frame.width, frame.height);
        const pixelSize = 4;

        for (let y = 0; y < imageData.height; y += pixelSize) {
            for (let x = 0; x < imageData.width; x += pixelSize) {
                let color = 0;

                for (let i = 0; i < pixelSize; i++) {
                    for (let j = 0; j < pixelSize; j++) {
                        const index = (y + i) * imageData.width * 4 + (x + j) * 4;
                        color += imageData.data[index];
                    }
                }

                color /= pixelSize * pixelSize;

                if (color < threshold) {
                    binaryDigits += '1';
                } else {
                    binaryDigits += '0';
                }
            }
        }
    }

    return binaryDigits;
}

function fileToBinary(filename) {
        const binaryData = fs.readFileSync(filename);
        let binaryString = '';

        for (const byte of binaryData) {
            binaryString += byte.toString(2).padStart(8, '0');
        }

        fs.writeFileSync('binary.txt', binaryString);

        console.log('File converted to binary format and stored in binary.txt');
        return binaryString;
    }

function binaryToFile(binaryFilename, extension) {
    const binaryData = [];
    for (let i = 0; i < binaryFilename.length; i += 8) {
        const byte = parseInt(binaryFilename.substr(i, 8), 2);
        binaryData.push(byte);
    }

    const filename = `output.${extension}`;
    const chunkSize = 1024;
    const fileStream = fs.createWriteStream(filename);

    for (let i = 0; i < binaryData.length; i += chunkSize) {
        const chunk = binaryData.slice(i, i + chunkSize);
        const buffer = Buffer.from(chunk);
        fileStream.write(buffer);
    }

    fileStream.end();

    console.log(`Binary data converted to ${filename}`);
}

function extractFrames(file) {
    const am = [];
    const ffmpeg = require('fluent-ffmpeg');
    const vid = ffmpeg(file);
    let num = 100;
    vid.ffprobe((err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        num = data.streams[0].nb_frames;
    }
    );
    vid.on('filenames', (filenames) => {
        console.log(`Will generate ${filenames.join(', ')}`);
    }
    ).on('end', () => {
        console.log('Screenshots taken');
    }
    ).screenshots({
        count: num,
        folder: 'tempFrames',
        size: '1920x1080',
        filename: 'frame-%i.png'
    }
    );


    return am;
}

// Usage

export async function encoder(paths){
    const input_Data = '1'; // Change to '2' for the second case
    if (input_Data === '1') {
    const path = paths;
    binaryToVideo(path);
    }
    }