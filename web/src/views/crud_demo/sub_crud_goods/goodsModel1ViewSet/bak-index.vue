<template>
	<fs-page class="PageFeatureSearchMulti">
		<fs-crud ref="crudRef" v-bind="crudBinding">
			<template #cell_url="scope">
				<el-tag size="small">{{ scope.row.url }}</el-tag>
			</template>
		</fs-crud>
		
	</fs-page>
</template>

<script lang="ts" setup name="bakgoodsModel1ViewSet">
import { ref, onMounted } from 'vue';
import { useExpose, useCrud} from '@fast-crud/fast-crud';
import createCrudOptions from './crud';

import * as api from './api';
import _ from 'lodash-es';


const rolePermission = ref();
defineExpose(rolePermission);
// crud组件的ref
const crudRef = ref();
// crud 配置的ref
const crudBinding = ref();
// 暴露的方法
const { crudExpose } = useExpose({ crudRef, crudBinding });
// 你的crud配置
const { crudOptions } = createCrudOptions({ crudExpose, rolePermission });
// 初始化crud配置
const { resetCrudOptions } = useCrud({ crudExpose, crudOptions });
// 你可以调用此方法，重新初始化crud配置
// resetCrudOptions(options)

// 页面打开后获取列表数据
onMounted(() => {
	crudExpose.doRefresh();
});
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