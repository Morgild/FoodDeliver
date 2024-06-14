import { Container } from "@mui/material";

export default function Dashboard() {
  return (
    <>
      <iframe
        style={{
          overflow: "hidden",
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          width: "100%",
          height: "100%",
        }}
        title="Monartex"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/reportEmbed?reportId=5e4bbb3b-8392-46a6-8d22-e8f17b751a92&autoAuth=true&ctid=abde62c4-46fa-4bd7-9585-391b26488815"
        allowFullScreen={true}
      ></iframe>
    </>
  );
}
