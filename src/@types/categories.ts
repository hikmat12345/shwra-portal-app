export type Category = {
  parentId?: number;
  mobileRequestCategoryId: number | string;
  name: string;
  arabicName: string;
  description: string;
  arabicDescription: string;
  icon: any;
  isActive: boolean;
  sortOrder: number;
  createdBy?: string;
  createdDate?: string | Date;
  lastModifiedDate?: string;
  lastModifiedBy?: string | Date;
  iconURL?: any;
};
export type CategoryCRUD = {
  Name: string;
  ArabicName: string;
  Description: string;
  ArabicDescription: string;
  Icon: any;
  IsActive: boolean;
  SortOrder: number;
};

export type CategoriesState = {
  isLoading: boolean;
  error: boolean;
  categoriesList: Category[];
  categoriesListLangWise: Category[];
  categoryDetails: Category;
  addCategoryStatus: any;
  editCategoryStatus: any;
  deleteCategoryStatus: any;
};

export type MasterCategory = {
  description?: string;
  flow?: string;
  icon?: string;
  isActive?: boolean;
  masterCategoryId?: number;
  name?: string;
  parentId?: number;
  sortOrder?: number;
  subCategoreies?: any[];
};
