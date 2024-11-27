/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ModalSupplierModelType {
  visible: boolean,
  onClose: () => void,
  onAddNew: (value: SupplierModelType) => void,
  supplier?: SupplierModelType
}

export interface SupplierFormValues {
  name: string;
  product: string;
  categories?: string;
  price: string;
  contacts: string;
  photoUrl?: string;
  isTaking?: number;
  slug?: string;
}

export interface SupplierModelType {
  name: string
  slug: string
  product: string
  categories: any[]
  price: number
  isTaking: number
  photoUrl: string
  creatdAt: string
  updatedAt: string
  _id: string
}

