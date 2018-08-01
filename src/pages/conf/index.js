import React from "react";
import { connect } from "dva";
import moment from "moment";
import { Menu, Icon, Table } from "antd";
import router from "umi/router";

moment.lang("cn");

class Index extends React.Component {
  render() {
    const back_data = [
      {
        date_start: 4,
        date_end: 7,
        date_day: Date(),
        type: "1",
        conf: "2",
        title: "济南19届新同学入职济南19届新同学入职济南19届新同学入职济南19届新同学入职",
        num: 44,
        user: "孙佳勇",
        user_id: "123123213",
        id: "!23124asdjasdhjaksdasd"
      },
      {
        date_start: 8,
        date_end: 12,
        date_day: Date(),
        type: "3",
        conf: "1",
        title: "计划会议A",
        num: 11,
        user: "王勇",
        user_id: "123123213",
        id: "A53124sdsdhjaksdasd"
      },
      {
        date_start: 1,
        date_end: 12,
        date_day: Date(),
        type: "4",
        conf: "5",
        title: "新零售对餐饮行业的变革",
        num: 153,
        user: "王翠燕",
        user_id: "123123213",
        id: "A53124sdsdhjaksdasd"
      }
    ];
    const columns = [
      {
        title: (
          <div
            style={{
              textAlign: "center"
            }}
          >
            日期
          </div>
        ),
        dataIndex: "date",
        width: "5%",
        render: (value, row, index) => {
          const obj = {
            children: (
              <div
                style={{
                  textAlign: "center"
                }}
              >
                {value}
              </div>
            ),
            props: {}
          };
          if (
            index === 0 ||
            index === 6 ||
            index === 12 ||
            index === 18 ||
            index === 24 ||
            index === 30 ||
            index === 36
          ) {
            obj.props.rowSpan = 6;
          }
          if (
            (index > 0 && index < 6) ||
            (index > 6 && index < 12) ||
            (index > 12 && index < 18) ||
            (index > 18 && index < 24) ||
            (index > 24 && index < 30) ||
            (index > 30 && index < 36) ||
            (index > 36 && index < 42)
          ) {
            obj.props.rowSpan = 0;
          }
          return obj;
        }
      },
      {
        title: (
          <div
            style={{
              textAlign: "center"
            }}
          >
            会议室
          </div>
        ),
        dataIndex: "conf",
        width: "5%",
        render: (value, row, index) => (
          <div
            style={{
              textAlign: "center"
            }}
          >
            {value}
          </div>
        )
      }
    ];
    for (let i = 0; i <= 24; i++) {
      columns.push({
        title: moment("207707278", "YYYYMMDDH")
          .add(i / 2, "hour")
          .format("HH:mm"),
        dataIndex: "time" + i,
        width: "3%",
        render: (value, row, index) => {
          if (value && value.type && value.type.indexOf("k") < 0) {
            return {
              children: <div className={"full conf-lv" + value.type} ><span className="td-text">{value.user}（{value.num}人）{value.title}</span></div>,
              props: {
                colSpan: value.date_end - value.date_start + 1
              }
            };
          } else if (value) {
            return {
              children: <div className={"full conf-lv" + value.type} />,
              props: {
                colSpan: 0
              }
            };
          }
          return {
            children: <div className={"full conf-lv" + value} />,
            props: {
              colSpan: 1
            }
          };
        }
      });
    }
    const confArray = [
      "采桑子",
      "如梦令",
      "画唐春",
      "西江月",
      "定风波",
      "过龙门"
    ];
    const data = [];
    for (let i = 1; i <= 42; i++) {
      // 初始化数据
      const tableDay = moment(moment(Date()).format("YYYYMMDD"), "YYYYMMDD")
        .add(4 * (i - 1), "hour")
        .format("YYYY/MM/DD");
      console.log(tableDay);
      const daydata = {
        key: i,
        date: (
          <>
            {tableDay} <br />
            {moment()
              .add(i / 6, "DAY")
              .format("dddd")}
          </>
        ),
        conf: confArray[(i - 1) % 6]
      };
      // 获取日期数据
      back_data.map(item => {
        console.log((i - 1) % 6, parseInt(item.conf));
        if (
          moment(item.date_day).format("YYYY/MM/DD") === tableDay &&
          parseInt(item.conf) === (i - 1) % 6
        ) {
          console.log((i - 1) % 6, parseInt(item.conf), "done");
          daydata["time" + item.date_start] = item;
          for (let i = 1; i <= item.date_end - item.date_start; i++)
            daydata["time" + (item.date_start + i )] = item.type + "k";
        }
      });

      data.push(daydata);
    }
    return (
      <div className="main-div conf">
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const conf = state.conf;
  return { conf, loading: state.loading.models.conf };
}
export default connect(mapStateToProps)(Index);
