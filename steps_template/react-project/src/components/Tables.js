import { useEffect, useState } from "react";
import ProjectTables from "./ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import axios from "../axios";


const Tables = () => {
  let user = JSON.parse(sessionStorage.getItem('user') || null);

  const [rf_members, setRfMembers] = useState([]);
  const [lf_members, setLfMembers] = useState([]);
  const [fr_members, setFrMembers] = useState([]);
  const [fl_members, setFlMembers] = useState([]);
  
    useEffect(() => {
      axios
        .post('/user/survey', { id: user.id })
        .then((res) => {

          const data = res.data
          // const gyroRfData = res.data.gyroRfData;
          // const gyroLfData = res.data.gyroLfData;
          
          // if (Array.isArray(gyroRfData)) {
          //   const rfDataSlice = gyroRfData.slice(0, 5);
          //   setRfMembers(rfDataSlice);
          // } else {
          //   console.error('gyroRfData is not an array:', gyroRfData);
          // }

          // if (Array.isArray(gyroLfData)) {
          //   const lfDataSlice = gyroLfData.slice(0, 5);
          //   setLfMembers(lfDataSlice);
          // } else {
          //   console.error('gyroLfData is not an array:', gyroLfData);
          // }

          console.log(res.data);

          const gyroRfData = res.data.gyroRfData.slice(0, 5);
          const gyroLfData = res.data.gyroLfData.slice(0,5);
          const fsrRfData = res.data.fsrRfData.slice(0,5);
          const fsrLfData = res.data.fsrLfData.slice(0,5);

          setRfMembers(gyroRfData);
          setLfMembers(gyroLfData);
          setFrMembers(fsrRfData);
          setFlMembers(fsrLfData);
  
        })
        .catch((error) => {
          console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
        });
    }, []);

  return (
    <Row>
      <Col lg="12" style={{marginBottom: '30px'}}>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0" style={{ backgroundColor: '#0B0B3B', color: 'white', borderRadius:'5px'}}>
            <i className="bi bi-card-text me-2"> </i>
            왼발 압력 데이터
          </CardTitle>
          <CardBody className="">
            <Table bordered striped>
              <thead>
              <tr>
                <th>#</th>
                {[...Array(16).keys()].map((index) => (
                  <th key={index}>key{index + 1}</th>
                ))}
              </tr>
              </thead>
              <tbody>
              {fl_members.map((member, index) => (
              <tr key={index}>
                <th scope="row" style={{ width: '200px' }}>{new Date(member.created_at).toLocaleString('en-US', { hour12: false })}</th>
                {Array.from({ length: 16}, (_, idx)=> (
                  <td key={idx}>{member.press_value[`key${idx + 1}`]}</td>
                ))}
                </tr>))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>

      <Col lg="12" style={{marginBottom: '30px'}}>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0" style={{ backgroundColor: '#0B0B3B', color: 'white', borderRadius:'5px'}}>
            <i className="bi bi-card-text me-2"> </i>
            오른발 압력 데이터
          </CardTitle>
          <CardBody className="">
            <Table bordered striped>
              <thead>
              <tr>
                <th>#</th>
                {[...Array(16).keys()].map((index) => (
                  <th key={index}>key{index + 1}</th>
                ))}
              </tr>
              </thead>
              <tbody>
              {fr_members.map((member, index) => (
              <tr key={index}>
                <th scope="row" style={{ width: '200px' }}>{new Date(member.created_at).toLocaleString('en-US', { hour12: false })}</th>
                {Array.from({ length: 16}, (_, idx)=> (
                  <td key={idx}>{member.press_value[`key${idx + 1}`]}</td>
                ))}
                </tr>))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>

      <Col lg="12" style={{marginBottom: '30px'}}>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0" style={{ backgroundColor: '#0B0B3B', color: 'white', borderRadius:'5px'}}>
            <i className="bi bi-card-text me-2"> </i>
            왼발 데이터
          </CardTitle>
          <CardBody className="">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>시각</th>
                  <th>자이로 x</th>
                  <th>자이로 y</th>
                  <th>자이로 z</th>
                  <th>acc x</th>
                  <th>acc y</th>
                  <th>acc z</th>
                </tr>
              </thead>
              <tbody>
              {lf_members.map((member, index) => (
              <tr key={index}>
                <th scope="row" style={{ width: '200px' }}>{new Date(member.created_at).toLocaleString('en-US', { hour12: false })}</th>
                <td>{member.gyro_x}</td>
                <td>{member.gyro_y}</td>
                <td>{member.gyro_z}</td>
                <td>{member.acc_x}</td>
                <td>{member.acc_y}</td>
                <td>{member.acc_z}</td>
                </tr>))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
      <Col lg="12" style={{marginBottom: '30px'}}>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0" style={{ backgroundColor: '#0B0B3B', color: 'white', borderRadius:'5px' }}>
            <i className="bi bi-card-text me-2"> </i>
            오른발 데이터
          </CardTitle>
          <CardBody className="">
            <Table bordered hover>
            <thead>
                <tr>
                <th >시각</th>
                  <th>자이로 x</th>
                  <th>자이로 y</th>
                  <th>자이로 z</th>
                  <th>acc x</th>
                  <th>acc y</th>
                  <th>acc z</th>
                </tr>
              </thead>
              <tbody>
              {rf_members.map((member, index) => (
              <tr key={index}>
                <th scope="row" style={{ width: '200px' }}>{new Date(member.created_at).toLocaleString('en-US', { hour12: false })}</th>
                  <td>{member.gyro_x}</td>
                  <td>{member.gyro_y}</td>
                  <td>{member.gyro_z}</td>
                  <td>{member.acc_x}</td>
                  <td>{member.acc_y}</td>
                  <td>{member.acc_z}</td>
                </tr>))}
                <tr>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Tables;