
interface Snippet {
    prefix: string;
    body: string[];
    description: string;
}

interface Snippets {
    [key: string]: Snippet;
}

export type Languages = "html" | "css" | "javascript" | "typescript" | "typescriptreact" | "javascriptreact" | "python" | "java" | "c" | "cpp" | "csharp" | "go" | "rust";

export const allowedLanguages: Languages[] = [ "html", "css", "javascript", "typescript", "javascriptreact", "typescriptreact", "python", "java", "c", "cpp", "csharp", "go", "rust"];



export { Snippet, Snippets };
