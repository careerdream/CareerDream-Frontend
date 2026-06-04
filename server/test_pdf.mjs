import { PDFParse } from 'pdf-parse';
import fs from 'fs';

async function test() {
  const buffer = Buffer.from('JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSCgkvRjIgNSAwIFIKICAgID4+CiAgPj4KICAvQ29udGVudHMgNiAwIFIKPj4KZW5kb2JqCgo0IDAgb2JqCjw8CiAgL1R5cGUgL0ZvbnQKICAvU3VidHlwZSAvVHlwZTEKICAvQmFzZUZvbnQgL1RpbWVzLVJvbWFuCj4+CmVuZG9iagoKNSAwIG9iago8PAogIC9UeXBlIC9Gb250CiAgL1N1YnR5cGUgL1R5cGUxCiAgL0Jhc2VGb250IC9IZWx2ZXRpY2EtdHlwZTFjCj4+CmVuZG9iagoKNiAwIG9iago8PAogIC9MZW5ndGggNzMKPj4Kc3RyZWFtCkJUCi9GMSAxOCBUZgowIDAgVCBvCjg4IDExMiBUZAooSGVsbG8gV29ybGQpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKCnhyZWYKMCA3CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxMCAwMDAwMCBuIAowMDAwMDAwMDY4IDAwMDAwIG4gCjAwMDAwMDAxNTMgMDAwMDAgbiAKMDAwMDAwMDI5MiAwMDAwMCBuIAowMDAwMDAwMzgxIDAwMDAwIG4gCjAwMDAwMDA0NzQgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDcKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNTk4CiUlRU9GCg==', 'base64');
  try {
    const parser = new PDFParse();
    await parser.load(buffer);
    const text = await parser.getText();
    console.log('Success:', text);
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
