export enum EnumStatus {
    done = 'done',
    inProgress = 'inProgress',
    delayed = 'delayed',
    notStarted = 'notStarted',
    cancelled = 'cancelled'
}

export interface IStatus {
    status: EnumStatus
}