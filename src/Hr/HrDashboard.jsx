import React from "react";
import { Card, Row, Col, Divider } from "antd";
import {
  ArrowRightOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import BestSellingTable from "./BestSellingTable";
import LineGraph from "../components/atoms/LineGraph"

export default function Dashboard() {
  return (
    <div>
      <div style={{ margin: "20px" }}>
        <h2>Dashboard</h2>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <div>
                  <Row>
                    <Col span={20}>
                      <div>Policies</div>
                      <div>Sales</div>
                    </Col>
                    <Col
                      span={4}
                      style={{
                        color: "#8ec131",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      05
                    </Col>
                  </Row>
                </div>
                <Divider />
                <Row>
                  <Col span={20} style={{ fontSize: "10px" }}>
                    Month : April 2021
                  </Col>

                  <Col span={4}>
                    <ArrowRightOutlined style={{ color: "#8ec131" }} />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <div>
                  <Row>
                    <Col span={20}>
                      <div>Claims</div>
                      <div>Received</div>
                    </Col>
                    <Col span={4}></Col>
                  </Row>
                </div>
                <Divider />
                <Row>
                  <Col span={20} style={{ fontSize: "10px" }}>
                    Month : April 2021
                  </Col>

                  <Col span={4}>
                    <ArrowRightOutlined style={{ color: "#8ec131" }} />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <div>
                  <Row>
                    <Col span={20}>
                      <div>Claims</div>
                      <div>Settled</div>
                    </Col>
                    <Col
                      span={4}
                      style={{
                        color: "#8ec131",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      05
                    </Col>
                  </Row>
                </div>
                <Divider />

                <Row>
                  <Col span={20} style={{ fontSize: "10px" }}>
                    Month : April 2021
                  </Col>

                  <Col span={4}>
                    <ArrowRightOutlined style={{ color: "#8ec131" }} />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <div>
                  <Row>
                    <Col span={20}>
                      <div>Service</div>
                      <div>Requests</div>
                    </Col>
                    <Col
                      span={4}
                      style={{
                        color: "#8ec131",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      05
                    </Col>
                  </Row>
                </div>
                <Divider />
                <Row>
                  <Col span={20} style={{ fontSize: "10px" }}>
                    Month : April 2021
                  </Col>

                  <Col span={4}>
                    <ArrowRightOutlined style={{ color: "#8ec131" }} />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="site-card-wrapper" style={{ marginTop: "20px" }}>
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <div
                  style={{
                    backgroundColor: "#FFB6C1",
                  }}
                >
                  <Row>
                    <Col span={20}
                    style={{
                        color: "#000000",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}>
                      <div>Complaints</div>
                      <div>Received</div>
                    </Col>
                    <Col
                      span={4}
                    
                    >
                      412
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={20}
                      style={{
                        fontSize: "10px",
                        color: "#ffffff",
                      }}
                    >
                      Month : April 2021
                    </Col>

                    <Col span={4}>
                      <ArrowUpOutlined style={{ color: "#8ec131" }} />
                    </Col>
                  </Row>
                </div>
                <Divider />
                <Row>
                  <Col span={20} style={{ fontSize: "14px" }}>
                    Resolved Complaints
                  </Col>

                  <Col span={4} style={{ fontSize: "12px" }}>
                    211
                  </Col>
                </Row>
                <Row>
                  <Col span={20} style={{ fontSize: "14px" }}>
                    Open Complaints
                  </Col>

                  <Col span={4} style={{ fontSize: "12px" }}>
                    201
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <div
                  style={{
                    backgroundColor: "#8ec131",
                  }}
                >
                  <Row style={{ color: "#ffffff",fontSize: "18px",
                        fontWeight: 600, }}>
                    <Col span={16}>
                      <div>Premium</div>
                      <div>Received</div>
                    </Col>
                    <Col
                      span={8}
                    //   style={{
                    //     color: "#ffffff",
                    //     fontSize: "18px",
                    //     fontWeight: 600,
                    //   }}
                    >
                      $ 28 mn
                    </Col>
                  </Row>
                  <Row style={{ color: "#ffffff" }}>
                    <Col span={20} style={{ fontSize: "10px" }}>
                      Month : April 2021
                    </Col>

                    <Col span={4}>
                      <ArrowDownOutlined style={{ color: "#ffffff" }} />
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <div
                  style={{
                    backgroundColor: "#000000",
                  }}
                >
                  <Row style={{ color: "#ffffff" }}>
                    <Col span={16}>
                      <div>Invoices</div>
                      <div>Generated</div>
                    </Col>
                    <Col
                      span={8}
                      style={{
                        color: "#ffffff",
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      824
                    </Col>
                  </Row>
                  <Row style={{ color: "#ffffff" }}>
                    <Col span={20} style={{ fontSize: "10px" }}>
                      Month : April 2021
                    </Col>

                    <Col span={4}>
                      <ArrowDownOutlined style={{ color: "#ffffff" }} />
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div> 
        <h2>GRAPHS</h2>
      </div>
      <div className="container-fluid" style={{display:"flex"}}>
      <LineGraph/>
      <LineGraph/>
      </div>
      <>
        <BestSellingTable />
      </>
    </div>
  );
}
