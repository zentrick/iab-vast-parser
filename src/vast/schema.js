// TODO Add required nodes & attributes

import TYPES from '../xml/types'

const collections = {
  Companion: ['CompanionClickTracking'],
  CompanionAds: ['Companion'],
  CreativeExtensions: ['CreativeExtension'],
  Creatives: ['Creative'],
  Extensions: ['Extension'],
  Icon: ['IconViewTracking'],
  IconClicks: ['IconClickTracking'],
  Icons: ['Icon'],
  InLine: ['Impression', 'Error'],
  MediaFiles: ['MediaFile'],
  NonLinear: ['NonLinearClickTracking'],
  NonLinearAds: ['NonLinear'],
  TrackingEvents: ['Tracking'],
  VAST: ['Error', 'Ad'],
  VideoClicks: ['ClickTracking', 'CustomClick'],
  Wrapper: ['Impression', 'Error']
}

const freeforms = {
  CreativeExtensions: ['CreativeExtension'],
  Extensions: ['Extension']
}

const types = {
  Ad: {
    sequence: TYPES.int
  },
  AdParameters: {
    xmlEncoded: TYPES.bool
  },
  Companion: {
    width: TYPES.int,
    height: TYPES.int,
    expandedWidth: TYPES.int,
    expandedHeight: TYPES.int
  },
  Creative: {
    sequence: TYPES.int
  },
  Duration: {
    _value: TYPES.time
  },
  Icon: {
    width: TYPES.int,
    height: TYPES.int,
    offset: TYPES.time,
    duration: TYPES.time
  },
  MediaFile: {
    bitrate: TYPES.int,
    minBitrate: TYPES.int,
    maxBitrate: TYPES.int,
    width: TYPES.int,
    height: TYPES.int,
    scalable: TYPES.bool,
    maintainAspectRatio: TYPES.bool
  },
  NonLinear: {
    width: TYPES.int,
    height: TYPES.int,
    assetWidth: TYPES.int,
    assetHeight: TYPES.int,
    expandedWidth: TYPES.int,
    expandedHeight: TYPES.int,
    scalable: TYPES.bool,
    maintainAspectRatio: TYPES.bool,
    minSuggestedDuration: TYPES.time
  },
  Pricing: {
    _value: TYPES.float
  },
  Wrapper: {
    followAdditionalWrappers: TYPES.bool,
    allowMultipleAds: TYPES.bool,
    fallbackOnNoAd: TYPES.bool
  }
}

export default {
  collections,
  freeforms,
  types
}
