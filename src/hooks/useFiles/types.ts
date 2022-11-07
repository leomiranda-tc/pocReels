export type File = {
  uri: string;
  duration: number;
};

export type FilesProps = {
  files: File[];
  setFiles: (file: File) => void;
};
