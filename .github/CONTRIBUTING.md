# Contributing to Velyx CLI

Thank you for your interest in contributing to the Velyx CLI! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Project Architecture](#project-architecture)
- [Coding Standards](#coding-standards)
- [Testing](#testing)

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Use the Bug Report template and provide:**

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Error messages or stack traces
- Node.js and pnpm versions
- Laravel project version
- Operating system

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the proposed enhancement
- Explain why this enhancement would be useful
- List examples or use cases
- Consider whether it fits the project's scope and goals

### Pull Requests

1. **Fork the repository** and create your branch from `main`.
2. **Make your changes** following our [Coding Standards](#coding-standards).
3. **Add tests** for your changes.
4. **Ensure all tests pass**.
5. **Commit your changes** with clear, descriptive commit messages.
6. **Push to your branch** and create a Pull Request.

**Pull Request Checklist:**

- [ ] Title follows the convention (e.g., "fix: handle edge case in component install")
- [ ] Description clearly explains the changes and their rationale
- [ ] Code follows TypeScript and project conventions
- [ ] Tests are included and pass
- [ ] Documentation is updated if needed
- [ ] No breaking changes without proper justification

## Development Setup

The Velyx CLI is a Node.js/TypeScript CLI tool for adding components to Laravel projects.

### Prerequisites

- Node.js 18+ or 20+
- pnpm 8+
- TypeScript 5+
- A Laravel project for testing

### Installation

```bash
# Install dependencies
pnpm install

# Build the CLI
pnpm build

# Link for local testing
pnpm link

# Run the CLI
velyx --help
```

### Development Workflow

```bash
# Watch mode for development
pnpm dev

# Run the built CLI
pnpm start

# Run linting
pnpm check:ci

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Testing in a Laravel Project

To test the CLI in an actual Laravel project:

```bash
# In the velyx-cli directory
pnpm link

# In your Laravel project directory
velyx add button
```

## Project Architecture

The CLI follows a service-oriented architecture with dependency injection:

```
src/
├── commands/          # CLI command definitions
│   ├── add.ts
│   ├── init.ts
│   └── list.ts
├── services/          # Business logic
│   ├── AddService.ts
│   ├── ComponentService.ts
│   ├── RegistryService.ts
│   └── DependencyService.ts
├── utils/             # Utility functions
│   ├── file.ts
│   └── validation.ts
├── config/            # Configuration
│   └── constants.ts
└── index.ts           # Entry point
```

### Services

Services accept interfaces for dependency injection and handle core business logic:

- **AddService**: Handles component installation
- **ComponentService**: Manages component data
- **RegistryService**: Communicates with the component registry
- **DependencyService**: Handles npm/Composer dependencies

### File Operations

File operations use a transaction-like pattern with backup/restore:

```typescript
// Example pattern
const backupPath = await backupFile(targetPath);
try {
  // Perform file operations
  await writeFile(targetPath, content);
} catch (error) {
  await restoreFile(backupPath);
  throw error;
}
```

## Coding Standards

### TypeScript Standards

- Use strict TypeScript configuration
- Type all function parameters and return values
- Use interfaces for object shapes
- Prefer `const` over `let`
- Use template literals for string concatenation
- Avoid `any` type

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check for issues
pnpm check:ci

# Fix issues automatically
pnpm lint:fix
```

### Command Structure

CLI commands follow this pattern:

```typescript
import { Command } from 'commander';
import { AddService } from '../services/AddService';

export const addCommand = new Command('add')
  .argument('<component>', 'Name of the component to add')
  .option('-v, --version <version>', 'Specific version to install')
  .description('Add a component to your Laravel project')
  .action(async (component, options) => {
    const service = new AddService(/* dependencies */);
    await service.execute(component, options);
  });
```

### Error Handling

- Use custom error classes for specific error types
- Provide clear, actionable error messages
- Log errors appropriately
- Clean up resources on error

```typescript
export class ComponentNotFoundError extends Error {
  constructor(componentName: string) {
    super(`Component "${componentName}" not found in registry`);
    this.name = 'ComponentNotFoundError';
  }
}
```

### Validation

Use Zod for input validation:

```typescript
import { z } from 'zod';

const ComponentSchema = z.object({
  name: z.string().min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  files: z.array(z.string()),
});
```

## Testing

We use Vitest for testing.

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test -- add.test.ts
```

### Writing Tests

- Write unit tests for all services
- Write integration tests for CLI commands
- Use descriptive test names
- Follow Arrange-Act-Assert pattern
- Mock external dependencies (registry API, file system)

**Example:**

```typescript
import { describe, it, expect, vi } from 'vitest';
import { AddService } from '../AddService';

describe('AddService', () => {
  it('should install component successfully', async () => {
    // Arrange
    const mockRegistry = { fetchComponent: vi.fn().mockResolvedValue({ /* ... */ }) };
    const service = new AddService(mockRegistry);

    // Act
    await service.execute('button', {});

    // Assert
    expect(mockRegistry.fetchComponent).toHaveBeenCalledWith('button');
  });
});
```

### Test Coverage

We aim for high test coverage. New features should include tests for:

- Happy path scenarios
- Error cases
- Edge cases
- Validation failures

## Building

### Build Commands

```bash
# Development build
pnpm build

# Production build
pnpm build:prod

# Watch mode
pnpm dev
```

### Build Output

The built CLI is output to `dist/` and can be run with:

```bash
node dist/index.js
```

## Publishing

```bash
# Publish to npm (beta)
pnpm pub:beta

# Publish to npm (next)
pnpm pub:next

# Publish to npm (latest)
pnpm pub:release
```

## Useful Commands

```bash
# Check for outdated dependencies
pnpm outdated

# Update dependencies
pnpm update

# Audit for security vulnerabilities
pnpm audit

# Clean build artifacts
pnpm clean
```

## Getting Help

If you need help contributing:

- Check [Velyx documentation](https://docs.velyx.dev)
- Search [existing issues](https://github.com/velyx-dev/velyx-cli/issues)
- Start a [discussion](https://github.com/velyx-dev/velyx-cli/discussions)
- Contact us at [hello@velyx.dev](mailto:hello@velyx.dev)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
