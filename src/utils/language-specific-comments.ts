import { languages } from "../lib/types";

const forwardSlashStar = (comment: string)=>{
    return `/* ${comment} */`;
}

const pythonComment = (comment: string)=>{
    return `*** ${comment} ***`;
}


export const languageSpecificComments = (comment: string, language: languages) => {
    switch (language) {
        case "javascript":
        case "typescript":
        case "java":
        case "c":
        case "c++":
        case "c#":
        case "go":
            return forwardSlashStar(comment);
        case "python":
            return pythonComment(comment);
        default:
            return comment;
    }
};


