# Security Policy

## Supported Versions

Security updates are provided for the following versions:

| Version | Supported          |
|---------|--------------------|
| Latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in the Velyx CLI, please follow these steps:

### Do NOT create a public issue

Security vulnerabilities should **not** be reported via public GitHub issues. Instead, please follow the process below.

### How to Report

1. **Email us at** [security@velyx.dev](mailto:security@velyx.dev)
2. Include as much detail as possible:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact
   - Suggested fix (if known)
   - Proof of concept (if available, encrypted)

### What to Expect

- **Confirmation**: We will acknowledge receipt of your report within 48 hours
- **Investigation**: We will investigate the vulnerability and determine its severity using CVSS scoring
- **Resolution**: We will work on a fix and aim to release a patch within:
  - 7 days for Critical severity
  - 14 days for High severity
  - 30 days for Medium severity
  - 90 days for Low severity
- **Disclosure**: We will coordinate public disclosure with you to ensure users have time to update

### Security Best Practices

When reporting vulnerabilities:

- Use PGP encryption for sensitive information
- Do not exploit the vulnerability beyond what's necessary for demonstration
- Do not access, modify, or delete user files without permission
- Do not disclose the vulnerability publicly until we've addressed it
- Give us reasonable time to respond before considering public disclosure (typically 90 days)

## Scope

This security policy covers:

- The Velyx CLI tool (`velyx` command)
- File operations performed by the CLI
- Network requests to the registry
- Dependency installation processes
- Authentication and credential handling

### Out of Scope

The following are explicitly out of scope:

- Third-party npm packages and their vulnerabilities
- User's Laravel project security
- Issues requiring physical access to user's systems
- Social engineering attacks
- DDoS attacks

## Vulnerability Types

We're particularly interested in reports about:

- **Code execution vulnerabilities** (RCE via malicious components)
- **Path traversal vulnerabilities** (writing files outside target directory)
- **Command injection** via component names or options
- **Credential leakage** (exposing API keys, tokens)
- **Dependency confusion** (supply chain attacks)
- **Man-in-the-middle attacks** (registry API communication)
- **Insecure file permissions**
- **Token/secret exposure in logs**

## Security Features

The Velyx CLI implements several security measures:

- File path validation to prevent path traversal
- Component name validation using Zod schemas
- HTTPS-only communication with the registry
- Secure dependency resolution
- Backup/restore mechanism for failed operations
- Input sanitization for all user inputs

## Security Considerations for Users

### Component Installation

When installing components, the Velyx CLI:

- Only fetches from the official registry
- Validates component signatures (future)
- Creates backups before modifying files
- Shows a preview of changes before applying them

### Recommended Practices

- Only install components from trusted sources
- Review component code before using in production
- Keep the CLI updated to the latest version
- Use version control (Git) to track changes
- Review the list of files being modified

## Dependency Security

We actively monitor our dependencies for security vulnerabilities:

- We use GitHub's Dependabot for automated dependency updates
- Security advisories will be published for vulnerable dependencies
- We aim to patch critical dependencies within 7 days of disclosure

## Security FAQ

**Q: Can the CLI execute arbitrary code on my machine?**
A: The CLI only installs files defined by components in the registry. It doesn't execute arbitrary code. However, components may include PHP/JavaScript files that your application will execute.

**Q: How do I know a component is safe?**
A: Components are developed by the Velyx team and community. Always review component code before using in production. Components will eventually have code signing for verification.

**Q: Can I submit a security issue via GitHub?**
A: Please use encrypted email instead of GitHub issues to keep vulnerabilities private until they're fixed.

**Q: What if I don't receive a response?**
A: If you don't receive a response within 48 hours, please follow up. If another 48 hours passes without a response, you may escalate to [hello@velyx.dev](mailto:hello@velyx.dev).

**Q: Will I be credited for finding a vulnerability?**
A: Yes, with your permission, we'll credit you in the security advisory and our security hall of fame.

**Q: Do you offer a bug bounty program?**
A: We don't currently have a formal bug bounty program, but we do acknowledge and appreciate responsible disclosures.

## Preferred Languages

We prefer security reports in English, but can also work with reports in French if needed.

## Contact

For general security questions or concerns, contact us at:
- Email: [security@velyx.dev](mailto:security@velyx.dev)
- X (formerly Twitter): [@velyxdev](https://x.com/velyxdev)

Thank you for helping keep Velyx secure!
