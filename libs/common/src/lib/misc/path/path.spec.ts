import { PathUtils } from '@vts-kit/angular-common';

it('getExtName', () => {
  expect(PathUtils.getExtName('/foo/index.html')).toEqual('.html');
  expect(PathUtils.getExtName('/foo/index.coffee.md')).toEqual('.md');
  expect(PathUtils.getExtName('/foo/index.')).toEqual('.');
  expect(PathUtils.getExtName('/foo/index')).toEqual('');
  expect(PathUtils.getExtName('/foo/.index')).toEqual('');
});

it('getDirName', () => {
  expect(PathUtils.getDirName('./foo/bar/baz/asdf/')).toEqual('./foo/bar/baz');
  expect(PathUtils.getDirName('/foo/bar/baz/asdf/quux')).toEqual(
    '/foo/bar/baz/asdf'
  );
});

it('getBaseName', () => {
  expect(PathUtils.getBaseName('/foo/bar/baz/asdf/quux.html')).toEqual(
    'quux.html'
  );
  expect(PathUtils.getBaseName('/foo/bar/baz/asdf/quux')).toEqual('quux');
  expect(PathUtils.getBaseName('/foo/bar/baz/asdf/')).toEqual('asdf');
});
