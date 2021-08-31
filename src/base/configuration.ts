import fs from 'fs-extra';
import path from 'path';
import os from 'os';

export function mergeMetadata(newData: Record<string, unknown>): void {
  const filePath = path.resolve(os.homedir(), './.pmcl-accounts');
  fs.readJson(filePath)
    .then((data) => {
      return {
        ...data,
        ...newData,
        lastUpdate: Date.now(),
      };
    })
    .then((mergedData) => {
      fs.writeJsonSync(filePath, mergedData, { spaces: 2 });
    });
}
