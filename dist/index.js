"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const uglify = __importStar(require("uglify-js"));
// List all files in a directory in Node.js recursively in a synchronous fashion
const walkSync = function (dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = walkSync(dir + '/' + file + '/', filelist);
        }
        else if (file.endsWith('.js') && !file.endsWith('.json')) {
            filelist.push(dir + '/' + file);
        }
    });
    return filelist;
};
const jsFiles = walkSync('./node_modules', []);
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Start');
    for (const file of jsFiles) {
        try {
            const { code } = uglify.minify(fs.readFileSync(file, 'utf-8'), {
                mangle: false,
            });
            fs.writeFileSync(file, code, 'utf-8');
        }
        catch (error) {
            console.log(`can't minify ${file}`);
        }
    }
    console.log('End');
}))();
/*const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const directories = getDirectories('./node_modules');
(async () => {
  for (const directory of directories) {
    const packageJsonExists = fs.existsSync(`./node_modules/${directory}/package.json`);
    if (packageJsonExists) {
      const packageJson: IPackageJson = JSON.parse(
        fs.readFileSync(`./node_modules/${directory}/package.json`, 'utf-8')
      );
      if (packageJson.main === 'index.js' && fs.existsSync(`./node_modules/${directory}/${packageJson.main}`)) {
        const indexJs = fs.readFileSync(`./node_modules/${directory}/${packageJson.main}`, 'utf-8');
        try {
          await esbuild.build({
            entryPoints: [`./node_modules/${directory}/${packageJson.main}`],
            bundle: true,
            outfile: './outs/' + packageJson.name + 'out.js',
          });
        } catch (error) {
          console.log(`Couldn't bundle ${packageJson.name}`);
        }

        console.log('Index.js Content Length => ', indexJs.length);
      }
      // console.log(packageJson.main);
    }
  }
})();*/
