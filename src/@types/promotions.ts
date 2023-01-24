export type Promotion = {
  codeId: number | string;
  codeName: string;
  discount: number | string;
  limit: number | string;
  limitRemaining: number | string;
  status: boolean;
  createdDate: string;
};
export type PromotionsState = {
  isLoading: boolean;
  error: boolean;
  promotionsList: {
    count?: any;
    size?: any;
    page?: any;
    promotionCodesListDto: Promotion[];
  };
  promotionDetails: Promotion;
  addPromotionStatus: any;
  editPromotionStatus: any;
  deletePromotionStatus: any;
};
