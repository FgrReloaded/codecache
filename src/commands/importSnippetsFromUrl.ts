import { fetchSnippetsFromUrl } from "../server/snippets-url";
import { warning } from "../vscode-ui/info-message";


const extractParams = (urlString: string) => {
    const decodedUrl = decodeURIComponent(urlString);
    const url = new URL(decodedUrl);
    const language = url.searchParams.get('language');
    const snippetUrl = url.searchParams.get('snippetUrl');

    return{language, snippetUrl};
};

export const importSnippetsFromUrl = async (urlString: string) => {
    const { language, snippetUrl } = extractParams(urlString);

    if (language && snippetUrl) {
        await fetchSnippetsFromUrl(language, snippetUrl);
    } else {
        warning('Invalid URL!');
    }
};