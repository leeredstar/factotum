<template>
	<fs-page class="PageFeatureSearchMulti">
		<fs-crud ref="crudRef" v-bind="crudBinding">
			<template #cell_url="scope">
				<el-tag size="small">{{ scope.row.url }}</el-tag>
			</template>
		</fs-crud>
		
	</fs-page>
</template>

<script lang="ts">
import { ref, onMounted, getCurrentInstance, defineComponent} from 'vue';
import { useFs } from '@fast-crud/fast-crud';
import createCrudOptions  from './crud';

import * as api from './api';
import _ from 'lodash-es';


export default defineComponent({    //这里配置defineComponent
    name: "LineAreaModelViewSet",   //把name放在这里进行配置了
    setup() {   //这里配置了setup()

		const instance = getCurrentInstance();

		const context: any = {
			componentName: instance?.type.name
		};

		const { crudBinding, crudRef, crudExpose, resetCrudOptions } = useFs({ createCrudOptions, context}); 


		// 页面打开后获取列表数据
		onMounted(() => {
			crudExpose.doRefresh();
		});
		return {  
		//增加了return把需要给上面<template>内调用的<fs-crud ref="crudRef" v-bind="crudBinding">
				crudBinding,
				crudRef,

			};
    } 	//这里关闭setup()
  });  //关闭defineComponent
</script>

<style lang="less">
  .PageFeatureSearchMulti {
    .fs-search-multi-line-buttons {
      position: absolute;
      bottom: -38px;
      right: 226px;
    }
  }
</style>
