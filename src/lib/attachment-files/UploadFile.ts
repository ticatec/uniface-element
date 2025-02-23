import {ProgressStatus} from "$lib/progress-bar/ProgressStatus";
import type {FileUpload, UploadProgress} from "$lib/attachment-files/FileUpload";

export type OnCompleted = (file: File, url: string, thumbnail?: string) => void;
export type UpdateStatus = () => void;

export default class UploadFile {

    /**
     * 待上传的文件
     */
    readonly file: File;

    /**
     * 上传后的文件地址
     */
    private _url: string | null = null;

    /**
     * 上传的缩率图
     * @private
     */
    private _thumbnail: string | null | undefined = null;
    /**
     * 状态
     */
    private _status: ProgressStatus = ProgressStatus.progressing;
    /**
     * 已经上传的字节数
     */
    private _uploadedBytes: number = 0;
    /**
     * 上传的实例
     */
    private loader?: UploadProgress;

    private readonly onCompleted: OnCompleted;

    private readonly uploadFile: FileUpload;

    private updateStatus: UpdateStatus = null as unknown as UpdateStatus;

    constructor(file: File, uploadFile: FileUpload, onCompleted: OnCompleted) {
        this.file = file;
        this.uploadFile = uploadFile;
        this.onCompleted = onCompleted;
        this.loader = this.startUploading();
    }

    private startUploading() {
        return  this.uploadFile(this.file, (bytes: number) => {
            this._uploadedBytes = bytes;
            this.updateStatus?.();
        }, (url: string, thumbnail?: string) => {
            this._url = url;
            this._thumbnail = thumbnail;
            this._status = ProgressStatus.successful;
            this.onCompleted(this.file, url);
            this.updateStatus?.();
        }, (e: Error) => {
            this._status = ProgressStatus.failure;
            this.updateStatus?.();
        });
    }

    restart() {
        this._status = ProgressStatus.progressing;
        this.loader = this.startUploading();
        this.updateStatus?.();
    }

    get url(): string | null {
        return this._url;
    }

    get thumbnail() : string | undefined | null {
        return this._thumbnail;
    }

    get status(): ProgressStatus {
        return this._status;
    }

    get progress(): number {
        return Math.round(this._uploadedBytes * 100 / this.file.size);
    }

    async cancel(): Promise<boolean> {
        let result = this.loader != null ? await this.loader.cancel() : true;
        if (result) {
            this._status = ProgressStatus.canceled;
            this.updateStatus?.();
        }
        return result;
    }

    setUpdateStatus(value: UpdateStatus) {
        this.updateStatus = value;
    }
}