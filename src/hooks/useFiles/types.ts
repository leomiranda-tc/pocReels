export type File = {
  uri: string;
  duration: number;
};

export type FilesProps = {
  files: File[];
  totalDuration: number;
  setFile: (file: File) => void;
  clearAll: () => void;
};
