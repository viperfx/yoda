'use strict';

import {Record, List, Map} from 'immutable';
import {Alt} from './Core';
import Actions from './Actions';

const Preview = new Record({formats:null, video:null});

class PreviewStore {
  constructor() {
    this.errMessage = null;
    this.videoInfo = List(Map({}));

    this.bindListeners({
      handleFailPreview: Actions.failPreview,
      handleReceivePreview: Actions.receivePreview,
      handleFetchPreview: Actions.fetchPreview
    });
  }

  handleFetchPreview() {
    this.videoInfo = List(Map({}));
  }

  handleFailPreview(err) {
    this.errMessage = err;
  }

  handleReceivePreview(formats){
    let info = JSON.parse(localStorage.getItem('preview'));
    this.errMessage = null;
    this.videoInfo = this.videoInfo.push(new Preview({formats:formats, video:info}));
  }
}

export default Alt.createStore(PreviewStore);
