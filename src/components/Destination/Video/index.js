import React from 'react';
import Player from '@vimeo/player';
import './index.scss';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      id: this.props.id,
      isPlaying: false,
      isLoaded: false,
      loadTimeout: false,
      buffering: true,
      volume: (this.state && this.state.volume !== undefined) ? this.state.volume : 1
    }
  }

  componentDidMount() {
    const {id} = this.props;
    this.createPlayer(this.video, id);
  }

  componentDidUpdate(prevProps, prevState) {
    const {id, setIsReady} = this.props;
    if (this.state.id !== id && this.state.isLoaded) {
      this.setState(this.getInitialState());
      this.unloadVideo().then(() =>
        this.loadVideo(id));
    }

    if (!prevState.isPlaying && this.state.isPlaying) {
      setIsReady();
    }
  }

  unloadVideo() {
    this.clearLoading();
    if (this.player) {
      return this.player.unload();
    }
    return Promise.resolve();
  }

  loadVideo(id) {
    return this.player.loadVideo(id);
  }

  componentWillUnmount() {
    this.player.off('loaded');
    this.player.off('play');
    this.player.off('timeupdate');
    if (this.player) {
      this.player.unload();
    }
    this.clearLoading();
  }

  createPlayer(element, id) {
    this.player = new Player(element, {id, loop: true, autoplay:true});
    this.player.on('loaded', () => {
      if (this.state.id === this.props.id) {
        this.player.getPaused().then(ispaused => {
          if (ispaused) {
            this.player.play();
          }
        });
        this.player.setVolume(this.state.volume);
      }
      this.setState({isLoaded: true});
    });

    this.player.on('play', () => {
      this.initLoading();
    });

    this.player.on('timeupdate', () => {
      if (this.state.isPlaying === false) {
        this.setState({isPlaying: true});
      }
      this.setState({buffering: false});
      this.initLoading();
    });
  }

  initLoading() {
    this.clearLoading();
    this.loadingTimer = setInterval(() =>
      this.setState({buffering: true}), 1000);
  }

  clearLoading() {
    if (this.loadingTimer) {
      clearInterval(this.loadingTimer);
      this.loadingTimer = null;
    }
  }

  toggleVolume() {
    const volume = +(!this.state.volume);
    this.player.setVolume(volume);
    this.setState({
      volume: volume
    });
  }

  render() {
    const {user, className} = this.props;
    const {buffering} = this.state;

    return (
      <div className={'destination--video ' + className}>
        <div ref={video => { this.video = video; }} className="destination--video--container"></div>

        <div className="destination--video--user">
          by<a href={user.link} target="_black">{user.name}</a>@ vimeo
        </div>

        <div className="destination--video--controls">
          <div className={'destination--video--controls--volume' + (this.state.volume ? ' up' : ' down')}
               onClick={() => this.toggleVolume()}></div>
        </div>

        {buffering ? <div className="destination--video--buffering"></div> : null}
      </div>
    );
  }
}

Video.propTypes = {
  id: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired,
  setIsReady: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
}

export default Video;
