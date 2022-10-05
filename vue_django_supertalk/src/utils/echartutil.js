/*
 * @Author: darkgoldenrod(暮秋)
 * @Date: 2022-04-18 16:57:30
 * @LastEditTime: 2022-04-22 16:59:09
 * @LastEditors: darkgoldenrod(暮秋)
 * @Description: 
 * @FilePath: \vue_咸鱼\spuertalkl\src\utils\echartutil.js
 */

import * as echarts from "echarts";

export function topleft(datas) {
  var seriesdata = []
  datas[2].forEach(item => {
    seriesdata.push({
      name: item["cityname"],
      data: item["data"],
      type: 'line',
      stack: 'Total',
    })
  })
  return {
    title: {
      text: datas[0],
      left: "center"
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: datas[3],
      orient: "vertical",
      left: "right",
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: datas[1]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      ...seriesdata
    ]
  };
}

export function topmiddle(datas) {
  return {
    title: {
      text: datas[0],
      left: "center"
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      orient: "vertical",
      left: "right",
      data: ["最低气温", "最高气温", "平均气温"]
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: datas[1]
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        name: '平均气温',
        type: 'line',
        data: datas[2],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: '最低气温',
        type: 'line',
        data: datas[3],
        markPoint: {
          data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
        },
        markLine: {
          data: [
            { type: 'average', name: 'Avg' },
            [
              {
                symbol: 'none',
                x: '90%',
                yAxis: 'max'
              },
              {
                symbol: 'circle',
                label: {
                  position: 'start',
                  formatter: 'Max'
                },
                type: 'max',
                name: '最高点'
              }
            ]
          ]
        }
      },
      {
        name: '最高气温',
        type: 'line',
        data: datas[4],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
    ]
  };
}

export function topright(datas) {
  var seriesdata = []
  datas[2].forEach(item => {
    seriesdata.push(
      {
        name: item["cityname"],
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: item["data"]
      }
    )
  })
  return {
    title: {
      text: datas[0],
      left: "center"
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: datas[1],
      orient: "vertical",
      left: "right",
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['2013', '2014', '2015', '2016', '2017', '2018', '2019']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      ...seriesdata
    ]
  };
}

export function buttonleft(datas) {
  var seriesdata = []
  datas[1].forEach(item => {
    seriesdata.push(
      {
        name: item["cityname"],
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: item["data"]
      },
    )
  })
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {
      data: datas[2]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: datas[0]
    },
    series: [
      ...seriesdata
    ]
  };
}

export function buttonmiddle(datas) {
  var seriesdata = []
  datas[2].forEach(item => {
    seriesdata.push({
      name: item["cityname"],
      type: 'bar',
      data: item["data"],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    })
  })
  return {
    title: {
      text: datas[0],
      left: "center"
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: datas[1],
      orient: "vertical",
      left: "right"
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: ['2013', '2014', '2015', '2016', '2017', '2018', '2019']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      ...seriesdata
    ]
  };
}

export function buttonright(datas) {
  return {
    title: {
      text: datas[0],
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b}({d})%"
    },
    legend: {
      orient: 'vertical',
      left: 'right'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: datas[1],
        label: {
          show: true,
          position: 'outside',
          formatter: '{b} {d}%'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
}

export function lowestleft(datas) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    title: {
      text: datas[2],
      left: "center"
    },
    xAxis: {
      scale: true
    },
    yAxis: {
      scale: true
    },
    series: [
      {
        type: 'effectScatter',
        symbolSize: 20,
        data: datas[0]
      },
      {
        type: 'scatter',
        // prettier-ignore
        data: datas[1]
      }
    ]
  };
}

export function lowestmiddle(datas) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    title: {
      text: '城市指标'
    },
    legend: {
      data: datas[0]
    },
    radar: {
      // shape: 'circle',
      indicator: datas[1]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: datas[2]
      }
    ]
  };
}

export function bestleft(datas) {
  var seriesdata = []
  datas[2].forEach(item => {
    seriesdata.push({
      name: item["cityname"],
      data: item["data"],
      type: 'line',
      stack: 'Total',
    })
  })
  console.log(seriesdata);
  return {
    title: {
      text: datas[0],
      left: "center"
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: datas[3],
      orient: "vertical",
      left: "right",
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: datas[1]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      ...seriesdata
    ]
  };
}