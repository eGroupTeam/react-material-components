const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

const packagePath = process.cwd();
const copys = [{
  buildPath: path.join(packagePath, './packages/material/build'),
  srcPath: path.join(packagePath, './packages/material/src'),
}, {
  buildPath: path.join(packagePath, './packages/material-lab/build'),
  srcPath: path.join(packagePath, './packages/material-lab/src'),
}]

async function typesCopy({ from, to }) {
  if (!(await fse.exists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(file =>
    fse.copy(path.resolve(from, file), path.resolve(to, file))
  );
  return Promise.all(cmds);
}

async function run() {
  await copys.forEach(async (el) => {
    await typesCopy({ from: el.srcPath, to: el.buildPath });
  })
}

run();
