import { COLORS } from "@/constants/colors";
import { ModalSupplierType } from "@/types/SupplierTypes"
import { Avatar, Button, Form, Input, Modal, Select, Typography } from "antd"
import { useRef, useState } from "react"
import { FaRegUser } from "react-icons/fa6";

const { Paragraph } = Typography

const AddSupplier: React.FC<ModalSupplierType> = ({
  visible,
  onAddNew,
  onClose,
  supplier
}) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isTaking, setIsTaking] = useState<boolean>()
  const [file, setFile] = useState()

  const [form] = Form.useForm()
  const inputRef = useRef<any>()

  const addNewSupplier = async (values: any) => {
    setIsLoading(true)

    let data: any = {}

    for (const i in values) {
      data[i] = values[i] ?? ''
    }

    data = {
      ...data,
      price: values.price ? parseInt(values.price) : 0,
      isTaking: isLoading ? 1 : 0
    }

    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      width={700}
      loading={isLoading}
      open={visible}
      onClose={handleClose}
      onCancel={handleClose}
      onOk={() => form.submit()}
      title="Add supplier"
      okText="Add supplier"
      cancelText="Discard"
    >
      <label htmlFor="inpFile" className="p--2 mb-3 row flex items-center">
        {
          file ? (
            <Avatar size={100} src={URL.createObjectURL(file)} />
          ) : (
            <Avatar size={100}
              style={{
                backgroundColor: "white",
                border: '1px dashed #e0e0e0'
              }}
            >
              <FaRegUser size={60} color={COLORS.gray600} />
            </Avatar>
          )
        }
        <div className="ml-3">
          <Paragraph className="text-muted m-0">Drag image here</Paragraph>
          <Paragraph className="text-muted mb-2">Or</Paragraph>
          <Button type="link" onClick={() => inputRef.current.click()}>Browser image</Button>
        </div>
      </label>
      <Form
        onFinish={addNewSupplier}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        size="large"
        form={form}
        labelAlign="left"
      >
        <Form.Item
          name={'name'}
          label="Supplier Name"
          rules={[{
            required: true,
            message: 'Supplier name is not empty'
          }]}
        >
          <Input placeholder="Enter supplier name" allowClear />
        </Form.Item>
        <Form.Item
          name={'product'}
          label="Product"
          rules={[{
            required: true,
            message: 'Product is not empty'
          }]}
        >
          <Input placeholder="Enter product" allowClear />
        </Form.Item>
        <Form.Item
          name={'categories'}
          label="Category"
          rules={[{
            required: true,
            message: 'Category is not empty'
          }]}
        >
          <Select options={[]} placeholder="Enter product category" />
        </Form.Item>
        <Form.Item
          name={'price'}
          label="Buying Price"
          rules={[{
            required: true,
            message: 'Buying price is not empty'
          }]}
        >
          <Input placeholder="Enter buying price" allowClear />
        </Form.Item>
        <Form.Item
          name={'contacts'}
          label="Contact Number"
          rules={[{
            required: true,
            message: 'Contact number is not empty'
          }]}
        >
          <Input placeholder="Enter supplier contact number" allowClear />
        </Form.Item>
        <Form.Item
          label="Type"
        >
          <div className="mb-2">
            <Button
              onClick={() => setIsTaking(false)}
              type={isTaking === false ? 'primary' : "default"}>Not taking return</Button>
          </div>
          <Button onClick={() => setIsTaking(true)}
            type={isTaking ? 'primary' : 'default'}>Taiking return</Button>
        </Form.Item>
      </Form>
      <div className="hidden">
        <input
          ref={inputRef}
          accept="image/*"
          type="file"
          name=""
          id="inpFile"
          onChange={(value: any) => setFile(value.target.files[0])}
        />
      </div>
    </Modal>
  )
}

export default AddSupplier
