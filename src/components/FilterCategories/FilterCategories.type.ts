import {
  FilterCategory,
  FilterCategoryType,
} from '../FilterCategoryGroup/FilterCategoryGroup.type';

export interface FilterCategoriesProps {
  categories: FilterCategory[];
  selectedCategories?: FilterCategoryType[] | [];
  onSelectCategories: (categories: FilterCategoryType[]) => void;
}
