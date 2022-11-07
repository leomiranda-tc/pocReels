import create from 'zustand';

import {FilesProps, File} from './types';

const useFiles = create<FilesProps>(set => ({
  files: [],
  totalDuration: 0,
  setFile: (file: File) => {
    file.uri = file.uri
      .replace('%2540', '%40')
      .replace('%252F', '%2F')
      .replace('file://', '');

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
