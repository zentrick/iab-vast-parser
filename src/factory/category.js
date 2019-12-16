import { Category } from 'iab-vast-model'

export default ($category) => {
  const category = new Category()
  category.authority = $category.authority
  category.code = $category._value
  return category
}
