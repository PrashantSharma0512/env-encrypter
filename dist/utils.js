export function getKey() {
    const key = process.env.ENV_ENCRYPT_KEY;
    if (!key || key.length !== 32) {
        throw new Error("ENV_ENCRYPT_KEY must be set to exactly 32 characters");
    }
    return key;
}
