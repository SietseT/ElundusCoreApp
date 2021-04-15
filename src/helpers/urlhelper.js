export class UrlHelper {

    static ToAbsoluteUrl(path) {

        let baseUrl = process.env.BASE_URL;

        if (path[0] === '/') {
            path = path.substring(1, path.length);
        }

        return baseUrl + path;
    }
}