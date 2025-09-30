import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './index.less'

export default function Help() {
  const [pressed, setPressed] = useState(false)
  useLoad(() => {
    console.log('求助页面加载完成')
  })

  return (
    <View className='help-page'>
      <View className='tip'>
        <Text>
          在遇到紧急情况下，点击下方按钮向紧急联系人发送求助信息
        </Text>
      </View>

      <View className='sos-wrapper'>
        <View
          className={`sos-button ${pressed ? 'is-pressed' : ''}`}
          onTouchStart={() => {
            setPressed(true)
            Taro.vibrateShort({ type: 'light' })
          }}
          onTouchEnd={() => setPressed(false)}
          onTouchCancel={() => setPressed(false)}
          onClick={() => {
            Taro.showModal({
              title: '确认紧急求助',
              content: '是否立即发送求助信息给紧急联系人？',
              confirmText: '确认发送',
              cancelText: '取消',
              success: (res) => {
                if (res.confirm) {
                  Taro.showToast({ title: '已发送求助', icon: 'success' })
                }
              },
            })
          }}
        >
          <Text className='sos-text'>SOS 紧急求助</Text>
        </View>
      </View>

      <View className='notice'>
        <Text className='notice-title'>注意事项：</Text>
        <View className='notice-list'>
          <View className='notice-item'>
            紧急求助会发送您的位置信息给紧急联系人
          </View>
          <View className='notice-item'>仅限真实紧急情况下使用</View>
          <View className='notice-item'>点击后需要再次确认防止误操作</View>
          <View className='notice-item'>每月最多使用5次紧急求助功能</View>
        </View>
      </View>
    </View>
  )
}
