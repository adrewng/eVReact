import type { CategoryName, CategoryParent } from '~/types/category.type'

export function getIDBypathName(categories: CategoryParent[], name: CategoryName) {
  return categories.find((category) => category.name === name)?.id ?? -1
}
