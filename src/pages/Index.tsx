import { useState } from 'react';
import { Music, Download, Upload, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  size: string;
  url: string;
}

// Sample music data
const SAMPLE_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Echo',
    duration: '3:45',
    size: '8.2 MB',
    url: '#'
  },
  {
    id: '2',
    title: 'Electric Sunrise',
    artist: 'Neon Waves',
    duration: '4:12',
    size: '9.5 MB',
    url: '#'
  },
  {
    id: '3',
    title: 'Cosmic Journey',
    artist: 'Star Dust',
    duration: '5:03',
    size: '11.3 MB',
    url: '#'
  },
  {
    id: '4',
    title: 'Urban Pulse',
    artist: 'City Lights',
    duration: '3:28',
    size: '7.8 MB',
    url: '#'
  },
  {
    id: '5',
    title: 'Ocean Waves',
    artist: 'Coastal Vibes',
    duration: '4:55',
    size: '10.1 MB',
    url: '#'
  },
  {
    id: '6',
    title: 'Forest Whispers',
    artist: 'Nature Sounds',
    duration: '3:32',
    size: '8.7 MB',
    url: '#'
  }
];

export default function Index() {
  const [tracks, setTracks] = useState<Track[]>(SAMPLE_TRACKS);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(file);
    }
  };

  const handleUpload = () => {
    if (uploadedFile) {
      const newTrack: Track = {
        id: String(tracks.length + 1),
        title: uploadedFile.name.replace(/\.[^/.]+$/, ''),
        artist: 'You',
        duration: '0:00',
        size: (uploadedFile.size / (1024 * 1024)).toFixed(1) + ' MB',
        url: '#'
      };
      setTracks([newTrack, ...tracks]);
      setUploadedFile(null);
      setShowUpload(false);
    }
  };

  const handleDownload = (track: Track) => {
    // In a real app, this would trigger a download
    alert(`Downloading: ${track.title} by ${track.artist}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">SoundVault</h1>
              <p className="text-sm text-slate-600">Share your music with the world</p>
            </div>
          </div>
          <Button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Music
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Upload Section */}
        {showUpload && (
          <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-purple-900">Upload New Track</CardTitle>
              <CardDescription>Share your music with listeners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-400 transition">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="audio-input"
                />
                <label htmlFor="audio-input" className="cursor-pointer">
                  <Music className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <p className="text-slate-700 font-medium">
                    {uploadedFile ? uploadedFile.name : 'Click to select audio file'}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">MP3, WAV, OGG, or M4A</p>
                </label>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleUpload}
                  disabled={!uploadedFile}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                >
                  Upload
                </Button>
                <Button
                  onClick={() => {
                    setShowUpload(false);
                    setUploadedFile(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tracks Grid */}
        <div className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Available Tracks</h2>
            <p className="text-slate-600">{tracks.length} songs ready to download</p>
          </div>

          <div className="grid gap-4">
            {tracks.map((track) => (
              <Card
                key={track.id}
                className="hover:shadow-lg transition-all duration-300 hover:border-purple-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-6">
                    {/* Track Info */}
                    <div className="flex-1 flex items-center gap-4">
                      <button
                        onClick={() =>
                          setPlayingId(playingId === track.id ? null : track.id)
                        }
                        className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white hover:shadow-lg transition-all group-hover:scale-110"
                      >
                        {playingId === track.id ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 text-lg truncate">
                          {track.title}
                        </h3>
                        <p className="text-sm text-slate-600">by {track.artist}</p>
                      </div>
                    </div>

                    {/* Track Meta */}
                    <div className="flex items-center gap-6 text-sm text-slate-600">
                      <div className="text-right hidden sm:block">
                        <p className="font-medium text-slate-700">{track.duration}</p>
                        <p className="text-xs text-slate-500">{track.size}</p>
                      </div>

                      {/* Download Button */}
                      <Button
                        onClick={() => handleDownload(track)}
                        className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white gap-2 group-hover:shadow-lg transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </div>
                  </div>

                  {/* Playing Indicator */}
                  {playingId === track.id && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((bar) => (
                            <div
                              key={bar}
                              className="w-1 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full animate-pulse"
                              style={{
                                height: `${12 + bar * 4}px`,
                                animationDelay: `${bar * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-600">Now playing...</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-600 text-sm">
          <p>SoundVault © 2024 • Share music, connect with listeners</p>
        </div>
      </footer>
    </div>
  );
}
