export default class StreamElementsHelper {

    static GetStreamElementsUrl(voice, text) {

        var baseUrl = 'http://localhost:5000';

        return baseUrl + '/speech/' + voice + "/" + encodeURIComponent(text.trim());
    }

    static GetTtsBlob(voice, text) {

        if (text === "" || voice === "") {
            return { blobUrl: null, error: { error: 'Oops..', message: 'You need to fill in some text.' } };
        }

        //Replace invalid characters
        text = text.replaceAll("&", "%26");
        text = text.replaceAll("#", "%23");

        let url = this.GetStreamElementsUrl(voice, text);

        return fetch(url)
            .then(async (result) => {
                if (!result.ok) { throw result }              
                
                return result.json();
            })
            .then(json => {
                if (json == null) {
                    return { blobUrl: null, blob: null, error: this.GetApiErrorMessage() };
                }

                return { blobUrl: json.speakUrl, blob: null, error: null };
            })
            .catch((error) => {                

                if(error.status === 422){
                    return { blobUrl: null, blob: null, error: this.GetApiErrorMessage("Text length too long. The use of too many non-alphanumeric/weird characters can cause this.") }; 
                }

                if(error.status === 429){
                    return { blobUrl: null, blob: null, error: this.GetApiErrorMessage("Rate limit reached. Please try again in a minute.") }; 
                }

                return { blobUrl: null, blob: null, error: this.GetApiErrorMessage() };
            });
    }

    static GetApiErrorMessage(message) {
        if(!message) {
            message = "Something went wrong when reaching the API.";
        }
        return { error: 'Oops..', message: message };
    }
}