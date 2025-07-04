import { createDecipheriv } from 'crypto';
import { readFileSync } from 'fs';

const algorithm = 'aes-256-cbc';
let cache: Record<string, string> | null = null;

function loadEnvMap(encPath: string, key: string) {
  if (cache) return cache;
  const content = readFileSync(encPath, "utf8");
  const [ivHex, encrypted] = content.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  cache = {};
  decrypted.split("\n").forEach(line => {
    const [k, v] = line.split("=");
    if (k) cache![k.trim()] = v?.trim();
  });
  return cache!;
}

export function createEnvDecryptProxy(key: string, encPath = ".env.enc") {
  const envMap = loadEnvMap(encPath, key);
  return new Proxy(envMap, {
    get(target, prop: string) {
      return target[prop];
    }
  });
}
