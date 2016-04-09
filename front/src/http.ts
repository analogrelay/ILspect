type HttpContent = ArrayBufferView | Blob | Document | FormData | string; 

export enum HttpResponseType {
    Text,
    ArrayBuffer,
    Blob,
    Document,
    Json
}

export interface IHttpClientOptions {
    headers?: any,
    userName?: string,
    password?: string,
    responseType?: HttpResponseType
}

export class HttpResponse {
    private _responseType: HttpResponseType;
    private _xhr: XMLHttpRequest;
    
    constructor(responseType: HttpResponseType, xhr: XMLHttpRequest) {
        this._xhr = xhr;
    }
    
    get xhr(): XMLHttpRequest { return this._xhr }
    get success(): boolean { return this._xhr.status < 300 && this._xhr.status >= 200; }
    
    asString(): string {
        if(this._responseType === HttpResponseType.Text) {
            return <string>this._xhr.response;
        }
        return null;
    }
    
    asArrayBufferView(): ArrayBufferView {
        if(this._responseType === HttpResponseType.ArrayBuffer) {
            return <ArrayBufferView>this._xhr.response;
        }
        return null;
    }
    
    asDocument(): Document {
        if(this._responseType === HttpResponseType.Document) {
            return <Document>this._xhr.response;
        }
        return null;
    }
    
    asBlob(): Blob {
        if(this._responseType === HttpResponseType.Blob) {
            return <Blob>this._xhr.response;
        }
        return null;
    }
    
    as<T>(): T {
        if(this._responseType === HttpResponseType.Json) {
            return <T>this._xhr.response;
        }
        return null;
    }
    
    getHeader(name: string): string { return this._xhr.getResponseHeader(name); }
    getAllHeaders(): string { return this._xhr.getAllResponseHeaders(); }
}

export interface IHttpClient {
    send(method: string, url: string, body?: HttpContent, options?: IHttpClientOptions): Promise<HttpResponse>;
}

export class HttpClient implements IHttpClient {
    private _baseUrl: string;
    
    constructor(baseUrl?: string) {
        if(baseUrl && !baseUrl.endsWith("/")) {
            baseUrl = baseUrl + "/";
        }
        this._baseUrl = baseUrl;
    }
    
    get(url: string, body?: HttpContent, options?: IHttpClientOptions): Promise<HttpResponse> { return this.send("GET", url, body, options); }
    post(url: string, body?: HttpContent, options?: IHttpClientOptions): Promise<HttpResponse> { return this.send("PUT", url, body, options); }
    put(url: string, body?: HttpContent, options?: IHttpClientOptions): Promise<HttpResponse> { return this.send("POST", url, body, options); }
    patch(url: string, body?: HttpContent, options?: IHttpClientOptions): Promise<HttpResponse> { return this.send("PATCH", url, body, options); }
    head(url: string, body?: HttpContent, options?: IHttpClientOptions): Promise<HttpResponse> { return this.send("HEAD", url, body, options); }
    
    send(method: string, url: string, body?: HttpContent, options: IHttpClientOptions = {}): Promise<HttpResponse> {
        return new Promise((resolve, reject) => {
            if (this._baseUrl && !url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("//")) {
                url = this._baseUrl + url;
            }
            
            options.responseType = options.responseType || HttpResponseType.Json;
            
            let xhr = new XMLHttpRequest(); 
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    let response = new HttpResponse(options.responseType, xhr);
                    if(response.success) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }
            }
            
            switch (options.responseType) {
                case HttpResponseType.ArrayBuffer: xhr.responseType = "arraybuffer"; break;
                case HttpResponseType.Blob: xhr.responseType = "blob"; break;
                case HttpResponseType.Document: xhr.responseType = "document"; break;
                case HttpResponseType.Json: xhr.responseType = "json"; break;
            }
            
            xhr.open(method, url, true, options.userName, options.password);
            
            for (var key in Object.keys(options)) {
                xhr.setRequestHeader(key, options[key]);
            }
            
            xhr.send(body);
        });
    }
}

export var http = new HttpClient();