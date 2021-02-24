// TODO Add required nodes & attributes

import TYPES from '../xml/types'

const collections = {
  AdVerifications: ['Verification'],
  Companion: ['CompanionClickTracking'],
  CompanionAds: ['Companion'],
  CreativeExtensions: ['CreativeExtension'],
  Creatives: ['Creative'],
  Extensions: ['Extension'],
  Icon: ['IconViewTracking'],
  IconClicks: ['IconClickTracking'],
  Icons: ['Icon'],
  InLine: ['Category', 'Error', 'Impression', 'Survey'],
  MediaFiles: ['MediaFile', 'InteractiveCreativeFile'],
  NonLinear: ['NonLinearClickTracking'],
  NonLinearAds: ['NonLinear'],
  TrackingEvents: ['Tracking'],
  VAST: ['Error', 'Ad'],
  Verification: ['JavaScriptResource', 'FlashResource'],
  ViewableImpression: ['Viewable', 'NotViewable', 'ViewUndetermined'],
  VideoClicks: ['ClickTracking', 'CustomClick'],
  Wrapper: ['Impression', 'Error']
}

const freeforms = {
  CreativeExtensions: ['CreativeExtension'],
  Extensions: ['Extension']
}

const hybrids = [
  'CompanionAds'
]

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
  hybrids,
  types
}
