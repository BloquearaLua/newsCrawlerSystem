import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { makeStyles } from '@material-ui/styles';
import { axiosGet } from '../../../../util/https';

const useStyles = makeStyles({
    wordCloud:{
        margin:"30px 10px",
        height: '300px',
        backgroundColor: "#fff",
        borderRadius: "10px",
    }
});

export default function Wordcloud() {
    const classes = useStyles();
    useEffect(() => {
        const chart = echarts.init(document.getElementById("wordCloud"));
        (async () => {
            const result = await axiosGet(`/api/backstage/wordcloud`);
            const data = handleData(result);
            console.log("wordcloud",result,data);
            let option = {
                series: [{
                    name: '新闻关键词',
                    type: "wordCloud",
                    left: "center",
                    top: 'center',
                    width: '80%',
                    height: '80%',
                    right: null,
                    bottom: null,
                    sizeRange: [16,70],
                    rotationRange: [-45,0,45,,90],
                    rotationStep: 45,
                    gridSize: 4,
                    drawOutOfBound: false,
                    layoutAnimation: true,
                    textStyle: {
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                    },
                    emphasis: {
                        focus: 'self',
                        textStyle: {
                            textShadowBlur: 10,
                            textShadowColor: '#333'
                        }
                    },
                    data: data
                }]}
            chart.setOption(option);
        })();
        // window.onresize = function() {
        //     chart.resize();
        //   };
        return () => {
            return chart.dispose();
        }
    },[]);

    const handleData = (result) => {
        const data = [];
        result.forEach((item) => {
          data.push({
            name: item.keyword,
            value: item.times
          })
        })
        return data;
      }

    return (
        <div id="wordCloud" className={classes.wordCloud}></div>
    )
}
