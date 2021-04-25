import React from "react"
import { connect } from "react-redux"
import StreamElementsHelper from "../../helpers/streamelementshelper"

import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

class TextToSpeechForm extends React.Component {

    constructor() {
        super();

        this.defaultVoice = 'Brian';
        this.defaultText = '';

        this.state = {
            text: this.defaultText,
            voice: this.defaultVoice,
            characterCount: 0,
            textMaxLength: 500,
            isLoading: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.callStreamElementsAndDispatch = this.callStreamElementsAndDispatch.bind(this);
    }

    setLoading(value) {
        this.setState({
            isLoading: value
        });
    }

    async handleSubmit(event) {

        event.preventDefault();

        let text = this.state.text;
        let voice = this.state.voice;

        if (text === "" || voice === "") {
            let error = { blobUrl: null, error: { error: 'Oops..', message: 'You need to fill in some text.' } };
            this.props.dispatch({ type: 'SET_ERROR', data: error.error });
            return;
        }

        
        this.setLoading(true);
        await this.callStreamElementsAndDispatch();        
    }

    async callStreamElementsAndDispatch() {

        let text = this.state.text;
        let voice = this.state.voice;

        var result = await StreamElementsHelper.GetTtsBlob(voice, text);
        this.setLoading(false);

        if (result.blobUrl != null) {
            this.props.dispatch({ type: 'SET_VOICEBLOBURL', data: result.blobUrl });
            this.props.dispatch({ type: 'SET_VOICEBLOB', data: result.blob });
            this.props.dispatch({ type: 'SET_VOICE_TEXT', data: { voice: voice, text: text } });
        }
        else {
            this.props.dispatch({ type: 'SET_ERROR', data: result.error });            
        }
    }

    async handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {

        const { textMaxLength, text, voice } = this.state;

        let characterCount = text.length;
        
        //Hack to change input value. Textarea value is not changed after changing text state for some reason :/
        let textElement = document.getElementById('text');
        let voiceElement = document.getElementById('voice');

        if (textElement) {
            textElement.value = text;
            voiceElement.value = voice;
        }
        

        return (
            <Form className="mt-3 my-sm-3">

                <p className="text-right form-text text-muted" style={{ position: 'absolute', top: '144px', right: '14px' }}><small>{characterCount} / {textMaxLength}</small></p>

                <Form.Group className="mb-4">
                    <Form.Control
                        as="textarea"
                        id="text"
                        name="text"
                        placeholder="Type your text here..."
                        onChange={this.handleInputChange}
                        value={this.state.text}
                        rows="5"
                        maxLength={this.state.textMaxLength}
                        aria-label="Text"
                    />
                </Form.Group>

                <InputGroup className="mb-3 mb-md-4">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="select-voice">Voice</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        as="select"
                        className="custom-select"
                        id="voice"
                        name="voice"
                        onChange={this.handleInputChange}
                        value={voice}
                        aria-label="voice"
                        aria-describedby="select-voice">

                        <optgroup label="English (British)">
                            <option>Amy</option>
                            <option>Brian</option>
                            <option>Emma</option>
                        </optgroup>
                        <optgroup label="English (US)">
                            <option>Ivy</option>
                            <option>Joanna</option>
                            <option>Joey</option>
                            <option>Justin</option>
                            <option>Kendra</option>
                            <option>Kimberly</option>
                            <option>Matthew</option>
                            <option>Salli</option>
                        </optgroup>
                        <optgroup label="English (Australian)">
                            <option>Nicole</option>
                            <option>Russell</option>
                        </optgroup>
                        <optgroup label="English (Welsh)">
                            <option>Geraint</option>
                        </optgroup>
                        <optgroup label="English (Indian)">
                            <option>Aditi</option>
                            <option>Raveena</option>
                        </optgroup>
                        <optgroup label="Arabic">
                            <option>Zeina</option>
                        </optgroup>
                        <optgroup label="Chinese, Mandarin">
                            <option>Zhiyu</option>
                        </optgroup>
                        <optgroup label="Danish">
                            <option>Naja</option>
                            <option>Mads</option>
                        </optgroup>
                        <optgroup label="Dutch">
                            <option>Lotte</option>
                            <option>Ruben</option>
                        </optgroup>
                        <optgroup label="French">
                            <option>Celine</option>
                            <option>Lea</option>
                            <option>Mathieu</option>
                        </optgroup>
                        <optgroup label="French (Canadian)">
                            <option>Chantal</option>
                        </optgroup>
                        <optgroup label="German">
                            <option>Marlene</option>
                            <option>Vicki</option>
                            <option>Hans</option>
                        </optgroup>
                        <optgroup label="Hindi">
                            <option>Aditi</option>
                        </optgroup>
                        <optgroup label="Icelandic">
                            <option>Dora</option>
                            <option>Karl</option>
                        </optgroup>
                        <optgroup label="Italian">
                            <option>Bianca</option>
                            <option>Carla</option>
                            <option>Giorgio</option>
                        </optgroup>
                        <optgroup label="Japanese">
                            <option>Mizuki</option>
                            <option>Takumi</option>
                        </optgroup>
                        <optgroup label="Korean">
                            <option>Seoyeon</option>
                        </optgroup>
                        <optgroup label="Norwegian">
                            <option>Liv</option>
                        </optgroup>
                        <optgroup label="Polish">
                            <option>Ewa</option>
                            <option>Jacek</option>
                            <option>Jan</option>
                            <option>Maja</option>
                        </optgroup>
                        <optgroup label="Portuguese (Brazilian)">
                            <option>Camila</option>
                            <option>Ricardo</option>
                            <option>Vitoria</option>
                        </optgroup>
                        <optgroup label="Portuguese (European)">
                            <option>Cristiano</option>
                            <option>Ines</option>
                        </optgroup>
                        <optgroup label="Romanian">
                            <option>Carmen</option>
                        </optgroup>
                        <optgroup label="Russian">
                            <option>Maxim</option>
                            <option>Tatyana</option>
                        </optgroup>
                        <optgroup label="Spanish (European)">
                            <option>Conchita</option>
                            <option>Enrique</option>
                            <option>Lucia</option>
                        </optgroup>
                        <optgroup label="Spanish (Mexican)">
                            <option>Mia</option>
                        </optgroup>
                        <optgroup label="Spanish (US)">
                            <option>Lupe</option>
                            <option>Miguel</option>
                            <option>Penelope</option>
                        </optgroup>
                        <optgroup label="Swedish">
                            <option>Astrid</option>
                        </optgroup>                        
                        <optgroup label="Turkish">
                            <option>Filiz</option>
                        </optgroup>
                        <optgroup label="Welsh">
                            <option>Gwyneth</option>
                        </optgroup>
                    </Form.Control>
                </InputGroup>

                {!this.state.isLoading
                    ? <Button variant="primary" type="submit" block ref={input => this.submitButton = input} onClick={this.handleSubmit}>Submit</Button>
                    : <Button variant="primary" disabled block>
                        <Spinner animation="grow" size="sm" role="status" />
                        <span className="sr-only">Loading...</span>
                    </Button>
                }
            </Form>
        )
    }
}

export default connect()(TextToSpeechForm);