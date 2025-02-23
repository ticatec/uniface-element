export enum ProgressStepStatus {
    Pending = 'pending',
    Processing = 'processing',
    Completed = 'completed'
}

export default interface ProgressStep {

    /**
     *
     */
    topic: string;

    /**
     *
     */
    comment?: string;

    /**
     *
     */
    status: ProgressStepStatus;

}