import { COLORS } from "@/constants/colors";
import { Button, Space, Table, Typography } from "antd"
import { ColumnProps } from "antd/es/table"
import { GoFilter } from "react-icons/go";

const { Title } = Typography

const Suppliers = () => {

  const columns: ColumnProps<any>[] = []

  return (
    <div>
      <Table
        dataSource={[]}
        columns={columns}
        title={() => (
          <div className="row">
            <div className="col">
              <Title level={5}>Suppliers</Title>
            </div>
            <div className="col text-right">
              <Space>
                <Button type='primary'>Add Supplier</Button>
                <Button icon={<GoFilter size={20} color={COLORS.gray600} />}>Filters</Button>
                <Button>Download all</Button>
              </Space>
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default Suppliers