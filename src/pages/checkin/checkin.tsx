import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './checkin.less'

export default function Checkin() {
  useLoad(() => {
    console.log('打卡页面加载完成')
  })

  return (
    <View className='checkin-page'>
      <View className='header'>
        <Text className='title'>每日打卡</Text>
      </View>
    </View>
  )
}
