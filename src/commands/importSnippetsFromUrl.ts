import { ObjectId } from "mongodb";
import { fetchSnippetsFromUrl } from "../server/snippets-url";
import { warning } from "../vscode-ui/info-message";


const extractParams = (urlString: string) => {
    const decodedUrl = decodeURIComponent(urlString);
    const url = new URL(decodedUrl);
    const language = url.searchParams.get('language');
    const snippetId = url.searchParams.get('snippetId');

    return { language, snippetId };
};

export const importSnippetsFromUrl = async (urlString: string) => {
    const { language, snippetId } = extractParams(urlString);

    if (language && snippetId) {
        await fetchSnippetsFromUrl(language, new ObjectId(snippetId));
    } else {
        warning('Invalid URL!');
    }
};