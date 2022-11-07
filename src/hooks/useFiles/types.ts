export type File = {
  uri: string;
  duration: number;
};

export type FilesProps = {
  files: File[];
  totalDuration: number;
  setFiles: (file: File) => void;
};
