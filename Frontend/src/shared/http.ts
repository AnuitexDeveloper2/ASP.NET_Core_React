// import { webAPIUrl } from './AppSettings';
export interface HttpRequest<REQB> {
  path: string;
}
export interface HttpResponse<RESB> extends Response {
  parsedBody?: RESB;
}

export const http = <REQB, RESB>(
  config: HttpRequest<REQB>,
): Promise<HttpResponse<RESB>> => {
  return new Promise((resolve, reject) => {
    // TODO - make the HTTP request
    // TODO - resolve the promise with the parsed body if a successful request
    // TODO - reject the promise if the request is unsuccessful});
  });
};
