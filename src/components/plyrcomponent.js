import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import "plyr/dist/plyr.polyfilled"
import "../styles/plyr.css"

import plyr from 'plyr'

class PlyrComponent extends React.Component {  

  componentDidMount() {

    this.player = new plyr('.js-plyr', this.props.options);
    this.player.source = this.props.sources;
    this.player.play();
  }



  componentDidUpdate() {
    this.player.source = this.props.sources;
    this.player.play();
  }

  componentWillUnmount() {
    this.player.destroy()
  }

  render() {
    return (
      <audio className='js-plyr plyr'>
        <track kind="captions" />
      </audio>
    )
  }
}

PlyrComponent.defaultProps = {
  options: {
    controls: [
      'rewind',
      'play',
      'fast-forward',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'settings',
      'fullscreen',
    ],
    i18n: {
      restart: 'Restart',
      rewind: 'Rewind {seektime}s',
      play: 'Play',
      pause: 'Pause',
      fastForward: 'Forward {seektime}s',
      seek: 'Seek',
      seekLabel: '{currentTime} of {duration}',
      played: 'Played',
      buffered: 'Buffered',
      currentTime: 'Current time',
      duration: 'Duration',
      volume: 'Volume',
      mute: 'Mute',
      unmute: 'Unmute',
      enableCaptions: 'Enable captions',
      disableCaptions: 'Disable captions',
      download: 'Download',
      enterFullscreen: 'Enter fullscreen',
      exitFullscreen: 'Exit fullscreen',
      frameTitle: 'Player for {title}',
      captions: 'Captions',
      settings: 'Settings',
      menuBack: 'Go back to previous menu',
      speed: 'Speed',
      normal: 'Normal',
      quality: 'Quality',
      loop: 'Loop',
    },
  },
  sources: {
    type: 'audio'
  }
}

PlyrComponent.propTypes = {
  options: PropTypes.object,
  sources: PropTypes.object,
  source: PropTypes.func,
  destroy: PropTypes.func
}

export default connect((state, props) => {
  return {
    voiceBlobUrl: state.voiceBlobUrl
};
})(PlyrComponent);