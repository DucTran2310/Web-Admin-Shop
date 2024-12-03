/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAPI } from "@/apis/handleAPI";
import { AddSupplier } from "@/components/modals";
import { COLORS } from "@/constants/colors";
import { SUPPLIER_ROUTES } from "@/constants/routes";
import { SupplierModelType } from "@/types/SupplierTypes";
import { Button, Modal, Space, Table, Tooltip, Typography } from "antd"
import { ColumnProps } from "antd/es/table"
import { useEffect, useState } from "react";
import { GoFilter } from "react-icons/go";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { HiOutlineUserRemove } from "react-icons/hi";

const { Title, Text } = Typography
const { confirm } = Modal


const Suppliers = () => {

  const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState(false)
  const [listSuppliers, setListSuppliers] = useState<SupplierModelType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [supplierSelected, setSupplierSelected] = useState<SupplierModelType>()

  const columns: ColumnProps<SupplierModelType>[] = [
    {
      key: 'name',
      title: 'Supplier Name',
      dataIndex: 'name'
    },
    {
      key: 'product',
      title: 'Product',
      dataIndex: 'product'
    },
    {
      key: 'contact',
      title: 'Contact Name',
      dataIndex: 'contact'
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email'
    },
    {
      key: 'type',
      title: 'Type',
      dataIndex: 'isTaking',
      render: (isTaking: boolean) => (
        <Text type={isTaking ? 'success' : 'warning'}>{isTaking ? 'Taking Return' : 'Not Taking Return'}</Text>
      )
    },
    {
      key: 'ontheway',
      title: 'On The Way',
      dataIndex: 'active',
      render: (active: number) => active ?? '-'
    },
    {
      key: 'buttonContainer',
      title: 'Action',
      dataIndex: '',
      render: (item: SupplierModelType) => (
        <Space>
          <Tooltip title="Edit">
            <Button icon={<CiEdit size={20} color={COLORS.outline500} />} type="text"
              onClick={() => {
                setSupplierSelected(item)
                setIsVisibleModalAddNew(true)
              }} />
          </Tooltip>
          <Tooltip title="Delete User">
            <Button icon={<HiOutlineUserRemove size={20} color={COLORS.primary500} />} type="text"
              onClick={() => {
                confirm({
                  title: 'Confirm Delete Supplier',
                  content: 'Are you sure you want to delete this supplier?',
                  onOk: () => removeSupplier(item?._id)
                })
              }}
            />
          </Tooltip>
        </Space>
      ),
      fixed: 'right',
      align: 'right'
    }
  ]

  useEffect(() => {
    getListSuppliers()
  }, [])

  const getListSuppliers = async () => {
    setIsLoading(true)
    try {
      const res = await handleAPI(SUPPLIER_ROUTES.GET_LIST_SUPPLIERS)
      if (res.data) {
        setListSuppliers(res.data)
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const removeSupplier = async (id: string) => {
    // soft delete
    setIsLoading(true)
    try {
      const res = await handleAPI(`${SUPPLIER_ROUTES.DELETE_SUPPLIER}?id=${id}`, {}, 'delete')
      toast.success(res.message)
      getListSuppliers()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Table
        dataSource={listSuppliers}
        columns={columns}
        loading={isLoading}
        title={() => (
          <div className="row">
            <div className="col">
              <Title level={5}>Suppliers</Title>
            </div>
            <div className="col text-right">
              <Space>
                <Button type='primary' onClick={() => {
                  setIsVisibleModalAddNew(true)
                }}>Add Supplier</Button>
                <Button icon={<GoFilter size={20} color={COLORS.gray600} />}>Filters</Button>
                <Button>Download all</Button>
              </Space>
            </div>
          </div>
        )}
      />

      <AddSupplier
        visible={isVisibleModalAddNew}
        onClose={() => {
          if (supplierSelected) {
            getListSuppliers()
          }
          setIsVisibleModalAddNew(false)
          setSupplierSelected(undefined)
        }}
        onAddNew={(value: SupplierModelType) => setListSuppliers([...listSuppliers, value])}
        supplier={supplierSelected}
      />
    </div>
  )
}

export default Suppliers