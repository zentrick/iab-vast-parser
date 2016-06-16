import createStaticResource from './static-resource'
import createIFrameResource from './iframe-resource'
import createHTMLResource from './html-resource'

export default ($parent) => {
  return $parent.staticResource ? createStaticResource($parent.staticResource)
    : $parent.iFrameResource ? createIFrameResource($parent.iFrameResource)
    : $parent.htmlResource ? createHTMLResource($parent.htmlResource)
    : null
}
