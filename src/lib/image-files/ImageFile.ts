export default interface ImageFile {

    /**
     * 附件名
     */
    name: string;

    /**
     * oss保存的文件路径
     */
    uri: string;

    thumbnail?: string | undefined | null;
}


export type RemoveConfirm = (file: ImageFile) => Promise<boolean>;