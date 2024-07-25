import CodeCacheAI from "../server/code-cache-ai";

let activeInstace: CodeCacheAI | null = null;
const client = "fgrreloaded/codecache-ai";


export const connectToClient = async () => {
    const codeCacheAI = CodeCacheAI.getInstance(client);
    await codeCacheAI.connect();
    activeInstace = codeCacheAI;
};

export async function getTitleDescription(codeSnippet: string) {
    if(!activeInstace){
        await connectToClient();
    }
    const [title, description] = (await activeInstace?.descriptionAndTitle(codeSnippet)) ?? [];
    return {title, explanation: description};
};

export async function getExplanation(codeSnippet: string) {
    if(!activeInstace){
        await connectToClient();
    }
    const explanation = await activeInstace?.explainCode(codeSnippet);
    return explanation;
}

export async function variableSuggester(codeSnippet: string) {
    if(!activeInstace){
        await connectToClient();
    }
    const refactoredCode = await activeInstace?.suggestVariable(codeSnippet);
    return refactoredCode;
}






