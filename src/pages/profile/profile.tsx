import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './profile.less'

export default function Profile() {
  useLoad(() => {
    console.log('我的页面加载完成')
  })

  return (
    <View className='profile-page'>
      <View className='header'>
        <Text className='title'>我的设置</Text>
      </View>
    </View>
  )
}
