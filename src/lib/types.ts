
interface Snippet {
    prefix: string;
    body: string[];
    description: string;
}

interface Snippets {
    [key: string]: Snippet;
}


export { Snippet, Snippets };