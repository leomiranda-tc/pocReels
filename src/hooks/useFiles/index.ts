import create from 'zustand';

import {FilesProps, File} from './types';

const useFiles = create<FilesProps>(set => ({
  files: [],
  setFiles: (file: File) =>
    set((state: FilesProps) => ({files: [...state.files, file]})),
}));

export default useFiles;
