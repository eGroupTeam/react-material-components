import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';
import preProcessImage from './preProcessImage';

// mock toBlob
async function toBlob(resolve, type, quality) {
  const buf = await this.toBuffer(type, { quality });
  resolve(buf);
}

function getBytes(buf) {
  return Math.round(Buffer.byteLength(buf) / 1000);
}

describe('preProcessImage', () => {
  it('should compress image', async () => {
    const file = await fs.readFileSync('test-images/cat.jpg');
    const image = await loadImage(file);
    const canvas = createCanvas();
    canvas.toBlob = toBlob;
    const blob = await preProcessImage(canvas, image, {
      quality: 0.8,
    });
    await fs.writeFileSync(
      'test-images/processed/compressed.jpeg',
      blob,
      'binary'
    );
    console.log('compress image success!');
    expect(blob).toBeInstanceOf(Buffer);
    expect(getBytes(blob)).toBeLessThan(getBytes(file));
  });

  it('should resize image', async () => {
    const file = await fs.readFileSync('test-images/cat.jpg');
    const image = await loadImage(file);
    const canvas = createCanvas();
    canvas.toBlob = toBlob;
    const blob = await preProcessImage(canvas, image, {
      maxWidth: 1920,
      maxHeight: 1920,
    });
    await fs.writeFileSync(
      'test-images/processed/resized.jpeg',
      blob,
      'binary'
    );
    console.log('resize image success!');
    const outputImage = await loadImage(blob);
    expect(blob).toBeInstanceOf(Buffer);
    expect(image.width).toBeGreaterThanOrEqual(1920);
    expect(image.height).toBeGreaterThanOrEqual(1920);
    expect(outputImage.width).toBeLessThanOrEqual(1920);
    expect(outputImage.height).toBeLessThanOrEqual(1920);
  });

  it('should not resize image', async () => {
    const file = await fs.readFileSync('test-images/cat2.jpeg');
    const image = await loadImage(file);
    const canvas = createCanvas();
    canvas.toBlob = toBlob;
    const blob = await preProcessImage(canvas, image, {
      maxWidth: 1920,
      maxHeight: 1920,
    });
    const outputImage = await loadImage(blob);
    expect(blob).toBeInstanceOf(Buffer);
    expect(image.width).toBeLessThan(1920);
    expect(image.height).toBeLessThan(1920);
    expect(outputImage.width).toBe(image.width);
    expect(outputImage.height).toBe(image.height);
  });

  it('should reset image when orientation is 6', async () => {
    const file = await fs.readFileSync('test-images/up-down.jpg');
    const image = await loadImage(file);
    const canvas = createCanvas();
    canvas.toBlob = toBlob;
    // https://storage.googleapis.com/go-attachment/4341/0/exif-orientations.png
    const orientation = 6;
    const blob = await preProcessImage(canvas, image, {
      orientation,
    });
    await fs.writeFileSync(
      'test-images/processed/reseted.jpeg',
      blob,
      'binary'
    );
    console.log('reset image orientation success!');
    const outputImage = await loadImage(blob);
    expect(blob).toBeInstanceOf(Buffer);
    expect(outputImage.width).toBe(image.height);
    expect(outputImage.height).toBe(image.width);
  });

  it('should not reset image orientation', async () => {
    const file = await fs.readFileSync('test-images/cat.jpg');
    const image = await loadImage(file);
    const canvas = createCanvas();
    canvas.toBlob = toBlob;
    // https://storage.googleapis.com/go-attachment/4341/0/exif-orientations.png
    const orientation = 1;
    const blob = await preProcessImage(canvas, image, {
      orientation,
    });
    const outputImage = await loadImage(blob);
    expect(blob).toBeInstanceOf(Buffer);
    expect(outputImage.width).toBe(image.width);
    expect(outputImage.height).toBe(image.height);
  });

  it('should compress and reset image orientation', async () => {
    const file = await fs.readFileSync('test-images/up-down.jpg');
    const image = await loadImage(file);
    const canvas = createCanvas();
    canvas.toBlob = toBlob;
    // https://storage.googleapis.com/go-attachment/4341/0/exif-orientations.png
    const orientation = 6;
    const blob = await preProcessImage(canvas, image, {
      quality: 0.8,
      orientation,
    });
    await fs.writeFileSync(
      'test-images/processed/reseted-compressed.jpeg',
      blob,
      'binary'
    );
    console.log('compress and reset image orientation success!');
    const outputImage = await loadImage(blob);
    expect(getBytes(blob)).toBeLessThan(getBytes(file));
    expect(outputImage.width).toBe(image.height);
    expect(outputImage.height).toBe(image.width);
  });

  it('should resize and reset image orientation', async () => {
    const file = await fs.readFileSync('test-images/up-down.jpg');
    const image = await loadImage(file);
    const canvas = createCanvas();
    canvas.toBlob = toBlob;
    // https://storage.googleapis.com/go-attachment/4341/0/exif-orientations.png
    const orientation = 6;
    const blob = await preProcessImage(canvas, image, {
      maxWidth: 1920,
      maxHeight: 1920,
      orientation,
    });
    await fs.writeFileSync(
      'test-images/processed/resized-reseted.jpeg',
      blob,
      'binary'
    );
    console.log('resize and reset image orientation success!');
    const outputImage = await loadImage(blob);
    expect(getBytes(blob)).toBeLessThan(getBytes(file));
    expect(image.width).toBeGreaterThanOrEqual(1920);
    expect(image.height).toBeGreaterThanOrEqual(1920);
    expect(outputImage.width).toBeLessThanOrEqual(1920);
    expect(outputImage.height).toBeLessThanOrEqual(1920);
  });

  it('should cause required type error', () => {
    const t = () => {
      preProcessImage();
    };
    expect(t).toThrow('Canvas or Img element is required.');
  });

  it('should cause need one option type error', async () => {
    const image = await loadImage('test-images/cat.jpg');
    const canvas = createCanvas();
    const t = () => {
      preProcessImage(canvas, image);
    };
    expect(t).toThrow('At least need one option to handle image.');
  });
});
