// Packages that should show major.minor (e.g., "5.7" not just "5")
const USE_MINOR_VERSION = new Set(['typescript', 'tailwindcss']);

// Packages to auto-fetch latest versions from npm registry
const PACKAGES = {
  VERSION_NEXTJS: 'next',
  VERSION_TYPESCRIPT: 'typescript',
  VERSION_TAILWIND: 'tailwindcss',
  VERSION_SHADCN: 'shadcn',
  VERSION_ZUSTAND: 'zustand',
  VERSION_TANSTACK_QUERY: '@tanstack/react-query',
  VERSION_REACT_HOOK_FORM: 'react-hook-form',
  VERSION_ZOD: 'zod',
  VERSION_NESTJS: '@nestjs/core',
  VERSION_PRISMA: 'prisma',
  VERSION_PNPM: 'pnpm',
  VERSION_VITEST: 'vitest',
  VERSION_PLAYWRIGHT: '@playwright/test',
  VERSION_ESLINT: 'eslint',
  VERSION_PRETTIER: 'prettier',
  VERSION_RESEND: 'resend',
  VERSION_NEXT_INTL: 'next-intl',
  VERSION_TURBOREPO: 'turbo',
};

// Fallback versions when offline
const FALLBACK_VERSIONS = {
  VERSION_NEXTJS: '15',
  VERSION_TYPESCRIPT: '5.7',
  VERSION_TAILWIND: '4',
  VERSION_SHADCN: '2',
  VERSION_ZUSTAND: '5',
  VERSION_TANSTACK_QUERY: '5',
  VERSION_REACT_HOOK_FORM: '7',
  VERSION_ZOD: '3',
  VERSION_NESTJS: '11',
  VERSION_PRISMA: '6',
  VERSION_PNPM: '9',
  VERSION_VITEST: '3',
  VERSION_PLAYWRIGHT: '1',
  VERSION_ESLINT: '9',
  VERSION_PRETTIER: '3',
  VERSION_RESEND: '4',
  VERSION_NEXT_INTL: '4',
  VERSION_TURBOREPO: '2',
  VERSION_NODE: '22',
  VERSION_POSTGRESQL: '17',
  VERSION_REDIS: '7',
};

async function fetchVersion(packageName) {
  const url = `https://registry.npmjs.org/${packageName}/latest`;
  const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) return null;
  const data = await res.json();
  const ver = data.version;
  const parts = ver.split('.');
  // Use major.minor for 0.x versions or packages in USE_MINOR_VERSION set
  if (parseInt(parts[0]) === 0 || USE_MINOR_VERSION.has(packageName)) {
    return `${parts[0]}.${parts[1]}`;
  }
  return parts[0];
}

export async function fetchLatestVersions(onProgress) {
  const versions = { ...FALLBACK_VERSIONS };
  const entries = Object.entries(PACKAGES);

  try {
    const results = await Promise.allSettled(
      entries.map(([key, pkg]) => fetchVersion(pkg).then((v) => [key, v]))
    );

    let fetched = 0;
    for (const result of results) {
      if (result.status === 'fulfilled' && result.value[1]) {
        const [key, ver] = result.value;
        versions[key] = ver;
        fetched++;
      }
    }

    if (onProgress) {
      onProgress(fetched, entries.length);
    }
  } catch {
    // Offline — use fallback versions silently
  }

  return versions;
}
