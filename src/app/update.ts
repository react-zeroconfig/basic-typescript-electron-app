import { UpdateCheckResult } from 'electron-updater';

export const UPDATE_CHANNEL = 'app-update';

export interface StartUpdateCheck {
  type: 'start-update-check';
}

export interface UpdateChecked {
  type: 'update-checked';
  result: UpdateCheckResult;
}

export interface UpdateDownloadStart {
  type: 'update-download-start';
}

export interface UpdateDownloadProgress {
  type: 'update-download-progress';
  progress: number;
}

export interface UpdateReady {
  type: 'update-ready';
}

export interface UpdateError {
  type: 'update-error';
  error: Error;
}

export type UpdateMessage =
  | StartUpdateCheck
  | UpdateChecked
  | UpdateDownloadStart
  | UpdateDownloadProgress
  | UpdateReady
  | UpdateError;

export const RESTART_CHANNEL = 'app-restart';
