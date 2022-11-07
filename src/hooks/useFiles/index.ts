import create from 'zustand';

import {FilesProps, File} from './types';

const useFiles = create<FilesProps>(set => ({
  files: [],
  totalDuration: 0,
  setFile: (file: File) => {
    set((state: FilesProps) => ({
      files: [...state.files, file],
      totalDuration: state.totalDuration + file.duration,
    }));
  },
  clearAll: () =>
    set(() => ({
      files: [],
      totalDuration: 0,
    })),
}));

export default useFiles;
