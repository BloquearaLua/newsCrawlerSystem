import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    wordCloud:{
        height: '300px',
        borderRadius: "10px",
    }
});

export default function TotalWordCloud(props) {
  const { data } = props
    const classes = useStyles();
    useEffect(() => {
      const result = []
      if (data?.length) {
        data.forEach((item) => {
          result.push({
            name: item[0],
            value: item[1]
          })
        })
      }
        const chart = echarts.init(document.getElementById("totalWord"));
        (async () => {
            let option = {
                title: {
                    text: '语料库词云',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 20
                    }
                },
                series: [{
                    name: '语料库关键词',
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
                    data: result
                }]}
            chart.setOption(option);
        })();
        // window.onresize = function() {
        //     chart.resize();
        //   };
        return () => {
            return chart.dispose();
        }
    },[data]);

    return (
        <div id="totalWord" className={classes.wordCloud}></div>
    )
}
