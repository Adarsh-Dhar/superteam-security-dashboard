interface CodeViewerProps {
  code: string
  language?: string
}

export function CodeViewer({ code, language = "rust" }: CodeViewerProps) {
  return (
    <div className="rounded-md overflow-hidden border border-border">
      {/* Mac-style window controls */}
      <div className="bg-[#1e1e1e] px-4 py-2 flex items-center border-b border-border">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="ml-4 text-xs text-gray-400">{language === "rust" ? "verify_signatures.rs" : "code.js"}</div>
      </div>
      <pre className="bg-[#1e1e1e] p-4 overflow-x-auto text-sm font-mono text-gray-300">{code}</pre>
    </div>
  )
}
