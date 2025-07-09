# 🔐 env-encrypter

[![npm version](https://img.shields.io/npm/v/env-encrypter.svg)](https://www.npmjs.com/package/env-encrypter)
[![npm downloads](https://img.shields.io/npm/dt/env-encrypter.svg)](https://www.npmjs.com/package/env-encrypter)
[![GitHub stars](https://img.shields.io/github/stars/PrashantSharma0512/env-encrypter?style=social)](https://github.com/PrashantSharma0512/env-encrypter/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node Version](https://img.shields.io/node/v/env-encrypter.svg)](https://nodejs.org)

**Secure .env File Encryption & Runtime Decryption for Node.js Projects**

Safely encrypt sensitive environment variables using AES-256. Easily integrate with Express, CI/CD pipelines, or production environments — without exposing your secrets in plaintext. Built for developers who want strong config security with CLI flexibility.


Encrypt your `.env` files into `.env.enc` using military-grade AES-256 encryption, while maintaining seamless access to decrypted values at runtime.

## Why This Matters

### The Problem
- 🔓 `.env` files contain sensitive credentials in plain text
- ❌ Accidental commits expose API keys, database credentials
- 🛡️ Plaintext storage is insecure even in private repos

### The Solution
- 🔒 Encrypt `.env` → `.env.enc` (safe to commit)
- 🔑 Decrypt at runtime with a secret key
- 🚫 Never store plaintext secrets in your project

## ✨ Key Features

- **AES-256-CBC Encryption** - Industry-standard security
- **Zero Dependencies** - Uses Node.js native crypto module
- **CLI & Programmatic API** - Flexible integration
- **Cross-Platform** - Works on Windows, Linux, macOS
- **Version Control Safe** - Commit encrypted `.env.enc`
- **Runtime Proxy** - Easy access to decrypted values

## 🚀 Quick Start

### 1. Installation
```bash
npm install env-encrypter --save-dev
# or
yarn add env-encrypter -D
```

### 2. Encrypt Your .env
```bash
npx env-encrypter encrypt
```
(Follow prompts to set encryption key)

### 3. Use in Your Application
```javascript
// Initialize decryption
require('env-encrypter/decrypt')();

// Access decrypted values
const dbPass = global.decrypt('DB_PASSWORD');
```

### Decrypt .env.enc → .env (for development)
```bash
npx env-encrypter decrypt
```

## 🛠️ Advanced Integration

### Express.js Example
```javascript
const express = require('express');
require('env-encrypter/decrypt')(); // Initialize decryption

const app = express();

app.get('/', (req, res) => {
  // Access decrypted values
  const apiKey = global.decrypt('API_KEY');
  res.send(`API Key: ${apiKey}`);
});

app.listen(3000);
```

### Next.js Compatibility
Create `next.config.js`:
```javascript
require('env-encrypter/decrypt')();

module.exports = {
  env: {
    SECRET_KEY: global.decrypt('SECRET_KEY')
  }
}
```

## 🔑 Key Management

### Setting the Encryption Key
**Linux/macOS (Bash):**
```bash
export ENV_ENCRYPT_KEY="your-32-character-super-secret-key"
```

**Windows (PowerShell):**
```powershell
$env:ENV_ENCRYPT_KEY="your-32-character-super-secret-key"
```

**For CI/CD Pipelines:**
```yaml
# GitHub Actions example
env:
  ENV_ENCRYPT_KEY: ${{ secrets.ENV_ENCRYPT_KEY }}
```

## 📂 Project Structure Best Practices

```
project-root/
├── .env                # ⚠️ Local only (in .gitignore)
├── .env.enc            # ✅ Safe to commit
├── src/
│   └── index.js        # Requires env-encrypter
└── package.json
```

## 🛡️ Security Considerations

1. **Never** commit `.env` to version control
2. **Always** use 32-character encryption keys
3. **Rotate keys** if compromised
4. **Store keys** in secure locations:
   - CI/CD secret variables
   - AWS Secrets Manager
   - HashiCorp Vault
5. Consider using `.env.example` for required variable documentation

## ❓ FAQ

### Q: What happens if I lose my encryption key?
A: Without the key, your `.env.enc` file cannot be decrypted. Always store your key securely.

### Q: Can I use different encryption algorithms?
A: Currently only AES-256-CBC is supported for security reasons.

### Q: How do I handle different environments?
```bash
npx env-encrypter encrypt --input .env.prod --output .env.prod.enc
```

### Q: Is this production-ready?
A: Yes, but ensure proper key management in production environments.

## 🤝 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📜 License

MIT © Prashant Sharma

---

**Pro Tip**: For automated key injection in development, add this to your shell profile:
```bash
# ~/.bashrc or ~/.zshrc
export ENV_ENCRYPT_KEY="your-development-key-here"
```
