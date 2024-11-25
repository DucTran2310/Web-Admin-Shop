export interface ModalSupplierType {
  visible: boolean,
  onClose: () => void,
  onAddNew: (value: any) => void,
  supplier?: any
}