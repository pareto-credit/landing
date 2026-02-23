export type FileType = 'CSV';
export type MimeType = 'application/pdf' | 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' | 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' | 'application/vnd.ms-powerpoint' | 'application/vnd.openxmlformats-officedocument.presentationml.presentation' | 'text/plain' | 'text/csv' | 'image/jpeg' | 'image/png';
export declare function sMimeType(): import("fluent-json-schema").StringSchema;
