export default function shareKakao({ url, title, description, imageUrl }) {
  window.Kakao?.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: title,
      description: description,
      imageUrl: imageUrl,
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
    buttons: [
      {
        title: title,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    ],
  });
}
