import * as React from 'react'
import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import {hopscotch as style} from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)

interface CodeViewProps {
  source: string
}

const CodeView: React.FC<CodeViewProps> = ({source}) => {
  return (
    <SyntaxHighlighter language="jsx" style={style}>
      {source}
    </SyntaxHighlighter>
  )
}

export default React.memo(CodeView)
