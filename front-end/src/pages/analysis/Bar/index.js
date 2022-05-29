import React, { useEffect } from 'react';
import * as echarts from 'echarts'

const category_zh = {
  'news_world': '国际',
  'news_tech': '科技',
  'news_finance': '金融',
  'news_culture': '文化',
  'news_sports': '运动',
  'news_military': '军事',
  'news_edu': '教育',
  'news_agriculture': '农业',
  'news_entertainment': '娱乐',
  'news_game': '电竞',
  'news_car': '汽车',
  'news_travel': '旅游',
  'news_house': '房子',
  'news_story': '民生'
}
export default function Bar(props) {
  const { data } = props

  useEffect(() => {
    console.log(props);
    const category = []
    const count = []
    if (data?.length) {  
      data.map(item => {
        category.push(category_zh[item.category])
        count.push(item.count)
      })
    }
    var chartDom = document.getElementById('bar');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      title: {
        text: '新闻分类情况',
        subtext: '/条'
      },
      legend: {
        show: true
      },
      xAxis: {
        show: true,
        type: 'category',
        data: category,
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: count,
          type: 'bar',
          showBackground: true,
          label: {
            show: true,
            position: 'top'
          },
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };
    option && myChart.setOption(option);
  }, [data])
  return (
    <div id="bar" style={{width: '550px', height: '330px'}}>
    </div>
  );
}