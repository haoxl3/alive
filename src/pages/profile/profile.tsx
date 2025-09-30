import { View, Text, Image, Button, Switch, Picker } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './profile.less'

export default function Profile() {
  const [user, setUser] = useState<{ avatarUrl?: string; nickName?: string } | null>(null)
  const [missedWarn, setMissedWarn] = useState(true)
  const [remindTime, setRemindTime] = useState('21:00')
  const [alarmDays, setAlarmDays] = useState(3)

  useLoad(() => {
    console.log('我的页面加载完成')
    Taro.eventCenter.on('contact:update', (payload) => {
      const { name, phone, index } = payload as any
      if (typeof index === 'number') {
        // 编辑现有联系人
        setContacts(prev => prev.map((item, i) => i === index ? { name, phone } : item))
      } else {
        // 添加新联系人
        if (contacts.length < 3) {
          setContacts(prev => [...prev, { name, phone }])
        }
      }
    })

    // 读取剩余服务次数
    try {
      const remaining = Number(Taro.getStorageSync('serviceRemaining') || 0)
      setServiceRemaining(Number.isFinite(remaining) ? remaining : 0)
    } catch (e) {
      setServiceRemaining(0)
    }
  })

  const [contacts, setContacts] = useState<Array<{ name: string; phone: string }>>([
    { name: '张医生', phone: '13812341234' }
  ])
  const [serviceRemaining, setServiceRemaining] = useState<number>(0)

  return (
    <View className='profile-page'>
      <View className='user-card'>
        <View className='user-basic'>
          {user?.avatarUrl ? (
            <Image className='avatar' src={user.avatarUrl} mode='aspectFill' />
          ) : (
            <View className='avatar placeholder'>
              <Text className='avatar-text'>头像</Text>
            </View>
          )}
          <View className='user-name-wrap'>
            <Text className='nickname'>{user?.nickName || '未授权用户'}</Text>
            <Text className='streak'>连续打卡6天</Text>
          </View>
        </View>
        {!user && (
          <Button
            className='grant-btn'
            onClick={async () => {
              try {
                const res = await Taro.getUserProfile({ desc: '用于展示头像和昵称' })
                setUser(res.userInfo as any)
              } catch (e) {
                Taro.showToast({ title: '已取消授权', icon: 'none' })
              }
            }}
          >
            获取微信头像昵称
          </Button>
        )}
      </View>

      <View className='card block'>
        <Text className='block-title'>提醒时间设置</Text>
        <Picker
          mode='selector'
          range={Array.from({ length: 10 }, (_, i) => `${i + 1}天`)}
          value={alarmDays - 1}
          onChange={(e) => {
            const idx = Number((e.detail as any).value ?? e.detail?.value)
            if (!Number.isNaN(idx)) setAlarmDays(idx + 1)
          }}
        >
          <View className='row between'>
            <Text className='label'>连续几天不打卡触发报警?</Text>
            <View className='time-pill'>{alarmDays}天</View>
          </View>
        </Picker>
        <Picker
          mode='time'
          value={remindTime}
          onChange={(e) => {
            const value = (e.detail as any).value || e.detail?.value
            if (value) setRemindTime(value)
          }}
        >
          <View className='row between'>
            <Text className='label'>每日打卡提醒时间</Text>
            <View className='time-pill'>{remindTime}</View>
          </View>
        </Picker>
      </View>

      <View className='card block'>
        <Text className='block-title'>紧急联系人</Text>
        {contacts.map((contact, index) => (
          <View key={index} className='contact-row'>
            <View className='contact-avatar'>
              <View className='contact-icon' />
            </View>
            <View className='contact-info'>
              <Text className='contact-name'>{contact.name}</Text>
              <Text className='contact-phone'>{`${contact.phone.slice(0,3)}****${contact.phone.slice(-4)}`}</Text>
            </View>
            <Text
              className='link'
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/profile/contact?name=${encodeURIComponent(contact.name)}&phone=${encodeURIComponent(contact.phone)}&index=${index}`,
                })
              }}
            >编辑</Text>
          </View>
        ))}
        {contacts.length < 3 && (
          <View
            className='add-contact'
            onClick={() => {
              Taro.navigateTo({ url: '/pages/profile/contact' })
            }}
          >
            添加新联系人
          </View>
        )}
        {contacts.length >= 3 && (
          <View className='contact-limit'>
            最多只能添加3个紧急联系人
          </View>
        )}
      </View>

      <View className='card block'>
        <Text className='block-title'>健康干预设置</Text>
        <View className='row between'>
          <Text className='label'>未打卡预警通知</Text>
          <Switch checked={missedWarn} onChange={e => setMissedWarn(!!e.detail.value)} />
        </View>
        <View className='row between'>
          <Text className='label'>SOS 求助服务剩余次数</Text>
          <Text className='link' onClick={() => Taro.navigateTo({ url: '/pages/profile/recharge' })}>{serviceRemaining > 0 ? `${serviceRemaining} 次` : '去充值'}</Text>
        </View>
        <View className='row between'>
          <Text className='label'>申请退款</Text>
          <Text
            className='link'
            onClick={() => {
              Taro.navigateTo({ url: '/pages/profile/refund' })
            }}
          >去申请</Text>
        </View>
      </View>
    </View>
  )
}
