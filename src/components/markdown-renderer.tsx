import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  a11yDark,
  dracula,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

export function MarkdownRenderer({ children: markdown }: { children: string }) {
  const customStyle = {
    lineHeight: "1.5",
    fontSize: "1rem",
    borderRadius: "1px",
    padding: "0px",
    backgroundColor: "transparent",
    opacity: "1",
    margin: "0px",
    width: "80vw",
  };

  return (
    <Markdown
      className="dark:prose-headings:text-gray-100 dark:prose-strong:text-gray-100 dark:prose-p:text-gray-400 dark:prose-li:text-gray-400"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 style={{ fontSize: "1.5em" }} {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 style={{ fontSize: "1.4em" }} {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 style={{ fontSize: "1.3em" }} {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 style={{ fontSize: "1.2em" }} {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 style={{ fontSize: "1.1em" }} {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 style={{ fontSize: "1em" }} {...props} />
        ),
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <SyntaxHighlighter
              style={dracula}
              PreTag="div"
              language={match[1]}
              customStyle={customStyle}
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  );
}
