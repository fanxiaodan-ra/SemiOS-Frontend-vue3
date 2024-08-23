interface IFile {
  name: string;
  content: string;
}

export function generateAndDownloadTxFile({ name, content }: IFile) {
  const filename = `${name}.txt`;
  const blob = new Blob([content], { type: 'text/plain' });
  try {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error('Failed to download file');
  }
}

