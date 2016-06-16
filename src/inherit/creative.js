import createCreativeExtension from '../factory/creative-extension'

export default ($creative, creative) => {
  creative.id = $creative.id
  creative.sequence = $creative.sequence
  // VAST3 XSD specifies AdID and that seems to be what parsers have agreed on
  creative.adID = $creative.AdID || $creative.adID
  creative.apiFramework = $creative.apiFramework
  if ($creative.creativeExtensions && $creative.creativeExtensions.creativeExtension) {
    creative.extensions.push(...$creative.creativeExtensions.creativeExtension.map(createCreativeExtension))
  }
}
