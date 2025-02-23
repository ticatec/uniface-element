

/**
 * 上传进程更新
 */
export type ProgressUpdate = (uploadBytes: number) => void;

/**
 * 当上传完成
 */
export type OnUploaded = (url: string, thumbnail?: string) => void;

/**
 *
 */
export type ErrorHandler = (e: Error) => void;

/**
 * 返回可以取消的接口
 */
export interface UploadProgress {

    cancel:()=>Promise<boolean>;

}

/**
 * 上传文件的方法
 */
export type FileUpload = (file: File, progressUpdate: ProgressUpdate, onUploaded: OnUploaded, errorHandler: ErrorHandler) => UploadProgress;