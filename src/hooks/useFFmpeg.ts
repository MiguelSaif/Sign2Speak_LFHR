import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { useRef, useState, useCallback } from 'react';

export const useFFmpeg = () => {
  const ffmpegRef = useRef(new FFmpeg());
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const load = useCallback(async () => {
    if (isLoaded) return;
    
    setIsLoading(true);
    const ffmpeg = ffmpegRef.current;

    try {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      
      ffmpeg.on('log', ({ message }) => {
        console.log(message);
      });

      ffmpeg.on('progress', ({ progress: p }) => {
        setProgress(Math.round(p * 100));
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });

      setIsLoaded(true);
    } catch (error) {
      console.error('Failed to load FFmpeg:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded]);

  const convertVideo = useCallback(async (file: File, outputFormat: string = 'mp4') => {
    if (!isLoaded) {
      await load();
    }

    const ffmpeg = ffmpegRef.current;
    const inputName = `input.${file.name.split('.').pop()}`;
    const outputName = `output.${outputFormat}`;

    try {
      // Write input file
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      // Convert video with optimization for web streaming
      await ffmpeg.exec([
        '-i', inputName,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '23',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        '-f', outputFormat,
        outputName
      ]);

      // Read output file
      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: `video/${outputFormat}` });

      // Cleanup
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);

      return blob;
    } catch (error) {
      console.error('Video conversion failed:', error);
      throw error;
    }
  }, [isLoaded, load]);

  const extractThumbnail = useCallback(async (file: File, timeOffset: number = 1) => {
    if (!isLoaded) {
      await load();
    }

    const ffmpeg = ffmpegRef.current;
    const inputName = `input.${file.name.split('.').pop()}`;
    const outputName = 'thumbnail.jpg';

    try {
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      await ffmpeg.exec([
        '-i', inputName,
        '-ss', timeOffset.toString(),
        '-vframes', '1',
        '-q:v', '2',
        outputName
      ]);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: 'image/jpeg' });

      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);

      return blob;
    } catch (error) {
      console.error('Thumbnail extraction failed:', error);
      throw error;
    }
  }, [isLoaded, load]);

  return {
    load,
    convertVideo,
    extractThumbnail,
    isLoaded,
    isLoading,
    progress
  };
};