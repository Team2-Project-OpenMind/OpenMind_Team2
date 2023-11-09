export default async function CopyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.log(err);
  }
}
