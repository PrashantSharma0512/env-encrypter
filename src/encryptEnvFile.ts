import { createCipheriv, randomBytes } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';

const algorithm = 'aes-256-cbc';

export function encryptEnvFile(key: string, envPath = ".env", outPath = ".env.enc") {
  const iv = randomBytes(16);
  const data = readFileSync(envPath, 'utf8');
  const cipher = createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  writeFileSync(outPath, iv.toString("hex") + ":" + encrypted);
  console.log(`encrypted → ${outPath}`);
}