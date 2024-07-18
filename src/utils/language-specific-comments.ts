import { Languages } from "../lib/types";

const forwardSlashStar = (comment: string)=>{
    return `/* ${comment} */`;
};

const pythonComment = (comment: string)=>{
    return `""" ${comment} """`;
};


export const languageSpecificComments = (comment: string, language: Languages) => {
    switch (language) {
        case "javascript":
        case "typescript":
        case "java":
        case "c":
        case "cpp":
        case "csharp":
        case "go":
        case "rust":
            return forwardSlashStar(comment);
        case "python":
            return pythonComment(comment);
        default:
            return comment;
    }
};


