const { override, fixBabelImports } = require('customize-cra');
const path = require('path');
const paths = require('react-scripts/config/paths');

paths.appBuild = path.join(path.dirname(paths.appBuild), '../server/build');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
);
