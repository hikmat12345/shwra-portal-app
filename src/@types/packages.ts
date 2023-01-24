export type Package = {
  id?: number | string;
  name: string;
  name_Arabic: string;
  description: string;
  description_Arabic: string;
  amount: number;
  isActive: boolean;
  isFollowUp?: boolean;
  followUpTimeDuration?: number;
  createdBy?: string;
  createdDate?: string | Date;
  lastModifiedDate?: string;
  lastModifiedBy?: string | Date;
  iconURL?: any;
  isTamara?: boolean;
  image?: string;
  packageFeatures?: any;
  packageFeature?: any;
};
export type PackagesState = {
  isLoading: boolean;
  error: boolean;
  packagesList: Package[];
  // packagesListLangWise: Package[];
  packageDetails: Package;
  addPackageStatus: any,
  editPackageStatus: any,
  deletePackageStatus: any
};
