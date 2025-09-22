import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './checkin.less'

export default function Checkin() {
  useLoad(() => {
    console.log('打卡页面加载完成')
  })

  return (
    <View className='checkin-page'>
      <View className='card'>
        <View className='card-header'>
          <Text className='card-title'>每日打卡</Text>
        </View>

        <View className='section'>
          <Text className='section-title'>本月打卡记录</Text>

          <View className='days-row'>
            <View className='day day-done'><Text className='day-text'>14</Text></View>
            <View className='day day-today'><Text className='day-text'>15</Text></View>
            <View className='day day-done'><Text className='day-text'>16</Text></View>
            <View className='day day-done'><Text className='day-text'>17</Text></View>
            <View className='day day-done'><Text className='day-text'>18</Text></View>
            <View className='day day-done'><Text className='day-text'>19</Text></View>
            <View className='day day-future'><Text className='day-text'>20</Text></View>
          </View>

          <View className='progress-wrap'>
            <View className='progress-bar'>
              <View className='progress-fill' style={{ width: '70%' }}></View>
            </View>
            <Text className='progress-text'>本月目标：完成21天打卡（已连续6天）</Text>
          </View>
        </View>

        <View className='checkin-cta'>
          <View className='big-button'>
            <Text className='big-button-text'>今日打卡</Text>
          </View>
        </View>

        <View className='streak-card'>
          <View className='streak-number-wrap'>
            <Text className='streak-number'>6</Text>
            <Text className='streak-label'>天连续打卡</Text>
          </View>
          <Text className='streak-tip'>坚持打卡，养成好习惯</Text>
        </View>
      </View>
    </View>
  )
}
