import axios from 'axios';

interface TitleDescriptionResponse {
    title: string;
    explanation: string;
    execution_time: string;
}

const SERVER_URL = 'http://localhost:8000/api/';

export async function getTitleDescription(codeSnippet: string[]): Promise<TitleDescriptionResponse | null> {

    const code_snippet = codeSnippet.join('\n');

    try {
        const response = await axios.post(SERVER_URL + 'title_desc', { code_snippet });

        const result = {
            title: response.data.title,
            explanation: response.data.explanation,
            execution_time: response.data.execution_time
        };

        return result;

    } catch (error) {
        console.error('Error calling server endpoint:', error);
        return null;
    }
}

export async function getExplanation(codeSnippet: string): Promise<string | null> {

    try {
        const response = await axios.post(SERVER_URL + 'explain_code', { code_snippet: codeSnippet });

        return response.data.explanation;

    } catch (error) {
        console.error('Error calling server endpoint:', error);
        return null;
    }
}


