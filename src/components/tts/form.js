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

        const voiceTextJson = localStorage.getItem("voiceText");
        const savedVoiceText = JSON.parse(voiceTextJson);
        if (savedVoiceText) {
            this.defaultVoice = savedVoiceText.voice;
            this.defaultText = savedVoiceText.text;
        }

        this.state = {
            text: this.defaultText,
            voice: this.defaultVoice,
            characterCount: 0,
            textMaxLength: 500,
            isLoading: false,
            cleartext: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChanged = this.handleCheckboxChanged.bind(this);
        this.callStreamElementsAndDispatch = this.callStreamElementsAndDispatch.bind(this);
    }

    keysPressed = {};

    setLoading(value) {
        this.setState({
            isLoading: value
        });
    }

    async componentDidUpdate() {
        var voiceText = {
            voice: this.state.voice,
            text: this.state.text,
        }

        localStorage.setItem("voiceText", JSON.stringify(voiceText));
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

        if (this.state.cleartext) {
            this.setState({
                text: ""
            });
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

    async onKeyDown(event) {
        this.keysPressed[event.key] = true;

        if (!this.keysPressed['Shift'] && event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.handleSubmit(event);
        }
    }

    async onKeyUp(event) {
        delete this.keysPressed[event.key];
    }

    async handleCheckboxChanged(event) {

        const target = event.target;
        const value = target.checked;
        const name = target.name;

        this.setState({
            [name]: value
        });
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
                        onKeyDown={this.onKeyDown}
                        onKeyUp={this.onKeyUp}
                        value={this.state.text}
                        rows="5"
                        maxLength={this.state.textMaxLength}
                        aria-label="Text"
                    />
                </Form.Group>

                <InputGroup className="mb-3 mb-md-4 input-group-voice">
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
                <Form.Group className="mb-3" controlId="clearTextCheckbox">
                    <Form.Check type="checkbox" aria-label="Clear text after submitting" role="checkbox" title="Clear text after submitting"
                        name="cleartext" label="Clear text after submitting" onChange={this.handleCheckboxChanged} />
                </Form.Group>
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