import { Survey } from 'iab-vast-model'

export default ($survey) => {
  const survey = new Survey()
  survey.type = $survey.type
  survey.uri = $survey._value
  return survey
}
