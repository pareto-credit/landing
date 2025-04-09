import { OneTimeLateEvent } from '@zajno/common/observing/event.late';

export const PreloadEvent = new OneTimeLateEvent();

export const PageReadyEvent = PreloadEvent;
