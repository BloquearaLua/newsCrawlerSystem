import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { makeStyles } from '@material-ui/styles';
import { axiosGet } from '../../../../util/https';

const useStyles = makeStyles({
    weekcount:{
        margin:"30px 10px",
        height: '300px',
        backgroundColor: "#fff",
        borderRadius: "10px",
    }
});

export default function WeekCount() {
    const classes = useStyles();
    useEffect(() => {
        const chart = echarts.init(document.getElementById("weekcount"));
        (async () => {
            const result = await axiosGet("/api/backstage/details/week");
            console.log("weekcount",result);
            const data = handleData(result);
            const colors = ['#d1c4e9', '#9575cd', '#4e19ae'];
            const options = {
                color: colors,
                tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        right: '20%'
                    },
                    toolbox: {
                        feature: {
                            dataView: { show: true, readOnly: false },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    legend: {
                        data: ['华尔街见闻', '微博新闻', '总数']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            // prettier-ignore
                            data: data.date
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '条数',
                            position: 'left',
                            alignTicks: true,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                color: colors[2]
                                }
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '华尔街见闻',
                            type: 'bar',
                            data: data.wallCount
                        },
                        {
                            name: '微博新闻',
                            type: 'bar',
                            // yAxisIndex: 1,
                            data: data.weiboCount
                        },
                        {
                            name: '总数',
                            type: 'line',
                            // yAxisIndex: 2,
                            data: data.totalCount
                        }
                    ]
                };
            chart.setOption(options)
        })()
        
    },[]);

    const handleData = (result) => {
        const date =[], wallCount = [], weiboCount = [], totalCount = [];
        result.map((item) => {
            date.push(item.current_date);
            wallCount.push(item.wallstreet_count);
            weiboCount.push(item.weibo_count);
            totalCount.push(item.wallstreet_count + item.weibo_count)
        })
        return {
            date,wallCount,weiboCount,totalCount
        }
    }
    return (
        <div id="weekcount" className={classes.weekcount}></div>
    )
}
