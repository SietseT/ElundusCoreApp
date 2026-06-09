export class UrlHelper {

    static ToAbsoluteUrl(path) {

        let baseUrl = import.meta.env.VITE_BASE_URL;

        if (path[0] === '/') {
            path = path.substring(1, path.length);
        }

        return baseUrl + path;
    }
}