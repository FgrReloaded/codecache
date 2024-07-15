
interface Snippet {
    prefix: string;
    body: string[];
    description: string;
}

interface Snippets {
    [key: string]: Snippet;
}

export type languages = "javascript" | "typescript" | "python" | "java" | "c" | "c++" | "c#" | "go";



export { Snippet, Snippets };
