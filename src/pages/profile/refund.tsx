import { View, Text, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useMemo, useState } from 'react'
import './refund.less'

export default function Refund() {
  const [remaining, setRemaining] = useState<number>(0)
  const [used, setUsed] = useState<number>(0)

  useLoad(() => {
    try {
      const r = Number(Taro.getStorageSync('serviceRemaining') || 0)
      const u = Number(Taro.getStorageSync('serviceUsed') || 0)
      setRemaining(Number.isFinite(r) ? r : 0)
      setUsed(Number.isFinite(u) ? u : 0)
    } catch (e) {
      setRemaining(0)
      setUsed(0)
    }
  })

  const canRefund = useMemo(() => used === 0 && remaining > 0, [used, remaining])

  const submit = async () => {
    if (!canRefund) {
      Taro.showToast({ title: '仅未使用可退款', icon: 'none' })
      return
    }

    const confirm = await Taro.showModal({ title: '确认退款', content: `将为您退还 ${remaining} 次服务对应的金额`, confirmText: '确认', cancelText: '取消' })
    // @ts-ignore - Taro 类型在小程序端为异步结果对象
    if (!confirm?.confirm) return

    // 这里应调用后端退款接口。演示用本地存储清零模拟。
    Taro.showLoading({ title: '退款处理中' })
    setTimeout(() => {
      Taro.hideLoading()
      try {
        Taro.setStorageSync('serviceRemaining', 0)
        Taro.setStorageSync('lastPurchaseAmount', 0)
      } catch {}
      Taro.showToast({ title: '退款成功', icon: 'success' })
      Taro.navigateBack()
    }, 800)
  }

  return (
    <View className='refund-page'>
      <View className='card'>
        <Text className='title'>申请退款</Text>
        <Text className='desc'>仅未使用的服务次数支持退款。一旦使用任意一次，将不可退款。</Text>

        <View className='row'>
          <Text className='label'>已使用次数</Text>
          <Text className='value'>{used} 次</Text>
        </View>
        <View className='row'>
          <Text className='label'>可退款次数</Text>
          <Text className='value'>{remaining} 次</Text>
        </View>
      </View>

      <View className='footer'>
        <Button className={`refund-btn ${canRefund ? '' : 'is-disabled'}`} disabled={!canRefund} onClick={submit}>
          {canRefund ? '申请退款' : '不满足退款条件'}
        </Button>
      </View>
    </View>
  )
}


