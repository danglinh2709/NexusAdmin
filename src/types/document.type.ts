import type { IResponse } from "./common.type";

export interface IDocument {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  owner: IDocumentOwner;
  createdAt: string;
}
export interface IDocumentOwner {
  id: string;
  fullName: string;
}
export type IDocumentResponse = IResponse<IDocument>;
