import fs from 'fs';
import type { VelarConfig } from '../types/meta.js';

export function writeVelarConfig(config: VelarConfig) {
  fs.writeFileSync('velar.json', JSON.stringify(config, null, 2) + '\n', 'utf8');
}

export function readVelarConfig(): VelarConfig {
  if (!fs.existsSync('velar.json')) {
    throw new Error('Velar configuration not found.');
  }
  return JSON.parse(fs.readFileSync('velar.json', 'utf8'));
}

export function updateVelarConfig(updates: Partial<VelarConfig>) {
  const config = readVelarConfig();
  if (!config) {
    throw new Error('Velar configuration not found.');
  }
  const newConfig = { ...config, ...updates };
  writeVelarConfig(newConfig);
}

export function deleteVelarConfig() {
  if (fs.existsSync('velar.json')) {
    fs.unlinkSync('velar.json');
  }
}