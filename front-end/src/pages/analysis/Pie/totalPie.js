import React, { useEffect } from 'react'
import * as echarts from "echarts"
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  pie:{
      height: '400px',
      borderRadius: "10px",
  }
});
export default function TotalPie(props) {
  const { data } = props

  const classes = useStyles()

  useEffect(() => {
    console.log(data);
    const sentiment = []
    if(data?.length) {
      data.map(item => {
        sentiment.push({value: item.count, name: item.sentiment})
      })
    }
    var chartDom = document.getElementById('totalPie');
    var myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: '全部新闻情感分布图'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '10%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          top: '-10%',
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          legend: [{
            top: '10%'
          }],
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: sentiment
        }
      ]
    }
    option && myChart.setOption(option);
  }, [data])
  return (
    <div id="totalPie" className={classes.pie}>
    </div>
  )
}
