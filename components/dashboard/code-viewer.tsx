interface CodeViewerProps {
    code: string;
  }
  
  export function CodeViewer({ code }: CodeViewerProps) {
    return (
      <pre className="bg-slate-100 p-4 rounded-md overflow-x-auto text-sm font-mono">
        {code}
      </pre>
    );
  }