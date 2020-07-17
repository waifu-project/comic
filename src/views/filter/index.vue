<template>
  <view>

    <!-- TODO -->
    <view v-if="false">
      <view class="cu-bar bg-white">
        <view class="action sub-title">
          <text class="text-xl text-bold text-green">页数</text>
          <text class="bg-green" style="width: 42px" />
        </view>
      </view>

      <view>
        <slider value="60" step="1" show-value />
      </view>
    </view>

    <view class="cu-bar bg-white">
      <view class="action sub-title">
        <text class="text-xl text-bold text-green">时间</text>
        <text class="bg-green" style="width: 42px" />
      </view>
    </view>

    <view class="grid margin-bottom text-center col-3">
      <view v-for="(item, index) in timeOptions" :key="item.id">
        <view
        class="item padding-sm margin-xs radius text-df solids"
        :class="timeIndex == index ? 'line-pink' : 'line-gray'"
        @tap="handleClickOptions(index, 'time')"
        >
          {{ item | display('time', index) }}
        </view>
      </view>
    </view>

    <view class="cu-bar bg-white">
      <view class="action sub-title">
        <text class="text-xl text-bold text-green">类型</text>
        <text class="bg-green" style="width: 42px" />
      </view>
    </view>

    <view class="grid margin-bottom text-center col-3">
      <view v-for="(item, index) in typeOptions" :key="item.id">
        <view
        class="item padding-sm margin-xs radius text-df solids"
        :class="[ typeIndex == index ? 'line-pink' : 'line-gray']"
        @tap="handleClickOptions(index, 'type')"
        >
          {{ item | display('type', index) }}
        </view>
      </view>
    </view>

    <!-- <view class="margin-tb-sm text-center next flex" :class="{ show: (time != null || type != null) }">
      <button class="cu-btn round bg-pink margin-right-xs shadow-blur lg flex-sub" @tap="time='a';type='mr';">
        <i class="cuIcon-back margin-right-xs" />
        {{ `重置` }}
      </button>
			<button class="cu-btn round bg-green shadow-blur lg flex-twice" @tap="searchFetchData">
        <i class="cuIcon-unfold margin-right-xs" />
        {{ `重新获取` }}
      </button>
		</view> -->

  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { searchOptionTimeEnum, searchOptionTypeEnum, searchOptionTimeEnumString, searchOptionTypeEnumString } from '@/interface/enum';
import { filterDataInterface } from '@/interface/pages';
import { mapState, mapMutations } from 'vuex';
import { comicInterface, searchDataInterface } from '@/store/types';
import { searchOptions } from '@/interface/tool';
import { io } from '../../utils/fs';

/**
 * 枚举类型转为 `Array<string>`
 */
const enum2string = (raw: any): any[] => {
  try {
    const keys: string[] = Object.keys(raw)
    const values: string[] = Object.values(raw)
    const obj: Array<any> = keys.map((item, index)=> {
      return {
        [item]: values[index]
      }
    })
    return obj
  } catch (error) {
    console.error(error)
    return []
  }
}

export default Vue.extend({
  data(): filterDataInterface {
    return {
      // time: null,
      // type: null
    }
  },
  filters: {
    /**
     * 显示过滤器
     */
    display(val: any, type: string, index: number) {
      const flag = type == 'time'
      const values = Object.values(flag ? searchOptionTimeEnumString : searchOptionTypeEnumString)
      return values[index]
    },
  },
  computed: {
    vuexTime() {
      const u: searchDataInterface = this.$store.state.comic.searchData
      return u.query.t
    },
    vuexType() {
      const u: searchDataInterface = this.$store.state.comic.searchData
      return u.query.o
    },
    /**
     * 时间参数
     */
    timeOptions() {
      return enum2string(searchOptionTimeEnum)
    },
    /**
     * 类型参数
     */ 
    typeOptions() {
      return enum2string(searchOptionTypeEnum)
    },
    /**
     * 时间
     */
    time: {
      get() {
        return (this as any).vuexTime
      },
      set(newVal: number) {
        const arr = Object.values(searchOptionTimeEnum)
        const data = {
          t: arr[newVal]
        }
        this.CHANGE_QUERY_DATA(data)
      }
    },
    /**
     * 类型
     */
    type: {
      get() {
        return (this as any).vuexType
      },
      set(newVal: number) {
        const arr = Object.values(searchOptionTypeEnum)
        const data = {
          o: arr[newVal]
        }
        this.CHANGE_QUERY_DATA(data)
      }
    },
    /**
     * 时间索引
     */
    timeIndex(): number {
      const val = this.time
      let r = -1
      Object.values(searchOptionTimeEnum).some((item, index)=> {
        const test = item == val
        if (test) r = index
        return test
      })
      return r
    },
    /**
     * 类型索引
     */
    typeIndex(): number {
      const val = this.type
      let r = -1
      Object.values(searchOptionTypeEnum).some((item, index)=> {
        const test = item == val
        if (test) r = index
        return test
      })
      return r
    }
  },
  onLoad() {
    // console.log('this.vuexTime: ', this.vuexTime);
    // console.log('this.vuexType: ', this.vuexType);
    io.setReload(true)
  },
  methods: {
    ...mapMutations('comic', [
      'CHANGE_QUERY_DATA'
    ]),
    handleClickOptions(index: number, type: string) {
      ;(this as any)[type] = index
      this.CHANGE_QUERY_DATA()
    },
    /**
     * 重新获取数据
     */
    // searchFetchData() {
    //   console.log('agagin fetch...')
    //   try {
    //     const pages = getCurrentPages(); // 当前页面
    //     const beforePage = pages[pages.length - 2] as any; // 前一个页面
    //     beforePage.onLoad();
    //     setTimeout(()=> {
    //       uni.navigateBack();
    //     }, 60)
    //   } catch (error) {
    //     throw new Error(error)
    //   }
    // }
  }
})
</script>

<style scoped>
.grid .item {
  border-radius: 42rpx;
  margin: 42rpx 10rpx 12rpx;
}
.next {
	position: fixed;
	bottom: 2%;
	left: 0;
	width: 100%;
	transform: translateY(40vh);
	opacity: 0;
	transition: all .4s;
	z-index: 9999;
}
.next.show {
	transform: translateY(0);
	opacity: 1;
}
</style>