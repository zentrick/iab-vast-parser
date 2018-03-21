import {Verification} from 'iab-vast-model'
import createJavaScriptResource from './javascript-resource'
import createFlashResource from './flash-resource'

export default ($verification) => {
  const verification = new Verification()
  verification.vendor = $verification.vendor
  if ($verification.javaScriptResource != null) {
    verification.javaScriptResources
      .push(...$verification.javaScriptResource.map(createJavaScriptResource))
  }
  if ($verification.flashResource != null) {
    verification.flashResources
      .push(...$verification.flashResource.map(createFlashResource))
  }
  if ($verification.viewableImpression != null) {
    verification.viewableImpression = $verification.viewableImpression._value
  }
  // XXX <VerificationParameters> is getting introduced in VAST 4.1
  // We're already using it in our VAST Tester via this undocumented property
  if ($verification.verificationParameters != null) {
    verification.parameters = $verification.verificationParameters._value
  }
  return verification
}
