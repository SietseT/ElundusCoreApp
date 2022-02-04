import React from "react"
import ReactPlayer from "react-player";

import "./../../styles/soundplayer.css";


class Audioplayer extends React.Component {
    constructor() {
        super();

        this.state = {
            playStatus: true,
            position: 0,
            currentDurationString: "0:00",
            maxDurationStringString: "0:00",
            progressBarWidth: 0,
        };

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.togglePlayClick = this.togglePlayClick.bind(this);

        this.progressBarRef = React.createRef();
        this.progressBarPosition = 0;
        this.duration = 0;
    }

    componentDidUpdate(prevProps) {
        // Reset playStatus and position for when a new sound is loaded. 
        if(prevProps.src !== this.props.src) {
            this.setState({
                playStatus: true,
                position: 0
            });
        }
     }

    onProgress(event) {

        console.log(event);

        // Calculate width of progressbar in percentage
        let progressBarWidth = event.playedSeconds / event.loadedSeconds * 100;

        // If playStatus is not playing, this may trigger too many state updates
        if(this.state.playStatus !== true) {
            return;
        }

        this.loadedSeconds = event.loadedSeconds;

        this.setState({
            currentDurationString: this.getTimeCodeFromNum(event.playedSeconds),
            maxDurationString: this.getTimeCodeFromNum(event.loadedSeconds),
            progressBarWidth: progressBarWidth,
            position: progressBarWidth,
            playStatus: event.playedSeconds != event.loadedSeconds
        });
    }

    togglePlayClick() {
        let soundState = true;
        if(this.state.playStatus === true) {
            this.setState({
                playStatus: false
            });
            return;
        }

        let position = this.state.position;
        if(position === this.duration){
            this.setState({
                playStatus: soundState,
                position: 0
            });
        }
        else {
            this.setState({
                playStatus: soundState
            });
        }
    }

    onMouseClick() {
        // Calculate position to seek to
        let position = this.duration * (this.progressBarPosition / 100);

        //First update position, then trigger state. Simultaneously doesn't work.
        this.setState({
            position: position
        }, () => {
            this.setState({
                playStatus: true
            });
        });
    }

    onMouseMove(event) {
        // Needed to calculate position when clicking on seekbar
        this.progressBarPosition = (event.clientX - this.progressBarRef.current.getBoundingClientRect().left) / event.target.offsetWidth * 100;           
    }

    //turn 128 seconds into 2:08
    getTimeCodeFromNum(num) {
        let seconds = Math.round(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
    
        return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }

    render() {
        return (
            <div className="audio-player">                
            <ReactPlayer url={this.props.src} playing={this.state.playStatus} width='100%' height='100%' onProgress={this.onProgress} />
                <div className="timeline" ref={this.progressBarRef} onMouseMove={this.onMouseMove} onClick={this.onMouseClick} >
                    <div className="progress" style={{"width": this.state.progressBarWidth + '%'}}></div>
                </div>
                <div className="controls">
                    <div className="play-container">
                        <div className={`toggle-play ${this.state.playStatus === true ? "pause" : "play"}`} onClick={this.togglePlayClick} />
                    </div>
                    <div className="time">
                        <div className="current">{this.state.currentDurationString}</div>
                        <div className="divider">/</div>
                        <div className="length">{this.state.maxDurationString}</div>
                    </div>                    
                </div>
            </div>

        )
    }
}

export default Audioplayer;
