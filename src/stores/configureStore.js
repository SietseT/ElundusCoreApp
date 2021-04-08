import { createStore } from 'redux';

let defaultVoiceState = {
    voiceBlobUrl: '',
    voiceBlob: null,
    text: '',
    voice: '',
    error: null
};

//Reducer
//state = defaultVoiceState means: use state, or defaultVoiceState if state is not defined
function voice(state = defaultVoiceState, action) {

    if(action.type === 'SET_VOICEBLOBURL'){

        return {
            ...state,
            voiceBlobUrl: action.data,
            error: null
        }
    }

    if(action.type === 'SET_VOICE_TEXT'){

        return {
            ...state,
            text: action.data.text,
            voice: action.data.voice,
            error: null
        }
    }

    if(action.type === 'SET_VOICEBLOB'){

        return {
            ...state,
            voiceBlob: action.data,
            error: null
        }
    }

    if(action.type === 'SET_ERROR'){

        return {
            ...state,
            error: action.data,
            voiceBlobUrl: ''
        }
    }



    return state;
}

let store = createStore(voice);

export default store;

// //Subscribe to store updates
// store.subscribe(function() {
//     console.log('state', store.getState());
// })

// let obj = {hello: 'world'};
// let fakeBlob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});

// //Dispatch action 
// store.dispatch({type: 'SET_VOICEBLOB', data: { voiceBlob: fakeBlob }});