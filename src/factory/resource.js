import createStaticResource from './static-resource'
import createIFrameResource from './iframe-resource'
import createHTMLResource from './html-resource'

export default ($parent) =>
  ($parent.staticResource != null) ? createStaticResource($parent.staticResource)
    : ($parent.iFrameResource != null) ? createIFrameResource($parent.iFrameResource)
      : ($parent.htmlResource != null) ? createHTMLResource($parent.htmlResource)
        : null
