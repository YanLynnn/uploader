import { head } from '@vercel/blob';

export default async function handler(req, res) {
  const name = String(req.query.name || '');
  if (!/^[A-Za-z0-9]{8}\.(mp3|mp4|jpg)$/.test(name)) {
    return res.status(404).send('Not found');
  }
  try {
    const blob = await head(name);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.redirect(302, blob.url);
  } catch {
    res.status(404).send('File tidak ditemukan');
  }
}
