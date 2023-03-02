import {
  PassThrough,
  Readable,
}               from 'stream'

// The npm package of my best choice for QR code decoding on Angular SPA
// https://dev.to/j_sakamoto/the-npm-package-of-my-best-choice-for-qr-code-decoding-on-angular-spa-4747?returning-user=true
import QRCode from 'qrcode'
/**
 * https://www.npmjs.com/package/qrcode
 *  Huan(202002): This module is encode only.
 */
import { toFileStream } from 'qrcode'

export async function bufferToQrValue (buf: Buffer): Promise<string> {
  let qrvalue = "";
  QRCode.toString(buf.toString(), { errorCorrectionLevel: 'H' }, function (err, value) {
    if (err) throw err;
    qrvalue = value;
  });
  return qrvalue;

}

export async function qrValueToStream (value: string): Promise<Readable> {
  const stream = new PassThrough()
  await toFileStream(stream, value) // only support .png for now
  return stream
}
