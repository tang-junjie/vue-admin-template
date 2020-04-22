<!--

组件：省市区级联选择器 

注意：
1. 该组件提供了 value 和 emit 了 change 事件好让 a-form 组件能够接管数据，所有的
   v-decorator 的行为都和 a-form 中定义的一一致。

-->

<template>
  <div class="cb-address-cascader">
    <a-cascader
      :options="options"
      :value="value"
      :change-on-select="changeOnSelect"
      placeholder="请选择省市区"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script>
import provinces from 'china-division/dist/provinces.json'
import cities from 'china-division/dist/cities.json'
import areas from 'china-division/dist/areas.json'
import hkmotw from 'china-division/dist/HK-MO-TW.json'

areas.forEach(area => {
  const matchCity = cities.filter(city => city.code === area.cityCode)[0]
  if (matchCity) {
    matchCity.children = matchCity.children || []
    matchCity.children.push({
      label: area.name,
      value: area.name
    })
  }
})

cities.forEach(city => {
  const matchProvince = provinces.filter(
    province => province.code === city.provinceCode
  )[0]
  if (matchProvince) {
    matchProvince.children = matchProvince.children || []
    matchProvince.children.push({
      label: city.name,
      value: city.name,
      children: city.children
    })
  }
})

// 合并港澳台行政区
const _hkmotw = Object.entries(hkmotw).map(([provinceName, provinceItem]) => {
  return {
    label: provinceName,
    value: provinceName,
    children: Object.entries(provinceItem).map(([cityName, cityItem]) => {
      return {
        label: cityName,
        value: cityName,
        children: cityItem.map(area => {
          return {
            label: area,
            value: area
          }
        })
      }
    })
  }
})

const options = provinces
  .map(province => ({
    label: province.name,
    value: province.name,
    children: province.children
  }))
  .concat(_hkmotw)

options.unshift({
  label: '全国',
  value: '全国'
})

export default {
  props: {
    // 设置 value 这个 prop 是为了能被 Form 组件接管
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: Array
    },

    /**
     * 是否允许只选中父级选项，可以效果可以参阅：
     * https://vue.ant.design/components/cascader-cn/#components-cascader-demo-change-on-select
     */
    changeOnSelect: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      options // 中国省市区数据
    }
  }
}
</script>
