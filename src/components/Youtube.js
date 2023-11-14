import YouTube from 'react-youtube';

export default function YoutubePlayer({ videoId }) {
  return (
    <YouTube
      key={videoId}
      videoId={videoId}
      opts={{
        width: '450',
        height: '270',
        playerVars: { enablejsapi: 1, origin: window.location.origin, loop: 1 },
      }}
      onEnd={(e) => {
        e.target.stopVideo(0);
        e.target.mute();
      }}
    />
  );
}
