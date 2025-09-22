import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './help.less'

export default function Help() {
  useLoad(() => {
    console.log('求助页面加载完成')
  })

  return (
    <View className='help-page'>
      <View className='header'>
        <Text className='title'>紧急求助</Text>
      </View>
    </View>
  )
}
