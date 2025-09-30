import { View, Text, Input, Button } from '@tarojs/components'
import Taro, { useLoad, useRouter } from '@tarojs/taro'
import { useState } from 'react'
import './contact.less'

export default function Contact() {
  const router = useRouter()
  const { name = '', phone = '', index } = (router.params || {}) as any
  const [contactName, setContactName] = useState(String(name))
  const [contactPhone, setContactPhone] = useState(String(phone))
  const isEdit = typeof index !== 'undefined' && index !== ''

  useLoad(() => {
    console.log('联系人编辑页加载完成')
  })

  const onSave = () => {
    if (!contactName.trim()) {
      Taro.showToast({ title: '请输入姓名', icon: 'none' })
      return
    }
    const phone = contactPhone.trim()
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      Taro.showToast({ title: '请输入有效的中国大陆手机号', icon: 'none' })
      return
    }
    Taro.eventCenter.trigger('contact:update', {
      name: contactName.trim(),
      phone,
      index: isEdit ? Number(index) : undefined,
    })
    Taro.navigateBack()
  }

  return (
    <View className='contact-page'>
      <View className='form-card'>
        <View className='form-item'>
          <Text className='label'>姓名</Text>
          <View className='input-wrap'>
            <Input
              className='input'
              placeholder='请输入姓名'
              value={contactName}
              adjustPosition={false}
              cursorSpacing={0}
              onInput={(e) => setContactName((e.detail as any).value)}
            />
          </View>
        </View>
        <View className='form-item'>
          <Text className='label'>手机号</Text>
          <View className='input-wrap'>
            <Input
              className='input'
              type='number'
              maxlength={11}
              placeholder='请输入11位手机号'
              value={contactPhone}
              adjustPosition={false}
              cursorSpacing={0}
              onInput={(e) => {
                const raw = (e.detail as any).value || ''
                const digits = raw.replace(/\D/g, '').slice(0, 11)
                setContactPhone(digits)
              }}
            />
          </View>
        </View>
      </View>

      <View className='footer'>
        <Button className='save-btn' onClick={onSave}>
          {isEdit ? '保存并返回' : '添加并返回'}
        </Button>
      </View>
    </View>
  )
}


