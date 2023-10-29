import { IncomingMessage, ServerResponse } from 'http';
import fetch from 'node-fetch';

export default async (req: IncomingMessage, res: ServerResponse) => {
  const fileUrl = (req as any).query.fileUrl;
  console.log('fileUrl : ', fileUrl);
  if (!fileUrl) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'fileUrl parameter is required.' }));
    return;
  }

  try {
    const firebaseResponse = await fetch(fileUrl);
    const fileData = await firebaseResponse.arrayBuffer();

    res.setHeader(
      'Content-Type',
      firebaseResponse.headers.get('Content-Type') || '',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=desired_filename.extension',
    );
    res.end(Buffer.from(fileData));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Failed to download file.' }));
  }
};
