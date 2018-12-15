import moment from 'moment'

export function handleListData(responseData) {
  const { data, loading, loaded } = responseData
  let total = 0, list = [], hasMore = false
  if (data) {
    total = data.total
    list = data.list
    hasMore = data.hasMore
  }
  return { total, list, loading, loaded, hasMore }
}


export function handleDate(time) {
  //todo 待处理 java LocalDateTime 类型传来之后月份差1使用moment解析
  console.log('time', time.toString())
  time[1] = time[1] - 1
  return moment(time).format('YYYY-MM-DD h:mm:ss a')
}

