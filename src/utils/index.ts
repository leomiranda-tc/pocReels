export function generateNewName(path: string): string {
  const splittedPath = path.split('/');

  splittedPath[splittedPath.length - 1] = `generated-${Date.now()}-${
    splittedPath[splittedPath.length - 1]
  }`;

  return splittedPath.reduce(
    (previousValue, currentValue) => previousValue + '/' + currentValue,
  );
}

export function secondToTimeString(seconds: number): string {
  const date = new Date(0);
  date.setSeconds(seconds); // specify value for SECONDS here
  const timeString = date.toISOString().substring(11, 19);
  return timeString;
}
