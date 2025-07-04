#!/usr/bin/env node
import { Command } from "commander";
import readline from "readline";
import { encryptEnvFile } from "./encryptEnvFile.js";
import { decryptEnvFile } from "./decryptEnvFile.js";
import { createEnvDecryptProxy } from "./decryptProxy.js";
const program = new Command();
function askForKey() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question("Enter your 32-character encryption key: ", (answer) => {
            rl.close();
            if (answer.length !== 32) {
                console.error("❌ Key must be exactly 32 characters!");
                process.exit(1);
            }
            resolve(answer);
        });
    });
}
program
    .name("env-encrypter")
    .description("Encrypt/decrypt .env files with interactive key prompt");
program
    .command("encrypt")
    .description("Encrypt .env → .env.enc")
    .action(async () => {
    const key = await askForKey();
    encryptEnvFile(key);
});
program
    .command("decrypt")
    .description("Decrypt .env.enc → .env")
    .action(async () => {
    const key = await askForKey();
    decryptEnvFile(key);
});
program
    .command("inject-proxy")
    .description("Attach decrypt proxy to process.env.decrypt")
    .action(async () => {
    const key = await askForKey();
    globalThis.decrypt = createEnvDecryptProxy(key);
    console.log("✅ process.env.decrypt proxy ready.");
});
program.parse(process.argv);
