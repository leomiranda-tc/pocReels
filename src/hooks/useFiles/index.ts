import create from 'zustand';

import {FilesProps} from './types';

const useFiles = create<FilesProps>(set => ({
  files: [],
  setFiles: (uri: string) =>
    set((state: FilesProps) => ({files: [...state.files, uri]})),
}));

export default useFiles;
