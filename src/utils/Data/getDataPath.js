const DOT = '.';
const SLASH = '/';
const DOT_DOT = `${DOT}${DOT}`;
const PARENT_PATH = `${DOT}${SLASH}`;

const toPath = (arr) => {
  return arr.join(DOT);
};

const toParts = (str, separator = DOT) => {
  return str.split(separator);
};

const isDotDot = (str) => str === DOT_DOT;
const isDotOrDotDot = (str) => [DOT, DOT_DOT].indexOf(str) > -1;

const isRelativePath = (path) => {
  return path && path.indexOf(DOT) === 0;
};

const standardiseRelativePath = (path) => {
  if (path.indexOf(PARENT_PATH) === 0) {
    return path;
  }
  return `${PARENT_PATH}${path}`;
};

const ascendPath = (startPath, ascent) => {
  const relativePath = standardiseRelativePath(ascent);
  // Always add 1 because we're starting on a leaf node within a "directory".
  const stepsToClimb = toParts(relativePath, SLASH).filter(isDotDot).length + 1;
  const pathParts = startPath ? toParts(startPath) : [];
  if (stepsToClimb >= pathParts.length) {
    return '';
  }
  return toPath(pathParts.slice(0,  -stepsToClimb));
};

const descendPath = (startPath, descent) => {
  const stepsDown = toParts(descent, SLASH).filter(str => !isDotOrDotDot(str));
  return startPath ? `${startPath}.${toPath(stepsDown)}` : toPath(stepsDown);
};

/**
 * Takes a path and a current path and returns an absolute path to a data element.
 * Note that the path may be absolute or relative.
 * 
 * The behaviour should mirror the way imports work.
 * 
 * @param {string} path The path to attempt to get to, which may be absolute or relative.
 * @param {string} currentPath The current absolute path.
 * @returns An absolute path to a data element.
 * @example
 *   getDataPath('./relative.path', 'this.is.the.current.path');
 *   // => 'this.is.the.current.relative.path'
 * @example
 *   getDataPath('../relative.path', 'this.is.the.current.path');
 *   // => 'this.is.the.relative.path'
 * @example
 *   getDataPath('../../relative.path', 'this.is.the.current.path');
 *   // => 'this.is.relative.path'
 */
const getDataPath = (path, currentPath) => {
  if (isRelativePath(path)) {
    return descendPath(ascendPath(currentPath, path), path);
  }
  return path;
};

export default getDataPath;
