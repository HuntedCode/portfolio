// The exact npm this repo installs with: package.json "packageManager". See install-pinned-npm.mjs.

const PACKAGE_MANAGER = /^npm@(\d+\.\d+\.\d+)$/;

/** The `npm@x.y.z` spec from a parsed package.json. Throws if it is missing or not exact. */
export function pinnedNpmSpec(pkg) {
  const declared = pkg.packageManager;
  if (!declared || !PACKAGE_MANAGER.test(declared)) {
    throw new Error(
      `package.json "packageManager" must be an exact npm version like "npm@11.6.2", got ${JSON.stringify(declared)}`,
    );
  }
  return declared;
}
