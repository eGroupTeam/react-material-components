const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

async function clearTsd(target) {
  if (!(await fse.exists(target))) {
    console.warn(`path ${target} does not exists`);
    return [];
  }

  const files = glob.sync('**/*.d.ts', { cwd: target });
  const cmds = files.map(async file => {
    await fse.remove(path.resolve(target, file))
  });
  return Promise.all(cmds);
}

const packagePath = process.cwd();
const srcPath= path.join(packagePath, './src')

clearTsd(srcPath)