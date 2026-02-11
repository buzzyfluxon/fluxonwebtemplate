import { useEffect, useRef, useState, FormEvent } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, Download, Link as LinkIcon, Moon, Sun, 
  Github, ExternalLink, Zap, Shield, Code, Sparkles, 
  Smartphone, Globe, Server, Database, Cpu, Layers, 
  CheckCircle, AlertCircle, Heart, X, Send, Menu, Search,
  Instagram, Twitter, Facebook, Youtube, Mail, Phone,
  HomeIcon, Info, Wrench, Palette, User, Terminal,
  Video, Headphones, PlayCircle, Volume2, VolumeX,
  RefreshCw, Merge, Settings, FileAudio, FileVideo
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: string;
  icon: JSX.Element;
}

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

interface TechStack {
  name: string;
  icon: string;
  color: string;
}

interface SocialLink {
  name: string;
  icon: JSX.Element;
  href: string;
}

interface VideoFormat {
  quality?: string;
  audioQuality?: string;
  extension?: string;
  size?: string;
  approxDurationMs?: string;
  url: string;
  hasAudio?: boolean;
  hasVideo?: boolean;
  bitrate?: string;
}

interface DownloadInfo {
  title: string;
  thumbnail: string;
  duration: string;
  formats: VideoFormat[];
  audios: VideoFormat[];
}

interface MergedFormat {
  video: VideoFormat;
  audio?: VideoFormat;
  quality: string;
  extension: string;
  size: string;
  hasAudio: boolean;
  isCombined: boolean;
}

const stats: Stat[] = [
  { label: "Downloads Processed", value: "1M+", icon: <Download className="h-5 w-5" /> },
  { label: "Active Users", value: "50K+", icon: <User className="h-5 w-5" /> },
  { label: "Supported Formats", value: "10+", icon: <Layers className="h-5 w-5" /> },
  { label: "Uptime", value: "99.9%", icon: <Server className="h-5 w-5" /> },
];

const features: Feature[] = [
  {
    title: "High-Speed Downloads",
    description: "Leverage our optimized servers for blazing-fast download speeds",
    icon: <Zap className="h-6 w-6" />
  },
  {
    title: "Secure Processing",
    description: "All downloads are processed securely with encrypted connections",
    icon: <Shield className="h-6 w-6" />
  },
  {
    title: "Multiple Formats",
    description: "Download in MP4, WebM, MP3, and many other formats",
    icon: <Code className="h-6 w-6" />
  },
  {
    title: "No Watermarks",
    description: "Clean downloads without any platform branding",
    icon: <Sparkles className="h-6 w-6" />
  },
  {
    title: "Mobile Friendly",
    description: "Fully responsive design that works on all devices",
    icon: <Smartphone className="h-6 w-6" />
  },
  {
    title: "Global CDN",
    description: "Content delivered through worldwide CDN for best performance",
    icon: <Globe className="h-6 w-6" />
  },
];

const techStack: TechStack[] = [
  { name: "Next.js", icon: "⚡", color: "text-black" },
  { name: "React", icon: "⚛️", color: "text-cyan-400" },
  { name: "TypeScript", icon: "📘", color: "text-blue-600" },
  { name: "Tailwind CSS", icon: "🎨", color: "text-teal-400" },
  { name: "Node.js", icon: "🟢", color: "text-green-500" },
  { name: "RapidAPI", icon: "🔌", color: "text-purple-500" },
  { name: "Netlify", icon: "▲", color: "text-[#00C7B7]" },
  { name: "Framer Motion", icon: "✨", color: "text-pink-500" },
];

const socialLinks: SocialLink[] = [
  { name: "GitHub", icon: <Github className="h-5 w-5" />, href: "https://github.com/buzzyfluxon" },
  { name: "Telegram", icon: <ExternalLink className="h-5 w-5" />, href: "http://t.me/contactflux_bot" },
  { name: "YouTube", icon: <Youtube className="h-5 w-5" />, href: "https://www.youtube.com/@adore-py" },
  { name: "Website", icon: <Globe className="h-5 w-5" />, href: "https://f1uxon.vercel.app/" },
];

export default function Home() {
  const refScrollContainer = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [downloadInfo, setDownloadInfo] = useState<DownloadInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [mergedFormats, setMergedFormats] = useState<MergedFormat[]>([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
  const [showMergingInstructions, setShowMergingInstructions] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match?.[1] ?? null;
  };

  const formatFileSize = (bytes?: string): string => {
    if (!bytes) return "Unknown size";
    const size = parseFloat(bytes);
    if (size < 1024) return size + " B";
    else if (size < 1048576) return (size / 1024).toFixed(1) + " KB";
    else if (size < 1073741824) return (size / 1048576).toFixed(1) + " MB";
    else return (size / 1073741824).toFixed(1) + " GB";
  };

  const handleDownload = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError("");
    setDownloadInfo(null);
    setSelectedFormat(null);
    setMergedFormats([]);
    setShowAdvancedOptions(false);

    try {
      const videoId = extractVideoId(url);
      if (!videoId) {
        throw new Error("Invalid YouTube URL. Please enter a valid YouTube or YouTube Shorts URL.");
      }

      const response = await fetch(
        `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${videoId}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "d13840a216msh2073ceebd127dd8p189c38jsnc553b6e7798c",
            "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch video details. Please try again.");
      }

      const data = await response.json();
      
      const allVideoFormats = data.videos?.items || [];
      const audioFormats = data.audios?.items || [];
      
      const videoWithAudio = allVideoFormats.filter((f: VideoFormat) => f.hasAudio);
      const videoWithoutAudio = allVideoFormats.filter((f: VideoFormat) => !f.hasAudio && f.hasVideo);
      
      const bestAudio = audioFormats.length > 0 ? audioFormats[0] : null;
      
      const merged: MergedFormat[] = [];
      
      videoWithAudio.forEach((video: VideoFormat) => {
        merged.push({
          video,
          audio: undefined,
          quality: video.quality || 'Unknown',
          extension: video.extension || 'mp4',
          size: video.size || 'Unknown',
          hasAudio: true,
          isCombined: false
        });
      });
      
      if (bestAudio) {
        videoWithoutAudio.forEach((video: VideoFormat) => {
          merged.push({
            video,
            audio: bestAudio,
            quality: `${video.quality} (With Audio)`,
            extension: video.extension || 'mp4',
            size: calculateCombinedSize(video.size, bestAudio.size),
            hasAudio: true,
            isCombined: true
          });
        });
      } else {
        videoWithoutAudio.forEach((video: VideoFormat) => {
          merged.push({
            video,
            audio: undefined,
            quality: `${video.quality} (Video Only)`,
            extension: video.extension || 'mp4',
            size: video.size || 'Unknown',
            hasAudio: false,
            isCombined: false
          });
        });
      }
      
      // Fixed: Proper type checking for match[1]
      merged.sort((a, b) => {
        const getQualityNum = (q: string | undefined) => {
          if (!q) return 0;
          const match = q.match(/(\d+)/);
          return match && match[1] ? parseInt(match[1]) : 0;
        };
        return getQualityNum(b.video.quality) - getQualityNum(a.video.quality);
      });

      setMergedFormats(merged);
      
      setDownloadInfo({
        title: data.title || "Untitled Video",
        thumbnail: data.thumbnails?.[0]?.url || "",
        duration: data.duration_formatted || "Unknown",
        formats: videoWithAudio,
        audios: audioFormats,
      });

    } catch (err: any) {
      setError(err.message || "Failed to process URL. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateCombinedSize = (videoSize?: string, audioSize?: string): string => {
    if (!videoSize && !audioSize) return "Unknown";
    
    const videoBytes = videoSize ? parseFloat(videoSize) : 0;
    const audioBytes = audioSize ? parseFloat(audioSize) : 0;
    const totalBytes = videoBytes + audioBytes;
    
    return totalBytes.toString();
  };

  const handleDirectDownload = async (format: VideoFormat | MergedFormat) => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setSelectedFormat('video' in format ? format.video : format);

    try {
      const isMerged = 'isCombined' in format;
      
      if (isMerged && format.isCombined) {
        const mergedFormat = format as MergedFormat;
        
        const videoLink = document.createElement('a');
        videoLink.href = mergedFormat.video.url;
        videoLink.download = `LinkFlux_${mergedFormat.video.quality || 'video'}_video.${mergedFormat.video.extension || 'mp4'}`;
        document.body.appendChild(videoLink);
        videoLink.click();
        document.body.removeChild(videoLink);
        
        setDownloadProgress(50);
        
        setTimeout(() => {
          if (mergedFormat.audio) {
            const audioLink = document.createElement('a');
            audioLink.href = mergedFormat.audio.url;
            audioLink.download = `LinkFlux_${mergedFormat.video.quality || 'video'}_audio.${mergedFormat.audio.extension || 'mp3'}`;
            document.body.appendChild(audioLink);
            audioLink.click();
            document.body.removeChild(audioLink);
            
            setDownloadProgress(100);
            
            setTimeout(() => {
              setShowMergingInstructions(true);
            }, 1000);
          } else {
            setDownloadProgress(100);
          }
        }, 1000);
      } else {
        const downloadFormat = 'video' in format ? format.video : format;
        const link = document.createElement('a');
        link.href = downloadFormat.url;
        link.target = '_blank';
        link.download = `LinkFlux_${downloadFormat.quality || 'download'}.${downloadFormat.extension || 'mp4'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        let progress = 0;
        const interval = setInterval(() => {
          progress += 20;
          setDownloadProgress(progress);
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsDownloading(false);
              setDownloadProgress(0);
            }, 500);
          }
        }, 200);
      }
    } catch (err) {
      setError("Download failed. Please try again.");
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const renderFormats = (formats: VideoFormat[], type: 'video' | 'audio') => {
    return formats.map((format, index) => (
      <div 
        key={index} 
        className={`rounded-lg p-4 transition-all duration-200 ${
          selectedFormat?.url === format.url 
            ? 'bg-red-600/20 border border-red-600/50' 
            : 'bg-black/50 border border-gray-800 hover:border-red-600/50'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {type === 'video' ? (
                format.hasAudio ? (
                  <Volume2 className="h-4 w-4 text-green-400" />
                ) : (
                  <VolumeX className="h-4 w-4 text-yellow-400" />
                )
              ) : (
                <Headphones className="h-4 w-4 text-blue-400" />
              )}
              <p className="font-medium text-white">
                {type === 'video' 
                  ? `${format.quality || 'Unknown'} ${format.hasAudio ? '' : '(Mute)'}`
                  : format.audioQuality || 'Audio'
                }
              </p>
              <span className="text-xs px-2 py-1 rounded bg-black/50 text-gray-300">
                {format.extension?.toUpperCase() || (type === 'audio' ? 'MP3' : 'MP4')}
              </span>
              {type === 'video' && format.hasAudio && (
                <span className="text-xs text-green-400">With Audio</span>
              )}
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-400">
              {format.size && (
                <span className="flex items-center gap-1">
                  <Database className="h-3 w-3" />
                  {formatFileSize(format.size)}
                </span>
              )}
              {type === 'audio' && format.bitrate && (
                <span className="text-xs text-blue-400">{format.bitrate}</span>
              )}
            </div>
          </div>
          <Button
            size="sm"
            className={`${
              type === 'video' && !format.hasAudio 
                ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900'
                : 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900'
            }`}
            onClick={() => handleDirectDownload(format)}
            disabled={isDownloading}
          >
            {isDownloading && selectedFormat?.url === format.url ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                {downloadProgress}%
              </>
            ) : (
              <>
                Download
                <Download className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    ));
  };

  const renderMergedFormats = () => {
    return mergedFormats.map((format, index) => (
      <div 
        key={index} 
        className={`rounded-lg p-4 transition-all duration-200 ${
          isDownloading ? 'bg-gray-800/50' : 'bg-black/50'
        } border border-gray-800 hover:border-red-600/50`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {format.isCombined ? (
                <Merge className="h-4 w-4 text-purple-400" />
              ) : format.hasAudio ? (
                <Volume2 className="h-4 w-4 text-green-400" />
              ) : (
                <VolumeX className="h-4 w-4 text-yellow-400" />
              )}
              <p className="font-medium text-white">
                {format.quality}
              </p>
              <span className="text-xs px-2 py-1 rounded bg-black/50 text-gray-300">
                {format.extension.toUpperCase()}
              </span>
              {format.isCombined && (
                <span className="text-xs text-purple-400">Best Quality</span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Database className="h-3 w-3" />
                {formatFileSize(format.size)}
              </span>
              {format.audio && (
                <span className="flex items-center gap-1 text-blue-400">
                  <Headphones className="h-3 w-3" />
                  + Audio Track
                </span>
              )}
              {format.isCombined && (
                <span className="flex items-center gap-1 text-purple-400">
                  <Merge className="h-3 w-3" />
                  Requires Merging
                </span>
              )}
            </div>
          </div>
          <Button
            size="sm"
            className={`${
              format.isCombined
                ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
                : format.hasAudio
                ? 'bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900'
                : 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900'
            }`}
            onClick={() => handleDirectDownload(format)}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                {downloadProgress}%
              </>
            ) : (
              <>
                {format.isCombined ? 'Get Both Files' : 'Download'}
                <Download className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        
        {format.isCombined && (
          <div className="mt-3 p-3 rounded bg-gray-900/30 text-xs text-gray-300 border border-gray-800">
            <p>🎯 <strong>Highest Quality Option:</strong> Download separate video and audio files for best quality.</p>
            <p className="mt-1">Merging instructions will be provided after download.</p>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={`${darkMode ? "dark bg-gray-900" : "bg-gray-50"} transition-colors duration-300`}>
      <div className="min-h-screen">
        <div className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"}`}>
          <div className="container flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800">
                <LinkIcon className="absolute inset-0 m-auto h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Link<span className="text-red-500">Flux</span>
              </span>
            </div>

            <nav className="hidden items-center space-x-8 md:flex">
              <Link href="#home" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#tech" className="text-gray-300 hover:text-white transition-colors">
                Tech Stack
              </Link>
              <Link href="#disclaimer" className="text-gray-300 hover:text-white transition-colors">
                Disclaimer
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="text-gray-300 hover:text-white hover:bg-black/50"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-300 hover:text-white"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className={`fixed inset-0 z-40 bg-black/90 transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}>
          <div className="flex h-full flex-col p-6">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800">
                  <LinkIcon className="absolute inset-0 m-auto h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">LinkFlux</span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-gray-300">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="mt-12 flex flex-col space-y-6">
              <Link href="#home" onClick={toggleMobileMenu} className="text-2xl font-medium text-gray-300 hover:text-white">
                Home
              </Link>
              <Link href="#about" onClick={toggleMobileMenu} className="text-2xl font-medium text-gray-300 hover:text-white">
                About
              </Link>
              <Link href="#features" onClick={toggleMobileMenu} className="text-2xl font-medium text-gray-300 hover:text-white">
                Features
              </Link>
              <Link href="#tech" onClick={toggleMobileMenu} className="text-2xl font-medium text-gray-300 hover:text-white">
                Tech Stack
              </Link>
              <Link href="#disclaimer" onClick={toggleMobileMenu} className="text-2xl font-medium text-gray-300 hover:text-white">
                Disclaimer
              </Link>
            </nav>
          </div>
        </div>

        <section id="home" className="relative min-h-screen pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>
          </div>
          
          <div className="container relative z-10 px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-4xl text-center"
            >
              <div className="mb-8 inline-flex items-center rounded-full bg-red-600/10 px-4 py-2">
                <Sparkles className="mr-2 h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">Premium Media Downloader</span>
              </div>
              
              <h1 className="text-5xl font-bold leading-tight tracking-tighter text-white md:text-7xl">
                Download <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Any Media</span>
                <br />
                In Seconds
              </h1>
              
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                LinkFlux is your ultimate solution for downloading high-quality media from YouTube, YouTube Shorts, and other platforms with blazing speed and security.
              </p>
              
              <div className="mx-auto mt-8 max-w-2xl">
                <div className="rounded-xl bg-black/50 p-1 backdrop-blur-sm">
                  <form onSubmit={handleDownload} className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                        <input
                          type="url"
                          value={url}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                          placeholder="Paste YouTube or YouTube Shorts URL here..."
                          className="w-full rounded-lg border border-gray-800 bg-black/50 pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600/50"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Get Formats
                          <PlayCircle className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                  
                  {error && (
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-900/20 p-4">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}
                  
                  {downloadInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 rounded-xl border border-gray-800 bg-black/50 p-6"
                    >
                      <div className="flex flex-col gap-6 md:flex-row">
                        <div className="flex-shrink-0">
                          <img
                            src={downloadInfo.thumbnail}
                            alt="Thumbnail"
                            className="h-40 w-72 rounded-lg object-cover"
                          />
                          <div className="mt-3 text-center">
                            <span className="inline-block rounded-full bg-red-600/20 px-3 py-1 text-xs text-red-400">
                              {downloadInfo.duration}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-white line-clamp-2">{downloadInfo.title}</h3>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                                className="text-gray-400 hover:text-white"
                              >
                                <Settings className="h-4 w-4 mr-2" />
                                {showAdvancedOptions ? 'Simple View' : 'Advanced'}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setDownloadInfo(null);
                                  setUrl("");
                                  setSelectedFormat(null);
                                  setMergedFormats([]);
                                }}
                                className="text-gray-400 hover:text-white"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {downloadInfo.audios.length > 0 && (
                            <div className="mt-6">
                              <div className="mb-4 flex items-center gap-2">
                                <Headphones className="h-5 w-5 text-blue-400" />
                                <h4 className="font-medium text-white">Audio Only Formats:</h4>
                                <span className="text-sm text-gray-400 ml-2">
                                  ({downloadInfo.audios.length} formats)
                                </span>
                              </div>
                              <div className="space-y-3">
                                {renderFormats(downloadInfo.audios, 'audio')}
                              </div>
                            </div>
                          )}
                          
                          {showAdvancedOptions && mergedFormats.length > 0 && (
                            <div className="mt-6">
                              <div className="mb-4 flex items-center gap-2">
                                <Merge className="h-5 w-5 text-purple-400" />
                                <h4 className="font-medium text-white">Enhanced Quality Options:</h4>
                                <span className="text-sm text-gray-400 ml-2">
                                  ({mergedFormats.filter(f => f.isCombined).length} combined formats)
                                </span>
                              </div>
                              <div className="space-y-3">
                                {renderMergedFormats()}
                              </div>
                              
                              <div className="mt-4 p-3 rounded-lg bg-purple-900/20 border border-purple-800/50">
                                <p className="text-sm text-purple-300">
                                  💡 <strong>Note:</strong> YouTube often separates high-quality video from audio.
                                  "With Audio" options combine video-only formats with separate audio tracks for best quality.
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {!showAdvancedOptions && downloadInfo.formats.length > 0 && (
                            <div className="mt-6">
                              <div className="mb-4 flex items-center gap-2">
                                <Video className="h-5 w-5 text-red-400" />
                                <h4 className="font-medium text-white">Ready-to-Use Formats:</h4>
                                <span className="text-sm text-gray-400 ml-2">
                                  ({downloadInfo.formats.filter(f => f.hasAudio).length} formats with audio)
                                </span>
                              </div>
                              {downloadInfo.formats.filter(f => f.hasAudio).length > 0 ? (
                                <div className="space-y-3">
                                  {renderFormats(downloadInfo.formats.filter(f => f.hasAudio), 'video')}
                                </div>
                              ) : (
                                <div className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-800/50">
                                  <p className="text-yellow-300">
                                    ⚠️ No formats with embedded audio found. Try "Advanced View" for combined video+audio options.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {showMergingInstructions && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                              <div className="relative w-full max-w-md rounded-lg bg-gray-900 p-6 border border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                  <h3 className="text-lg font-bold text-white">
                                    <Merge className="inline mr-2 h-5 w-5 text-purple-400" />
                                    How to Merge Video & Audio
                                  </h3>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowMergingInstructions(false)}
                                    className="text-gray-400 hover:text-white"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="space-y-3 text-gray-300">
                                  <p>You've downloaded separate video and audio files. Here's how to merge them:</p>
                                  <div className="p-3 rounded bg-gray-800">
                                    <h4 className="font-medium text-white mb-2">Option 1: FFmpeg (Recommended)</h4>
                                    <code className="block text-sm bg-black p-2 rounded">
                                      ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac output.mp4
                                    </code>
                                  </div>
                                  <div className="p-3 rounded bg-gray-800">
                                    <h4 className="font-medium text-white mb-2">Option 2: Online Tools</h4>
                                    <ul className="text-sm space-y-1">
                                      <li>• <a href="https://clideo.com/merge-video-and-audio" className="text-blue-400 hover:underline" target="_blank">Clideo</a></li>
                                      <li>• <a href="https://www.123apps.com/merge-video-audio/" className="text-blue-400 hover:underline" target="_blank">123Apps</a></li>
                                    </ul>
                                  </div>
                                  <div className="p-3 rounded bg-gray-800">
                                    <h4 className="font-medium text-white mb-2">Option 3: Desktop Software</h4>
                                    <ul className="text-sm space-y-1">
                                      <li>• DaVinci Resolve (Free)</li>
                                      <li>• Shotcut (Free)</li>
                                      <li>• Adobe Premiere Pro</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                  <Button
                                    onClick={() => setShowMergingInstructions(false)}
                                    className="bg-purple-600 hover:bg-purple-700"
                                  >
                                    Got it!
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                    Supports: YouTube Videos • YouTube Shorts • High Quality Audio Merging
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-24"
            >
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10">
                      <div className="text-red-400">{stat.icon}</div>
                    </div>
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-24">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-red-600/10 px-4 py-2">
                  <Info className="mr-2 h-4 w-4 text-red-400" />
                  <span className="text-sm font-medium text-red-400">ABOUT LINKFLUX</span>
                </div>
                <h2 className="text-4xl font-bold text-white md:text-5xl">
                  What is <span className="text-red-500">LinkFlux</span>?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                  LinkFlux is a cutting-edge media downloader built with modern web technologies, designed to provide 
                  fast, secure, and reliable downloads from various platforms including YouTube Shorts while maintaining an exceptional user experience.
                </p>
              </div>
              
              <div className="mt-16 grid gap-8 md:grid-cols-2">
                <Card className="border-gray-800 bg-black/50">
                  <CardContent className="p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10">
                      <Terminal className="h-6 w-6 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Our Mission</h3>
                    <p className="mt-4 text-gray-400">
                      To simplify media downloading while ensuring security, speed, and accessibility for everyone. 
                      We believe in providing a seamless experience without compromising on quality or safety.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-gray-800 bg-black/50">
                  <CardContent className="p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10">
                      <Zap className="h-6 w-6 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Why Choose Us</h3>
                    <p className="mt-4 text-gray-400">
                      With advanced optimization algorithms and global CDN support, LinkFlux delivers 
                      unmatched download speeds while maintaining the highest security standards. Now with YouTube Shorts support!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-black/30 py-24">
          <div className="container px-6">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-red-600/10 px-4 py-2">
                <Sparkles className="mr-2 h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">FEATURES</span>
              </div>
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                Powerful <span className="text-red-500">Features</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                Everything you need for seamless media downloading
              </p>
            </div>
            
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-gray-800 bg-black/50 transition-all hover:border-red-600/50">
                    <CardContent className="p-8">
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10">
                        <div className="text-red-400">{feature.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                      <p className="mt-3 text-gray-400">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="tech" className="py-24">
          <div className="container px-6">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-red-600/10 px-4 py-2">
                <Code className="mr-2 h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">TECHNOLOGY STACK</span>
              </div>
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                Built With <span className="text-red-500">Modern Tech</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                Leveraging cutting-edge technologies for optimal performance
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl border border-gray-800 bg-black/50 p-6 text-center transition-all hover:border-red-600/50"
                >
                  <div className="text-3xl">{tech.icon}</div>
                  <div className={`mt-4 text-lg font-medium ${tech.color}`}>{tech.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="disclaimer" className="bg-black/30 py-24">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-red-600/10 px-4 py-2">
                  <Shield className="mr-2 h-4 w-4 text-red-400" />
                  <span className="text-sm font-medium text-red-400">DISCLAIMER & CREATOR</span>
                </div>
                <h2 className="text-4xl font-bold text-white md:text-5xl">
                  Important <span className="text-red-500">Information</span>
                </h2>
              </div>
              
              <div className="mt-16 space-y-8">
                <Card className="border-red-600/30 bg-red-600/5">
                  <CardContent className="p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <AlertCircle className="h-6 w-6 text-red-400" />
                      <h3 className="text-xl font-bold text-white">Disclaimer</h3>
                    </div>
                    <div className="space-y-4 text-gray-400">
                      <p>
                        LinkFlux is a tool for personal use only. Users are responsible for complying with all 
                        applicable laws and regulations regarding copyright and content usage.
                      </p>
                      <p>
                        We do not host any content on our servers. All media is processed through third-party 
                        platforms and APIs. Use this service responsibly and respect content creators' rights.
                      </p>
                      <div className="rounded-lg bg-black/50 p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 text-green-400" />
                          <div>
                            <p className="font-medium text-white">Fair Use Policy</p>
                            <p className="mt-1 text-sm text-gray-400">
                              Only download content you have rights to or that is in the public domain.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-gray-800 bg-black/50">
                  <CardContent className="p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <User className="h-6 w-6 text-red-400" />
                      <h3 className="text-xl font-bold text-white">Creator</h3>
                    </div>
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                      <div className="flex-1">
                        <p className="text-gray-400">
                          LinkFlux was created by <span className="font-medium text-white">f1uxon</span>, 
                          a passionate developer dedicated to building innovative web solutions with 
                          modern technologies.
                        </p>
                        <div className="mt-4 flex gap-4">
                          {socialLinks.map((social) => (
                            <Link
                              key={social.name}
                              href={social.href}
                              target="_blank"
                              className="rounded-lg bg-black/50 p-3 text-gray-400 transition-all hover:bg-red-600/10 hover:text-white"
                              title={social.name}
                            >
                              {social.icon}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="inline-block rounded-lg bg-gradient-to-br from-red-600 to-red-800 p-1">
                          <div className="rounded-md bg-black p-4">
                            <Github className="h-8 w-8 text-red-400" />
                          </div>
                        </div>
                        <p className="mt-3 font-medium text-white">GitHub: buzzyfluxon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-800 bg-black py-12">
          <div className="container px-6">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800">
                    <LinkIcon className="absolute inset-0 m-auto h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">
                    Link<span className="text-red-500">Flux</span>
                  </span>
                </div>
                <p className="mt-4 text-gray-400">
                  The ultimate media downloader with speed, security, and simplicity.
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Quick Links</h4>
                <nav className="mt-4 space-y-2">
                  <Link href="#home" className="block text-gray-500 hover:text-white transition-colors">
                    Home
                  </Link>
                  <Link href="#about" className="block text-gray-500 hover:text-white transition-colors">
                    About
                  </Link>
                  <Link href="#features" className="block text-gray-500 hover:text-white transition-colors">
                    Features
                  </Link>
                  <Link href="#tech" className="block text-gray-500 hover:text-white transition-colors">
                    Tech Stack
                  </Link>
                  <Link href="#disclaimer" className="block text-gray-500 hover:text-white transition-colors">
                    Disclaimer
                  </Link>
                </nav>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Contact</h4>
                <nav className="mt-4 space-y-2">
                  <a href="https://github.com/buzzyfluxon" target="_blank" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors">
  <Github className="h-4 w-4" />
  <span>GitHub</span>
</a>
<a href="http://t.me/contactflux_bot" target="_blank" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors">
  <Send className="h-4 w-4" />
  <span>Telegram</span>
</a>
<a href="https://www.youtube.com/@adore-py" target="_blank" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors">
  <Youtube className="h-4 w-4" />
  <span>YouTube</span>
</a>
<a href="https://f1uxon.vercel.app/" target="_blank" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors">
  <Globe className="h-4 w-4" />
  <span>Developer</span>
</a>
<a href="mailto:support@linkflux.in" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors">
  <Mail className="h-4 w-4" />
  <span>Email</span>
</a>
                </nav>
              </div>
              
              <div>
  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Social</h4>
  <div className="mt-4 flex space-x-4">
    <a href="https://github.com/buzzyfluxon" target="_blank" className="text-gray-400 hover:text-white">
      <Github className="h-5 w-5" />
    </a>
    <a href="http://t.me/contactflux_bot" target="_blank" className="text-gray-400 hover:text-white">
      <Send className="h-5 w-5" />
    </a>
    <a href="https://www.youtube.com/@adore-py" target="_blank" className="text-gray-400 hover:text-white">
      <Youtube className="h-5 w-5" />
    </a>
    <a href="https://f1uxon.vercel.app/" target="_blank" className="text-gray-400 hover:text-white">
      <Globe className="h-5 w-5" />
    </a>
    <a href="mailto:support@linkflux.in" className="text-gray-400 hover:text-white">
      <Mail className="h-5 w-5" />
    </a>
  </div>
              </div>
            </div>
            
            <div className="mt-12 border-t border-gray-800 pt-8">
              <div className="flex flex-col items-center justify-between md:flex-row">
                <div className="text-center md:text-left">
                  <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} LinkFlux. All rights reserved.
                  </p>
                </div>
                
                <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500 md:mt-0">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Made with ❤️ by fluxon</span>
                </div>
              </div>
              
              <div className="mt-4 text-center text-xs text-gray-600">
                <p>LinkFlux uses RapidAPI for YouTube media processing. This is a demonstration project.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
