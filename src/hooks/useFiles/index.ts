import create from 'zustand';

import {FilesProps, File} from './types';

const useFiles = create<FilesProps>(set => ({
  files: [],
  totalDuration: 0,
  setFiles: (file: File) => {
    set((state: FilesProps) => ({
      files: [...state.files, file],
      totalDuration: state.totalDuration + file.duration,
    }));
  },
}));

export default useFiles;
