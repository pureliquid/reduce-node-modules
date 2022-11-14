import * as fs from 'fs';
import * as uglify from 'uglify-js';
const walkSync = function (dir: string, filelist: string[]) {
  const files: string[] = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function (file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file + '/', filelist);
    } else if (file.endsWith('.js') && !file.endsWith('.json')) {
      filelist.push(dir + '/' + file);
    }
  });
  return filelist;
};
const jsFiles: string[] = walkSync('./node_modules', []);
(async () => {
  console.log('Start');
  for (const file of jsFiles) {
    try {
      const { code } = uglify.minify(fs.readFileSync(file, 'utf-8'), {
        mangle: false,
      });
      fs.writeFileSync(file, code, 'utf-8');
    } catch (error) {
      console.log(`can't minify ${file}`);
    }
  }
  console.log('End');
})();
