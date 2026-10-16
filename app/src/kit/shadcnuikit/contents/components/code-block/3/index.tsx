import {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../../../../components/ui/code-block";

const code = `export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`;

export default function CodeBlockDemo() {
  return (
    <div className="w-full max-w-xl">
      <CodeBlock
        code={code}
        language="typescript"
        showLineNumbers
        highlightedLines={[5, 6]}
        highlightedWords={["setTimeout", "clearTimeout"]}
      >
        <CodeBlockHeader>
          <CodeBlockTitle>use-debounce.ts</CodeBlockTitle>
          <CodeBlockCopyButton className="ml-auto" />
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  );
}
