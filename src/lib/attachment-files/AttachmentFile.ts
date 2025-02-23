
const imageExtensions = [
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp',
    'svg', 'ico', 'heif', 'heic'
];

const wordExtensions = [
    'doc', 'docx', 'dot', 'dotx', 'docm', 'dotm'
];

const spreadsheetExtensions = [
    'xls', 'xlsx', 'xlsm', 'xlsb', 'csv', 'ods', 'xlt', 'xltx', 'xltm'
];

const powerPointExtensions = [
    'ppt', 'pptx', 'pptm', 'pps', 'ppsx', 'ppsm', 'pot', 'potx', 'potm'
];

const audioExtensions = [
    'mp3', 'wav', 'aac', 'flac', 'ogg', 'wma', 'm4a', 'aiff', 'alac'
];

export const getFileType = (filename: string): FileType => {
    let pos = filename.lastIndexOf('.');
    let ext = pos > -1 ? filename.substring(pos+1, filename.length) : '';
    ext =  (ext??'').toLowerCase();
    if (imageExtensions.indexOf(ext) > -1) {
        return FileType.IMAGE
    } else if (wordExtensions.indexOf(ext) > -1) {
        return FileType.DOC
    } else if (spreadsheetExtensions.indexOf(ext) > -1) {
        return FileType.XLS
    } else if (powerPointExtensions.indexOf(ext) > -1) {
        return FileType.PPT
    } else if (audioExtensions.indexOf(ext) > -1) {
        return FileType.AUDIO
    } else if (videoExtensions.indexOf(ext) > -1) {
        return FileType.VIDEO
    } else if (ext == 'pdf') {
        return FileType.PDF
    } else {
        return FileType.OTHER
    }
}

const videoExtensions = [
    'mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm', 'mpeg', 'mpg', '3gp', 'm4v', 'vob'
];

export enum FileType {
    IMAGE = 'img',
    PDF = 'pdf',
    DOC = 'doc',
    XLS = 'xml',
    PPT = 'ppt',
    AUDIO = 'wav',
    VIDEO = 'mov',
    OTHER = 'dat'
}



export default interface AttachmentFile {

    /**
     * 附件名
     */
    name: string;

    /**
     * 文件类型
     */
    type: FileType;

    /**
     * oss保存的文件路径
     */
    uri: string;
}

export type RemoveConfirm = (file: AttachmentFile) => Promise<boolean>;