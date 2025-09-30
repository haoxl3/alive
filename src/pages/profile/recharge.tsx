import { View, Text, Button, RadioGroup, Radio } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './recharge.less'

const options = [1, 3, 5, 10]

export default function Recharge() {
  const [amount, setAmount] = useState<number>(30)

  useLoad(() => {
    console.log('充值页加载完成')
  })

  const pay = async () => {
    // 此处对接服务端下单，拿到微信支付参数后调起支付
    // 这里用 Toast 模拟支付成功
    Taro.showLoading({ title: '下单中...' })
    setTimeout(() => {
      Taro.hideLoading()
      // 将本次购买的服务次数写入本地存储
      try {
        const purchaseCount = amount
        Taro.setStorageSync('lastPurchaseAmount', purchaseCount)
        Taro.setStorageSync('serviceUsed', 0)
        Taro.setStorageSync('serviceRemaining', purchaseCount)
      } catch (e) {
        console.warn('写入存储失败', e)
      }
      Taro.showToast({ title: `已充值 ${amount} 次`, icon: 'success' })
      Taro.navigateBack()
    }, 800)
  }

  return (
    <View className='recharge-page'>
      <View className='card'>
        <Text className='title'>按 “服务次数” 预充值</Text>
        <Text className='sub'>紧急通知次数”，每次成功拨打紧急联系人电话消耗 1 次服务次数，费用与次数挂钩，如果不充值，则无法使用紧急求助功能</Text>

        <RadioGroup
          onChange={(e) => setAmount(Number((e.detail as any).value))}
          className='amount-group'
        >
          {options.map((v) => (
            <LabelItem key={v} value={v} checked={amount === v} />
          ))}
        </RadioGroup>
      </View>

      <View className='footer'>
        <Button className='pay-btn' onClick={pay}>立即充值</Button>
      </View>
    </View>
  )
}

function LabelItem({ value, checked }: { value: number; checked: boolean }) {
  return (
    <View className={`amount ${checked ? 'is-checked' : ''}`}>
      <Radio value={String(value)} className='radio' checked={checked} />
      <Text className='num'>{value}</Text>
      <Text className='unit'>次</Text>
    </View>
  )
}


