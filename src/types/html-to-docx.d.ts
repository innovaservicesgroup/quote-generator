declare module "html-to-docx" {
  interface HTMLtoDOCXOptions {
    table?: { row?: { cantSplit?: boolean } };
    footer?: boolean;
    pageNumber?: boolean;
    [key: string]: unknown;
  }
  export default function HTMLtoDOCX(
    html: string,
    headerHTML?: string | undefined,
    options?: HTMLtoDOCXOptions
  ): Promise<Buffer | ArrayBuffer>;
}
