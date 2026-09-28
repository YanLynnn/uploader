import { handleUpload } from '@vercel/blob/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const json = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!/^[A-Za-z0-9]{8}\.(mp3|mp4|jpg)$/.test(pathname)) {
          throw new Error('Nama file tidak valid');
        }
        return {
          allowedContentTypes: ['audio/mpeg', 'video/mp4', 'image/jpeg'],
          maximumSizeInBytes: 100 * 1024 * 1024, // 100 MB
          addRandomSuffix: false,
          allowOverwrite: false,
        };
      },
      onUploadCompleted: async () => {},
    });
    res.status(200).json(json);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
