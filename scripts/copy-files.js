const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

const packagePath = process.cwd();
const buildPath= path.join(packagePath, './build')
const srcPath= path.join(packagePath, './src')

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

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  const { scripts, devDependencies, ...packageDataOther } = JSON.parse(
    packageData,
  );
  const newPackageData = {
    ...packageDataOther,
    private: false,
    main: './index.js',
    module: './esm/index.js',
    typings: './index.d.ts',
  };
  const targetPath = path.resolve(buildPath, './package.json');

  await fse.writeFile(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${targetPath}`);

  return newPackageData;
}

async function run() {
  await createPackageFile()
  await typesCopy({ from: srcPath, to: buildPath });
}

run();
