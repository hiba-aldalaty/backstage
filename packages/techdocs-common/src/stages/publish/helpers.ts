/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Entity } from '@backstage/catalog-model';
import mime from 'mime-types';
import path from 'path';
import recursiveReadDir from 'recursive-readdir';

/**
 * Helper to get the expected content-type for a given file extension. Also
 * takes XSS mitigation into account.
 */
const getContentTypeForExtension = (ext: string): string => {
  const defaultContentType = 'text/plain; charset=utf-8';

  // Prevent sanitization bypass by preventing browsers from directly rendering
  // the contents of untrusted files.
  if (ext.match(/htm|xml|svg/i)) {
    return defaultContentType;
  }

  return mime.contentType(ext) || defaultContentType;
};

export type responseHeadersType = {
  'Content-Type': string;
};

/**
 * Some files need special headers to be used correctly by the frontend. This function
 * generates headers in the response to those file requests.
 * @param {string} fileExtension .html, .css, .js, .png etc.
 */
export const getHeadersForFileExtension = (
  fileExtension: string,
): responseHeadersType => {
  return {
    'Content-Type': getContentTypeForExtension(fileExtension),
  };
};

/**
 * Recursively traverse all the sub-directories of a path and return
 * a list of absolute paths of all the files. e.g. tree command in Unix
 *
 * @example
 *
 * /User/username/my_dir
 *     dirA
 *     |   subDirA
 *     |   |   file1
 *     EmptyDir
 *     dirB
 *     |   file2
 *     file3
 *
 * getFileListRecursively('/Users/username/myDir')
 * // returns
 * [
 *   '/User/username/my_dir/dirA/subDirA/file1',
 *   '/User/username/my_dir/dirB/file2',
 *   '/User/username/my_dir/file3'
 * ]
 * @param rootDirPath Absolute path to the root directory.
 */
export const getFileTreeRecursively = async (
  rootDirPath: string,
): Promise<string[]> => {
  // Iterate on all the files in the directory and its sub-directories
  const fileList = await recursiveReadDir(rootDirPath).catch(error => {
    throw new Error(`Failed to read template directory: ${error.message}`);
  });
  return fileList;
};


// Only returns the files that existed previously and are not present anymore.
export const getStaleFiles = (
  newFiles: string[],
  oldFiles: string[],
): string[] => {
  const staleFiles = new Set(oldFiles);
  newFiles.forEach(newFile => {
    staleFiles.delete(newFile)
  })
  return Array.from(staleFiles)
};

// 
export const getCloudPathForLocalPath = (entity: Entity, localPath: string): string => {
  // Remove the absolute path prefix of the source directory
  // Path of all files to upload, relative to the root of the source directory
  // e.g. ['index.html', 'sub-page/index.html', 'assets/images/favicon.png']
  const relativeFilePath = path.relative(directory, localPath);

  // Convert destination file path to a POSIX path for uploading.
  // GCS expects / as path separator and relativeFilePath will contain \\ on Windows.
  // https://cloud.google.com/storage/docs/gsutil/addlhelp/HowSubdirectoriesWork
  const relativeFilePathPosix = relativeFilePath
    .split(path.sep)
    .join(path.posix.sep);

  // The / delimiter is intentional since it represents the cloud storage and not the local file system.
  const entityRootDir = `${entity.metadata.namespace}/${entity.kind}/${entity.metadata.name}`;
  return `${entityRootDir}/${relativeFilePathPosix}`; // GCS Bucket file relative path
};