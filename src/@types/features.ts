export type Feature = {
  featureId: number | string;
  detail: string;
  detailArabic: string;
  isActive: boolean;
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  packageFeatures?: any;
  packageFeature?: any;
};
export type FeaturesList = {
  totalCount?: any;
  size?: any;
  page?: any;
  data: Feature[];
};
export type FeaturesState = {
  isLoading: boolean;
  error: boolean;
  featuresList: FeaturesList;
  featureDetails: Feature;
  addFeatureStatus: any;
  editFeatureStatus: any;
  deleteFeatureStatus: any;
};
