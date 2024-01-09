// TimelineComponent.jsx
import React, { useState, useEffect } from "react";
import { Timeline, Spin, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { getTicketById } from "../../../actions/itTechnician/myTicket/myTicket";
import { useDispatch } from "react-redux";

const TechnicianTimeLine = (props) => {
  const { ticketId } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(ticketId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getTicketById(ticketId));
        setData(res.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, ticketId]);
  console.log(data);

  const formattedDateTime = (dateTimeString) => {
    const formattedDate = format(
      new Date(dateTimeString),
      "dd MMM yyyy, HH:mm:ss"
    );
    return formattedDate;
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Ticket Timeline</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/ITTechnician/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/ITTechnician/check-tickets">Check Tickets</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Ticket Timeline</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {loading ? (
        <Spin />
      ) : (
        <Timeline>
          <>
            <Timeline.Item key={`${data.id}-generated`} color="blue">
              Ticket Generated ({data.ticketNumber})
            </Timeline.Item>
            <Timeline.Item key={`${data.id}-created`}>
              Created By: {data.employee.name} <br />
              {formattedDateTime(data.createdAt)}
            </Timeline.Item>
            {data.reply && (
              <Timeline.Item
                key={`${data.id}-reply`}
                color={
                  data.status === "CREATED"
                    ? "blue"
                    : data.status === "ONGOING"
                    ? "orange"
                    : data.status === "RESOLVED"
                    ? "green"
                    : "volcano"
                }
              >
                <span style={{ fontSize: "16px" }}> Reply : {data.reply}</span>
                <br />

                <span style={{ fontSize: "14px" }}>
                  Updated By :{data.updatedBy}
                </span>
                <br />
                <span style={{ fontSize: "14px" }}>
                  {formattedDateTime(data.updatedAt)}
                </span>
              </Timeline.Item>
            )}
          </>
        </Timeline>
      )}
    </>
  );
};

export default TechnicianTimeLine;
