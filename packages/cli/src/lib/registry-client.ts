import fetch from 'node-fetch';

const REGISTRY_BASE_URL = 'https://ui.solancn.com/r';

export async function fetchRegistryItem(name: string) {
  const response = await fetch(`${REGISTRY_BASE_URL}/${name}.json`);
  return response.json();
}

export async function fetchAllRegistryItems() {
  const response = await fetch(`${REGISTRY_BASE_URL}/registry.json`);
  return response.json();
}