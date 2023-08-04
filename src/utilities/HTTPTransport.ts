export {};
enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type Options = {
    method?: METHOD;
    data?: Record<string, any>;
    timeout?: number;
    headers?: { [header: string]: string };
};
type requestMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

function queryStringify(data: { [key: string]: unknown } = {}) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {

    get: requestMethod = (url, options) => {
        return this.request(
            url, { ...options, method: METHOD.GET });
    };
    post:requestMethod = (url,options) => {
        return this.request(url, {...options, method: METHOD.POST});
    };
    put:requestMethod = (url,options) => {
        return this.request(url, {...options, method: METHOD.PUT});
    };
    patch:requestMethod = (url,options) => {
        return this.request(url, {...options, method: METHOD.PATCH});
    };
    delete:requestMethod = (url,options) => {
        return this.request(url, {...options, method: METHOD.DELETE});
    };

    request = (url:string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
        const {headers = {'Content-Type': 'application/json',}, method, data} = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;
            // const isPost = method === METHOD.POST;
            // const isPatch = method === METHOD.PATCH;
            // const isDELETE = method === METHOD.DELETE;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };


            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            // xhr.onabort = () => reject({reason: 'abort'});
            //   xhr.onerror = () => reject({reason: 'network error'});
            xhr.withCredentials = true;
            xhr.responseType = 'json';
            // xhr.timeout = timeout;
            // xhr.ontimeout = () => reject({reason: 'timeout'});

            if (isGet || !data) {
                xhr.send();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            } else if (data instanceof FormData){
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
export default HTTPTransport;
