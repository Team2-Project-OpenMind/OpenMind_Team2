const YOUTUBE_BASE = 'https://www.youtube.com/watch?v=';

const handleExtractVideoId = (content) => {
  const youtubeBaseIndex = content?.indexOf(YOUTUBE_BASE);

  if (youtubeBaseIndex !== -1) {
    const startIndex = youtubeBaseIndex + YOUTUBE_BASE.length;
    const endIndex = startIndex + 12;

    const youtubeVideoId = content?.substring(startIndex, endIndex);

    return youtubeVideoId;
  } else {
    return null;
  }
};

export default handleExtractVideoId;
