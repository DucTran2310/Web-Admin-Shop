/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAPI } from "@/apis/handleAPI";
import { COLORS } from "@/constants/colors";
import { SUPPLIER_ROUTES } from "@/constants/routes";
import { ModalSupplierModelType, SupplierFormValues } from "@/types/SupplierModelTypes"
import { replaceName } from "@/utils/replaceName";
import { uploadFile } from "@/utils/uploadFile";
import { Avatar, Button, Form, Input, Modal, Select, Typography } from "antd"
import { useRef, useState } from "react"
import { FaRegUser } from "react-icons/fa6";
import { toast } from "react-toastify";

const { Paragraph } = Typography

const AddSupplier: React.FC<ModalSupplierModelType> = ({
  visible,
  onAddNew,
  onClose,
  supplier
}) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isTaking, setIsTaking] = useState<boolean>()
  const [file, setFile] = useState()

  const [form] = Form.useForm()
  const inputRef = useRef<HTMLInputElement>(null)

  const addNewSupplier = async (values: SupplierFormValues) => {
    setIsLoading(true)

    let data: Partial<SupplierFormValues> = {}

    for (const i in values) {
      const key = i as keyof SupplierFormValues;
      if (values[key] !== undefined && values[key] !== '') {
        (data[key] as any) = values[key];  // Add type assertion
      }
    }

    if (file) {
      console.log('VVVFILE: ', file)
      data = {
        ...data,
        photoUrl: await uploadFile(file)
      }
    }

    data = {
      ...data,
      price: (values.price.replace(/,/g, '') || '0'),  // Keep as string instead of converting to number
      isTaking: isTaking ? 1 : 0,
      slug: replaceName(values.name)
    }

    try {
      console.log(data)
      const res = await handleAPI(SUPPLIER_ROUTES.ADD_NEW_SUPPLIER, data, 'post')
      console.log('RES: ', res)
      toast.success(res.message, {
        position: "top-right",
      });
      onAddNew(res.data)
      handleClose()
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
      open={visible}
      onClose={handleClose}
      onCancel={handleClose}
      onOk={() => form.submit()}
      title="Add supplier"
      okText="Add supplier"
      cancelText="Discard"
      closable={!isLoading}
      okButtonProps={{
        loading: isLoading
      }}
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
          <Button type="link" onClick={() => inputRef.current?.click()}>Browser image</Button>
        </div>
      </label>
      <Form
        disabled={isLoading}
        requiredMark={false}
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
          label={
            <span>
              Supplier Name<span style={{ color: 'red' }}> *</span>
            </span>
          }
          rules={[{
            required: true,
            message: 'Supplier name is not empty'
          }]}
        >
          <Input placeholder="Enter supplier name" allowClear />
        </Form.Item>
        <Form.Item
          name={'product'}
          label={
            <span>
              Product<span style={{ color: 'red' }}> *</span>
            </span>
          }
          rules={[{
            required: true,
            message: 'Product is not empty'
          }]}
        >
          <Input placeholder="Enter product" allowClear />
        </Form.Item>
        <Form.Item
          name={'categories'}
          label={
            <span>
              Category
              {/* <span style={{ color: 'red' }}> *</span> */}
            </span>
          }
        // rules={[{
        //   required: true,
        //   message: 'Category is not empty'
        // }]}
        >
          <Select options={[]} placeholder="Enter product category" />
        </Form.Item>
        <Form.Item
          name="price"
          label={
            <span>
              Buying Price<span style={{ color: 'red' }}> *</span>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Buying price is not empty',
            },
            {
              pattern: /^[0-9,]*$/,
              message: 'Buying price must be a valid number',
            },
          ]}
        >
          <Input
            placeholder="Enter buying price"
            allowClear
            onChange={(e) => {
              const value = e.target.value.replace(/,/g, '');
              if (/^\d*$/.test(value)) {
                const formattedValue = Number(value).toLocaleString();
                form.setFieldsValue({ price: formattedValue });
              }
            }}
          />
        </Form.Item>
        <Form.Item
          name="contacts"
          label={
            <span>
              Contact Number<span style={{ color: 'red' }}> *</span>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Contact number is not empty',
            },
            {
              pattern: /^[0-9]*$/,
              message: 'Contact number must be a valid number',
            }
          ]}
        >
          <Input placeholder="Enter supplier contact number" allowClear 
            onChange={(e) => {
              const value = e.target.value.replace(/,/g, '');
              if (/^\d*$/.test(value)) {
                form.setFieldsValue({ contacts: value });
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label="Type"
        >
          <div className="mb-2">
            <Button
              size="middle"
              onClick={() => setIsTaking(false)}
              type={isTaking === false ? 'primary' : "default"}>Not taking return</Button>
          </div>
          <Button
            onClick={() => setIsTaking(true)}
            size="middle"
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
