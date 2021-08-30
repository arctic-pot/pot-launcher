import { Directory } from '../../typings/common';
import fs from 'fs-extra';

type RuleFeatures = 'is_demo_user' | 'has_custom_resolution';
type RuleOs = 'name' | 'version' | 'arch';

export interface IRule {
  action: 'allow' | 'disallow';
  features?: Record<RuleFeatures, boolean>;
  os?: Record<RuleOs, string>;
}

export interface IArgumentWithRule {
  rules: IRule[];
  value: string[] | string;
}

export interface ILibrary {
  downloads: {
    artifact: {
      path: string;
      sha1?: string;
      size?: number;
      url: string;
    };
  };
  name: string;
  rules?: IRule[];
}

export type IArgument = string | IArgumentWithRule;

export interface IVersion {
  // Display name on the UI
  displayName: string;
  // ID
  id: string;
  // This is true if the version is a snapshot version
  snapshot: boolean;
  // Assets version
  assets: string;
  // Game starting arguments
  gameArguments: IArgument[];
  // JVM arguments
  jvmArguments?: IArgument[];
  // Required JRE version
  javaVersion: 8 | 16;
  // Used libraries
  libraries: ILibrary[];
  /**
   * HMCL, aka. Hello Minecraft Launcher,
   * a famous third-party Minecraft launcher in China.
   * It will modify client.json to make other launchers can't identify it.
   * Thanks, H.M.C.L.!
   */
  hmcl?: boolean;
}

export interface IAccount {
  name: string;
  type: 'offline' | 'microsoft' | 'injector';
  clientToken?: string;
  accessTokenEncrypted?: string;
}

// @hmcl-exclusive
export interface VersionPatch extends Directory<unknown> {
  id: string;
  version: string;
}

export class Version implements IVersion {
  assets: string;
  displayName: string;
  gameArguments: IArgument[];
  jvmArguments: IArgument[];
  id: string;
  javaVersion: 8 | 16;
  libraries: ILibrary[];
  snapshot: boolean;
  hmcl?: boolean;

  // @hmcl-exclusive
  private getPatchInfo(patches: VersionPatch[], patchName: string) {
    const patchInfo = patches.find((patch: VersionPatch) => (patch.id = patchName));
    // When the patch is not exist, `patchInfo` is `undefined`
    const patchExist = !!patchInfo;
    const patchVer = patchExist ? patchInfo.version : null;
    return [patchExist, patchVer];
  }

  constructor(versionManifestPath: string) {
    try {
      const manifest = fs.readJsonSync(versionManifestPath);
      const patches: VersionPatch[] = manifest.patches;
      const versionId = patches.find((patch: VersionPatch) => patch.id === 'game').version;
      const isSnapshot = manifest.type === 'snapshot';
      // region get forge, fabric, optifine, and display version
      const [fabricExist, fabricVersion] = this.getPatchInfo(patches, 'fabric');
      const [forgeExist, forgeVersion] = this.getPatchInfo(patches, 'forge');
      const [optifineExist, optifineVersion] = this.getPatchInfo(patches, 'optifine');
      const displayName =
        versionId +
        (optifineExist ? `, Optifine ${optifineVersion}` : '') +
        (forgeExist ? `, Forge ${forgeVersion}` : '') +
        (fabricExist ? `, Fabric ${fabricVersion}` : '');
      // endregion
      const gameArguments = manifest.minecraftArguments
        ? manifest.minecraftArguments.split(' ').concat([manifest.arguments.game])
        : manifest.arguments.game;

      this.displayName = displayName;
      this.id = versionId;
      this.snapshot = isSnapshot;
      this.assets = manifest.assets;
      this.jvmArguments = manifest.arguments.jvm;
      this.gameArguments = gameArguments;
      this.javaVersion = manifest?.javaVersion?.majorVersion || 8;
      this.hmcl = true;
      this.libraries = manifest.libraries;
    } catch (e) {
      //
    }
  }
}

// Sort versions
export function sortVersions(ver1: IVersion, ver2: IVersion): number {
  // In Minecraft, major version is always 1.
  // Snapshot version and April Fool version should compare them specially
  // We provided their patch version as -1.
  const ver1Id = ver1.snapshot ? ver1.assets + '.-1' : ver1.id;
  // Same as ver1Id
  const ver2Id = ver2.snapshot ? ver2.assets + '.-1' : ver2.id;

  const [, ver1Minor, _ver1Patch] = ver1Id.split('.').map((num: string) => parseInt(num));
  const [, ver2Minor, _ver2Patch] = ver2Id.split('.').map((num: string) => parseInt(num));
  // In some cases, the version id doesn't has a patch version, e.g. 1.17.
  // It must be a complete version id to compare.
  const ver1Patch = _ver1Patch ?? 0;
  const ver2Patch = _ver2Patch ?? 0;
  // Logic of original sorting function.
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort for more.
  if (ver1Minor > ver2Minor) return -1;
  if (ver1Minor < ver2Minor) return 1;
  if (ver1Patch > ver2Patch) return -1;
  if (ver1Patch < ver2Patch) return 1;
  return 0;
}
