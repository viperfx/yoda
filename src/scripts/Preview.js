'use strict';

import React from 'react/addons';
import {Navigation} from 'react-router';
import Actions from './Actions';
import {RenderMixin} from './Mixins';
import PreviewImage from './PreviewImage';
import PreviewTitle from './PreviewTitle';
import PreviewDuration from './PreviewDuration';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, RenderMixin, Navigation],

  handlePlay(e) {
    e.preventDefault();
    let item = this.props.video;
    this.transitionTo('play', {ytid: item.id});
  },

  renderVideo(item) {
    return (
      <div className="video-detail" onClick={this.handlePlay}>
        <div className="video-image">
          <PreviewImage title={item.snippet.title} src={item.snippet.thumbnails.maxres.url} />
          <PreviewDuration duration={item.contentDetails.duration} />
        </div>
      </div>
    );
  },

  render() {
    let video = this.props.video;
    let fragment = this.renderVideo(video);

    return this.renderFragment('preview-video', fragment);
  }
});
