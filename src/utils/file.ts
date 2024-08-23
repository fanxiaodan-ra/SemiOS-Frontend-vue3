export const readFile = (file: File, setFile: Function) => {
  const reader = new FileReader();
  reader.readAsText(file, 'utf-8');
  // file loaded
  reader.onload = function (e) {
    const content = (e.target?.result) as string; // file content
    setFile(content);
  };
}
