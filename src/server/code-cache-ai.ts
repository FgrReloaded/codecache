import { Client } from '@gradio/client';

class CodeCacheAI {
    private static instance: CodeCacheAI | null = null;
    private client: Client | null = null;
    private modelId: string;

    private constructor(modelId: string) {
        this.modelId = modelId;
    }

    public static getInstance(modelId: string): CodeCacheAI {
        if (!CodeCacheAI.instance) {
            CodeCacheAI.instance = new CodeCacheAI(modelId);
        }
        return CodeCacheAI.instance;
    }

    public async connect(): Promise<void> {
        if (this.client) {
            console.log('Already connected.');
            return;
        }

        try {
            this.client = await Client.connect(this.modelId);
            console.log('Connected to CodeCache Client');
        } catch (error) {
            console.error('Failed to connect.');
            throw error;
        }
    }

    public async descriptionAndTitle(codeSnippet: string): Promise<[string, string]> {
        const prompt = `${codeSnippet}\nTitle: \nDescription(not more than 20 words):`;

        try {
            const result = await this.client?.predict("/chat", {
                message: prompt,
                system_message: "You are a pro coder.",
                max_tokens: 512,
                temperature: 0.7,
                top_p: 0.95,
            });
            const resultString = (result?.data)!.toString().trim();
            const resultArray = resultString.split('Description:');
            const [title, explanation] = this.generateExplanationTitle(resultArray);
            return [title, explanation];
        } catch (error) {
            console.error('Error in description and title:', error);
            throw error;
        }
    }

    private generateExplanationTitle(result: string[]): [string, string] {
        const title = result[0].replace('Title:', '').trim();
        const explanation = result.length > 1 ? result[1].trim() : 'Explanation not available';
        return [title, explanation];
    }

    public async explainCode(codeSnippet: string): Promise<string> {
        const prompt = `${codeSnippet}\nPlease explain the following code using comment format. Only Includes a brief description of what the function does and how.:\nUse this format for the explanation (Don't output the code):\n/**\n- [small description of what the function does][90 Characters]\n- [medium description of how the function works][90 Characters]\n- [if any return then describe it][90 Characters]\n*/`;
        try {
            const result = await this.client?.predict("/chat", {
                message: prompt,
                system_message: "You are a pro coder.",
                max_tokens: 512,
                temperature: 0.7,
                top_p: 0.95,
            });
            let resultString = (result?.data)!.toString();
            resultString = resultString.replace('/**', '');
            resultString = resultString.split('.').join('\n');
            return resultString;
        } catch (error) {
            console.error('Error in explainCode:', error);
            throw error;
        }
    }

    public async suggestVariable(codeSnippet: string): Promise<string> {
        const prompt = `Code Snippet:\n${codeSnippet}\nRefactor the following code snippet by improving any poorly named variables. Provide only the refactored code and not a single extra explanation neither language indication.\nRefracted Code:\n`;

        try {
            const result = await this.client?.predict("/chat",{
                message: prompt,
                system_message: "You are a pro coder.",
                max_tokens: 512,
                temperature: 0.7,
                top_p: 0.95,
            });
            const resultString = (result?.data)!.toString().trim();
            return resultString;
        } catch (error) {
            console.error('Error in suggestVariable:', error);
            throw error;
        }
    }


}

export default CodeCacheAI;
