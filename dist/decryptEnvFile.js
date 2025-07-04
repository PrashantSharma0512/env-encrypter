import { createDecipheriv } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
const algorithm = 'aes-256-cbc';
export function decryptEnvFile(key, encPath = ".env.enc", outPath = ".env") {
    const content = readFileSync(encPath, "utf8");
    const [ivHex, encrypted] = content.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    writeFileSync(outPath, decrypted);
    console.log(`decrypted → ${outPath}`);
}
