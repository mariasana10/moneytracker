import React, { useState, useEffect } from "react";
import { Text, View, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import apiClient from "../../apiClient";
import { endpoints } from "../../helper/ApiEndPoint";
import AsyncStorageObject from "../../lib/AsyncStorage";
import AsyncStorage from "../../helper/AsyncStorage";
import Layout from "../../components/Layout";

const { width } = Dimensions.get("window");

const WeeklyReport = () => {
  const [report, setReport] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    const userId = await AsyncStorageObject.getItem(AsyncStorage.USER_ID);
    apiClient.get(
      `${endpoints().reportAPI}/search?weekly=true&object_id=${userId}`,
      (error, response) => {
        if (response && response.data && response.data.reports) {
          setReport(response.data.reports);
          setTotalAmount(response.data.totalAmount);

          // Prepare the data for the chart
          const data = response.data.reports.map((report) => ({
            name: report.createdAt,
            value: report.amount,
          }));
          setChartData(data);
        }
      }
    );
  };

  const generateChartHTML = (data) => `
  <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
      <style>
        body, html {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        #chart-container {
          display: flex;
          align-items: flex-end;
          height: 100%;
        }
        #chart {
          width: 100%;
          height: 60%;
        }
      </style>
    </head>
    <body>
      <div id="chart-container">
        <div id="chart"></div>
      </div>
      <script type="text/javascript">
        var chartData = ${JSON.stringify(data)};
        chartData.forEach(item => {
          var date = new Date(item.name);
          var formattedDate = date.getDate() + '-' + (date.toLocaleString('default', { month: 'short' })) + '-' + date.getFullYear();
          item.name = formattedDate;
        });
        var chart = echarts.init(document.getElementById("chart"));
        var option = {
          xAxis: { type: "category", data: chartData.map(item => item.name) },
          yAxis: { type: "value" },
          series: [
            {
              type: "bar",
              data: chartData.map(item => ({
                value: item.value,
                itemStyle: getItemStyle(item.value) // Assign custom colors based on value ranges
              })),
            }
          ]
        };
        chart.setOption(option);
        
        function getItemStyle(value) {
          if (value > 200) {
            return { color: 'red' };
          } else if (value >= 100 && value <= 200) {
            return { color: 'yellow' };
          } else {
            return { color: 'green' };
          }
        }
      </script>
    </body>
  </html>
`;




  return (
    <Layout
    title={"Weekly Report"}
    showBackIcon
    >
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: generateChartHTML(chartData) }}
        style={{ width, height: 300 }}
      />
    </View>
    </Layout>
  );
};

export default WeeklyReport;
