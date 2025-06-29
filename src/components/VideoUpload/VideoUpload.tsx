import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Upload, 
  Video, 
  FileVideo, 
  Trash2, 
  Play, 
  Download,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useFFmpeg } from '../../hooks/useFFmpeg';

interface VideoFile {
  file: File;
  id: string;
  preview: string;
  thumbnail?: string;
  converted?: Blob;
  status: 'uploading' | 'processing' | 'ready' | 'error';
}

export const VideoUpload: React.FC = () => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { load, convertVideo, extractThumbnail, isLoaded, isLoading, progress } = useFFmpeg();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newVideos: VideoFile[] = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      status: 'uploading' as const
    }));

    setVideos(prev => [...prev, ...newVideos]);

    // Load FFmpeg if not already loaded
    if (!isLoaded) {
      await load();
    }

    // Process each video
    for (const video of newVideos) {
      try {
        setVideos(prev => prev.map(v => 
          v.id === video.id ? { ...v, status: 'processing' } : v
        ));

        // Extract thumbnail
        const thumbnailBlob = await extractThumbnail(video.file);
        const thumbnailUrl = URL.createObjectURL(thumbnailBlob);

        // Convert video for web optimization with 720p target
        const convertedBlob = await convertVideo(video.file, 'mp4');

        setVideos(prev => prev.map(v => 
          v.id === video.id 
            ? { 
                ...v, 
                status: 'ready',
                thumbnail: thumbnailUrl,
                converted: convertedBlob
              } 
            : v
        ));
      } catch (error) {
        console.error('Video processing failed:', error);
        setVideos(prev => prev.map(v => 
          v.id === video.id ? { ...v, status: 'error' } : v
        ));
      }
    }
  }, [isLoaded, load, convertVideo, extractThumbnail]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/3gpp': ['.3gp', '.3gpp'],
      'video/quicktime': ['.mov'],
      'video/x-msvideo': ['.avi'],
      'video/webm': ['.webm']
    },
    multiple: true
  });

  const removeVideo = (id: string) => {
    setVideos(prev => {
      const video = prev.find(v => v.id === id);
      if (video) {
        URL.revokeObjectURL(video.preview);
        if (video.thumbnail) URL.revokeObjectURL(video.thumbnail);
      }
      return prev.filter(v => v.id !== id);
    });
  };

  const downloadVideo = (video: VideoFile) => {
    if (!video.converted) return;
    
    const url = URL.createObjectURL(video.converted);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_${video.file.name.replace(/\.[^/.]+$/, '')}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: VideoFile['status']) => {
    switch (status) {
      case 'uploading':
        return <Upload className="w-4 h-4 text-blue-400" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'ready':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* FFmpeg Loading Status */}
      {isLoading && (
        <Card className="bg-blue-900/50 border-blue-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
              <span className="font-medium text-blue-200">Loading video processing engine...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Area */}
      <Card className="border-2 border-dashed border-gray-600 hover:border-blue-400 transition-colors bg-gray-800/50">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`text-center cursor-pointer transition-colors ${
              isDragActive ? 'text-blue-400' : 'text-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-gray-700 rounded-full">
                <Video className="w-8 h-8 text-gray-300" />
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-white mb-2">
                  Upload Video Footage
                </h3>
                <p className="text-gray-300 mb-4">
                  Drag and drop your video footage here, or click to browse
                </p>
                <p className="text-sm text-gray-400">
                  Supports MP4, 3GP, MOV, AVI, WebM • Max 100MB per file • HD processing available
                </p>
              </div>

              <Button variant="outline" className="mt-2 border-gray-600 text-gray-300 hover:bg-gray-700">
                <Upload className="w-4 h-4 mr-2" />
                Choose Footage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Progress */}
      {isProcessing && progress > 0 && (
        <Card className="bg-yellow-900/50 border-yellow-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
              <span className="font-medium text-yellow-200">Processing footage...</span>
            </div>
            <div className="w-full bg-yellow-800 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-yellow-300 mt-1">{progress}% complete</p>
          </CardContent>
        </Card>
      )}

      {/* Video List */}
      {videos.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-white">Uploaded Footage</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  <div className="relative">
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt="Video thumbnail"
                        className="w-full h-32 object-cover"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-700 flex items-center justify-center">
                        <FileVideo className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="absolute top-2 right-2 flex gap-2">
                      {getStatusIcon(video.status)}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-medium text-white truncate mb-2">
                      {video.file.name}
                    </h4>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <span>{(video.file.size / (1024 * 1024)).toFixed(1)} MB</span>
                      <span className="capitalize">{video.status}</span>
                    </div>

                    <div className="flex gap-2">
                      {video.status === 'ready' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(video.preview)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadVideo(video)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeVideo(video.id)}
                        className="text-red-400 hover:text-red-300 border-gray-600 hover:bg-gray-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Broadcasting Info */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-700">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg text-white mb-3">
            Broadcasting Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-white">HD Optimization</p>
                <p className="text-gray-300">720p processing for better recognition</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-white">Thumbnail Generation</p>
                <p className="text-gray-300">Automatic preview thumbnails</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-white">Multi-format Support</p>
                <p className="text-gray-300">MP4, 3GP, MOV, AVI, WebM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};