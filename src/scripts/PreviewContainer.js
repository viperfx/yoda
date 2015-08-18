'use strict';

import React from 'react/addons';
import {RenderMixin} from './Mixins';
import Join from 'react/lib/joinClasses';
import Preview from './Preview';
import Actions from './Actions';
import PreviewStore from './PreviewStore';
import {State} from 'react-router';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, RenderMixin, State],

  getInitialState(){
    return PreviewStore.getState();
  },

  componentDidMount() {
    PreviewStore.listen(this.onChange);
    Actions.fetchPreview(this.getParams().ytid);
  },

  componentWillUnmount() {
    PreviewStore.unlisten(this.onChange);
  },

  onChange() {
    this.setState(PreviewStore.getState());
  },

  renderFormatRows(formats) {
    let nodes = formats.map(format => {
      if (format.quality) {
        return (
          <tr className="download-item">
            <td className="download-hash">{format.resolution} {format.container} {format.quality}</td>
          </tr>
        )
      }
    });
    return nodes;
  },

  renderFormatTable(info) {
    return (
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Formats</th>
          </tr>
        </thead>
        <tbody>
          {this.renderFormatRows(info.formats)}
        </tbody>
      </table>
    );
  },

  renderPreview(data) {
    return (
      <div key={data.video.id}>
        <h3>{data.video.snippet.title}</h3>
        <Preview video={data.video} />
        {this.renderFormatTable(data.formats)}
      </div>
    );
  },

  render() {
    if(this.props.loading){
      var fragment = this.renderLoader({message: 'Loading video info...'});
    } else {
      let data = this.state.videoInfo.toArray();
      if (data.length > 0){ 
        var fragment = data.map(this.renderPreview);
      }else{
        var fragment = `Loading...`;
      }
    }
    return this.renderFragment('preview', fragment);
  }
})

